import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

const app = express();
app.use(express.json({ limit: '50mb' }));

// Shared Gemini Client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// 1. Multi-turn Chat Endpoint (gemini-3.5-flash, gemini-3.1-flash-lite, or gemini-3.8-flash)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemInstruction, role = 'general', model = 'gemini-3.5-flash' } = req.body;
    
    // Choose model safely
    let chosenModel = model || 'gemini-3.5-flash';
    if (chosenModel.includes('pro') && !process.env.PAID_KEY_ACTIVE) {
      // Fallback for free tier
      chosenModel = 'gemini-3.8-flash';
    }

    const defaultRoleInstructions: Record<string, string> = {
      architect: 'You are Penil’s AI Website Architecture Specialist. You advise on clean typography (Georgia/Helvetica pairings, 65-75ch measure), zero-pill metadata discipline, 50ms eye-tracking trust, and accessible HTML semantics.',
      analytics: 'You are Penil’s Business Analytics & Dashboard Advisor. You help users convert messy spreadsheet rows into high data-ink executive dashboards, categorizing metrics into North Star, Leading, and Trailing KPIs.',
      strategy: 'You are Penil’s Digital Business & Micro-SaaS Strategist. You provide guidance on customer acquisition cost (CAC), LTV multiples, and self-serve digital business models.',
      presentation: 'You are Penil’s Executive Presentation Designer. You coach on the 1-2-1 narrative structure (1 context, 2 proof, 1 action) and billboard-style clarity.',
      general: 'You are Penil’s AI Design & Business Assistant on "Penil\'s Digital Space". You provide concise, insightful answers on website architecture, data analytics, and digital business.'
    };

    const instruction = systemInstruction || defaultRoleInstructions[role] || defaultRoleInstructions.general;

    // Format contents for multi-turn chat
    const contents = (messages || []).map((m: { role: string; text: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: chosenModel,
      contents,
      config: {
        systemInstruction: instruction,
      },
    });

    res.json({ reply: response.text, modelUsed: chosenModel });
  } catch (err: any) {
    console.error('Chat error:', err);
    res.status(500).json({ error: err.message || 'Failed to process chat message' });
  }
});

// 2. Search Grounding (gemini-3.5-flash with googleSearch tool)
app.post('/api/search-grounding', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Extract grounding sources
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const searchChunks = groundingMetadata?.groundingChunks || [];
    const webSources = searchChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        title: chunk.web?.title || 'Web Source',
        uri: chunk.web?.uri,
      }));

    res.json({
      answer: response.text,
      sources: webSources,
      searchQueries: groundingMetadata?.webSearchQueries || [],
    });
  } catch (err: any) {
    console.error('Search Grounding error:', err);
    res.status(500).json({ error: err.message || 'Search grounding request failed' });
  }
});

// 3. Maps Grounding (gemini-3.5-flash with googleMaps tool)
app.post('/api/maps-grounding', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    res.json({
      answer: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata,
    });
  } catch (err: any) {
    console.error('Maps Grounding error:', err);
    res.status(500).json({ error: err.message || 'Maps grounding request failed' });
  }
});

// 4. Audio Transcription (gemini-3.5-transcribe)
app.post('/api/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm' } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: audioBase64,
            },
          },
          {
            text: 'Transcribe this voice audio accurately into clean text.',
          },
        ],
      },
    });

    res.json({ transcription: response.text });
  } catch (err: any) {
    console.error('Audio transcribe error:', err);
    res.status(500).json({ error: err.message || 'Transcription failed' });
  }
});

// 5. Text-to-Speech (gemini-3.8-flash-lite-tts)
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [{ role: 'user', parts: [{ text }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error('No audio returned from TTS model');
    }

    res.json({ audio: base64Audio, mimeType: 'audio/wav' });
  } catch (err: any) {
    console.error('TTS error:', err);
    res.status(500).json({ error: err.message || 'Speech synthesis failed' });
  }
});

// 6. Image Creation / Editing (gemini-3.1-flash-image-preview / nano banana)
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, aspectRatio = '1:1', inputImageBase64, mimeType = 'image/png' } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const parts: any[] = [];
    if (inputImageBase64) {
      parts.push({
        inlineData: {
          mimeType,
          data: inputImageBase64,
        },
      });
    }
    parts.push({ text: prompt });

    // Try image model or graceful fallback
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio,
        },
      },
    });

    let imageUrl = null;
    let textResponse = '';

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      } else if (part.text) {
        textResponse += part.text;
      }
    }

    res.json({ imageUrl, text: textResponse });
  } catch (err: any) {
    console.error('Image generation error:', err);
    res.status(500).json({ error: err.message || 'Image generation requires a paid API key or quota' });
  }
});

// 7. Video Generation (Veo 3.1 lite / fast generate)
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, aspectRatio = '16:9', imageBytes, mimeType = 'image/png' } = req.body;
    
    const config: any = {
      numberOfVideos: 1,
      aspectRatio,
      resolution: '720p',
    };

    const payload: any = {
      model: 'veo-3.1-lite-generate-preview',
      prompt: prompt || 'A smooth cinematic camera orbit around a minimalist architectural glass workspace',
      config,
    };

    if (imageBytes) {
      payload.image = {
        imageBytes,
        mimeType,
      };
    }

    const operation = await ai.models.generateVideos(payload);
    res.json({ operationName: operation.name });
  } catch (err: any) {
    console.error('Video generation error:', err);
    res.status(500).json({ error: err.message || 'Video generation requires a paid API key' });
  }
});

app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    res.json({ done: updated.done, error: updated.error });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Music Generation (Lyria Clip / Pro)
app.post('/api/generate-music', async (req, res) => {
  try {
    const { prompt = 'A calm, ambient acoustic study track for thoughtful reading' } = req.body;
    const responseStream = await ai.models.generateContentStream({
      model: 'lyria-3-clip-preview',
      contents: prompt,
    });

    let audioBase64 = '';
    let lyrics = '';
    let mimeType = 'audio/wav';

    for await (const chunk of responseStream) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;
      for (const part of parts) {
        if (part.inlineData?.data) {
          if (!audioBase64 && part.inlineData.mimeType) {
            mimeType = part.inlineData.mimeType;
          }
          audioBase64 += part.inlineData.data;
        }
        if (part.text && !lyrics) {
          lyrics = part.text;
        }
      }
    }

    res.json({ audioBase64, mimeType, lyrics });
  } catch (err: any) {
    console.error('Music generation error:', err);
    res.status(500).json({ error: err.message || 'Music generation requires a paid API key' });
  }
});

// Mount Vite or serve static assets
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const server = createServer(app);
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
