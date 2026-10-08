import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Search, MapPin, Mic, MicOff, Volume2, 
  Sparkles, Video, Music, Image as ImageIcon, Send, X, 
  Bot, RefreshCw, ExternalLink, Play, Pause, AlertCircle, 
  CheckCircle2, ArrowRight, Upload
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  model?: string;
  sources?: Array<{ title: string; uri: string }>;
}

export const GeminiStudio: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'search' | 'maps' | 'transcribe' | 'media'>('chat');
  
  // 1. Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hello! I'm Penil's AI Notebook Companion. I can help you analyze website architectures, structure data dashboards from raw spreadsheets, or draft executive pitch narratives. How can I assist your workflow today?",
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatRole, setChatRole] = useState<'general' | 'architect' | 'analytics' | 'strategy' | 'presentation'>('architect');
  const [chatModel, setChatModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.8-flash'>('gemini-3.5-flash');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 2. Search Grounding State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{ answer: string; sources: Array<{ title: string; uri: string }> } | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // 3. Maps Grounding State
  const [mapsQuery, setMapsQuery] = useState('Top independent design studios and digital agencies in Zurich and San Francisco');
  const [mapsResult, setMapsResult] = useState<string | null>(null);
  const [isMapsLoading, setIsMapsLoading] = useState(false);

  // 4. Transcription State
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 5. Media Studio (Image, Video, Music) State
  const [mediaPrompt, setMediaPrompt] = useState('A minimalist travertine architectural desk with an open typography notebook, warm diffused side lighting');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'music'>('image');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaStatus, setMediaStatus] = useState<string | null>(null);
  const [generatedMediaUrl, setGeneratedMediaUrl] = useState<string | null>(null);

  // 6. TTS Audio Playing State
  const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  // Handle Send Chat
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isChatLoading) return;

    const userMsg: Message = { role: 'user', text: inputMessage.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          role: chatRole,
          model: chatModel,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...nextMessages, { role: 'assistant', text: data.reply, model: data.modelUsed }]);
      } else {
        setMessages([...nextMessages, { role: 'assistant', text: data.error || 'Sorry, I encountered an issue processing that.' }]);
      }
    } catch (err: any) {
      setMessages([...nextMessages, { role: 'assistant', text: 'Network error communicating with the server.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle Search Grounding
  const handleSearchGrounding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearchLoading) return;
    setIsSearchLoading(true);
    setSearchResult(null);

    try {
      const res = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      if (data.answer) {
        setSearchResult({ answer: data.answer, sources: data.sources || [] });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchLoading(false);
    }
  };

  // Handle Maps Grounding
  const handleMapsGrounding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapsQuery.trim() || isMapsLoading) return;
    setIsMapsLoading(true);
    setMapsResult(null);

    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: mapsQuery }),
      });
      const data = await res.json();
      if (data.answer) {
        setMapsResult(data.answer);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsMapsLoading(false);
    }
  };

  // Handle Voice Recording & Transcription
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setIsTranscribing(true);
          try {
            const res = await fetch('/api/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: base64Audio, mimeType: 'audio/webm' }),
            });
            const data = await res.json();
            if (data.transcription) {
              setTranscribedText(data.transcription);
            }
          } catch (err) {
            console.error('Transcription error:', err);
          } finally {
            setIsTranscribing(false);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // Handle Text to Speech playback
  const handlePlayTTS = async (text: string) => {
    try {
      setIsTtsPlaying(true);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.substring(0, 300), voice: 'Kore' }),
      });
      const data = await res.json();
      if (data.audio) {
        const audioUrl = `data:audio/wav;base64,${data.audio}`;
        setTtsAudioUrl(audioUrl);
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;
        audio.play();
        audio.onended = () => setIsTtsPlaying(false);
      }
    } catch (err) {
      console.error(err);
      setIsTtsPlaying(false);
    }
  };

  // Handle Media Generation
  const handleGenerateMedia = async () => {
    setMediaLoading(true);
    setMediaStatus('Dispatching synthesis request to model...');
    setGeneratedMediaUrl(null);

    try {
      if (mediaType === 'image') {
        const res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: mediaPrompt, aspectRatio }),
        });
        const data = await res.json();
        if (data.imageUrl) {
          setGeneratedMediaUrl(data.imageUrl);
          setMediaStatus('Image synthesized successfully.');
        } else {
          setMediaStatus(data.error || 'Image generation completed.');
        }
      } else if (mediaType === 'video') {
        const res = await fetch('/api/generate-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: mediaPrompt, aspectRatio }),
        });
        const data = await res.json();
        if (data.operationName) {
          setMediaStatus(`Veo operation queued: ${data.operationName.split('/').pop()}`);
        } else {
          setMediaStatus(data.error || 'Video queued.');
        }
      } else if (mediaType === 'music') {
        const res = await fetch('/api/generate-music', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: mediaPrompt }),
        });
        const data = await res.json();
        if (data.audioBase64) {
          setGeneratedMediaUrl(`data:audio/wav;base64,${data.audioBase64}`);
          setMediaStatus('Acoustic track synthesized.');
        } else {
          setMediaStatus(data.error || 'Music track processed.');
        }
      }
    } catch (err: any) {
      setMediaStatus(err.message || 'Generation request error.');
    } finally {
      setMediaLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#FAF8F5] rounded-xl border border-[#E5E0D8] w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#2D2A26]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E0D8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#D96C4A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-sans font-semibold text-lg text-[#2D2A26]">
                Penil's AI Creative & Research Studio
              </h2>
              <span className="text-xs font-mono text-[#595550]">
                Powered by Gemini 3.5 & Multimodal Tools
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#595550] hover:text-[#2D2A26] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-white border-b border-[#E5E0D8] overflow-x-auto text-xs font-sans font-semibold">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'chat' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Multi-Turn Chatbot</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'search' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Google Search Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('maps')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'maps' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Google Maps Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('transcribe')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'transcribe' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Transcription</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'media' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Veo & Lyria Studio</span>
          </button>
        </div>

        {/* Tab 1: Multi-Turn Chatbot */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#FAF8F5]">
            {/* Persona & Model Bar */}
            <div className="px-6 py-2.5 bg-white/70 border-b border-[#E5E0D8] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="text-[#595550] font-mono text-[11px]">Chatbot Role:</span>
                <select
                  value={chatRole}
                  onChange={(e) => setChatRole(e.target.value as any)}
                  className="px-2 py-1 bg-white border border-[#E5E0D8] rounded text-[#2D2A26] font-semibold cursor-pointer"
                >
                  <option value="architect">Website Design Architect</option>
                  <option value="analytics">Business Analytics & Dashboards</option>
                  <option value="strategy">Digital Business Strategist</option>
                  <option value="presentation">Executive Presentation Designer</option>
                  <option value="general">General Design & Business Advisor</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#595550] font-mono text-[11px]">Model:</span>
                <select
                  value={chatModel}
                  onChange={(e) => setChatModel(e.target.value as any)}
                  className="px-2 py-1 bg-white border border-[#E5E0D8] rounded text-[#2D2A26] font-mono text-[11px] cursor-pointer"
                >
                  <option value="gemini-3.5-flash">gemini-3.5-flash (Balanced)</option>
                  <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
                  <option value="gemini-3.8-flash">gemini-3.8-flash (Reasoning)</option>
                </select>
              </div>
            </div>

            {/* Scrollable Message Thread */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[#2D2A26] text-white flex items-center justify-center font-mono text-xs font-semibold shrink-0">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#D96C4A] text-white font-sans rounded-br-none shadow-xs'
                        : 'bg-white border border-[#E5E0D8] text-[#2D2A26] font-serif rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.role === 'assistant' && (
                      <div className="mt-2 pt-2 border-t border-[#E5E0D8]/60 flex items-center justify-between text-[11px] font-mono text-[#595550]">
                        <span>{m.model || 'Gemini'}</span>
                        <button
                          onClick={() => handlePlayTTS(m.text)}
                          className="hover:text-[#D96C4A] flex items-center gap-1 cursor-pointer"
                          title="Listen with Text-to-Speech"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Speak</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[#2D2A26] flex items-center justify-center font-mono text-xs font-semibold shrink-0">
                      PV
                    </div>
                  )}
                </div>
              ))}
              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#595550]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D96C4A]" />
                  <span>Gemini is generating response...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendChat} className="p-4 bg-white border-t border-[#E5E0D8] flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about website architecture, design tokens, spreadsheet KPIs..."
                className="flex-1 px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#D96C4A] font-sans"
              />
              <button
                type="submit"
                disabled={isChatLoading || !inputMessage.trim()}
                className="px-5 py-2.5 bg-[#D96C4A] hover:bg-[#B85536] disabled:opacity-50 text-white rounded-md font-sans text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Google Search Grounding */}
        {activeTab === 'search' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                Real-Time Search Grounding
              </span>
              <h3 className="text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
                Live Web Research with Google Search
              </h3>
              <p className="text-sm font-serif text-[#595550] leading-relaxed">
                Queries the live web via `gemini-3.5-flash` with the `googleSearch` tool to provide up-to-date benchmarks, design system documentation, and industry case studies.
              </p>
            </div>

            <form onSubmit={handleSearchGrounding} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Latest CSS container queries adoption and OKLCH browser support in 2026"
                className="flex-1 px-4 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#D96C4A] font-sans"
              />
              <button
                type="submit"
                disabled={isSearchLoading || !searchQuery.trim()}
                className="px-5 py-2.5 bg-[#2D2A26] hover:bg-[#D96C4A] disabled:opacity-50 text-white rounded-md font-sans text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Grounded Search</span>
              </button>
            </form>

            {isSearchLoading && (
              <div className="p-8 text-center bg-white rounded border border-[#E5E0D8]">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#D96C4A] mb-2" />
                <span className="text-xs font-mono text-[#595550]">Searching live Google indexes and synthesizing citations...</span>
              </div>
            )}

            {searchResult && (
              <div className="bg-white border border-[#E5E0D8] rounded-lg p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Google Search Grounded
                  </span>
                  <span className="text-xs font-mono text-[#595550]">gemini-3.5-flash</span>
                </div>

                <div className="prose prose-stone max-w-none font-serif text-[#2D2A26] text-sm leading-relaxed whitespace-pre-wrap">
                  {searchResult.answer}
                </div>

                {searchResult.sources.length > 0 && (
                  <div className="pt-4 border-t border-[#E5E0D8]">
                    <span className="text-xs font-mono uppercase text-[#595550] block mb-2">Verified Web Sources:</span>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded text-[#2D2A26] hover:text-[#D96C4A] hover:border-[#D96C4A] flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="truncate max-w-[200px]">{src.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Google Maps Grounding */}
        {activeTab === 'maps' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                Spatial & Location Intelligence
              </span>
              <h3 className="text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
                Google Maps Grounding
              </h3>
              <p className="text-sm font-serif text-[#595550] leading-relaxed">
                Connects `gemini-3.5-flash` with the `googleMaps` tool to explore geographic context for design studios, tech campuses, and creative collectives.
              </p>
            </div>

            <form onSubmit={handleMapsGrounding} className="flex gap-2">
              <input
                type="text"
                value={mapsQuery}
                onChange={(e) => setMapsQuery(e.target.value)}
                placeholder="e.g. Creative digital agencies and design collectives in Munich"
                className="flex-1 px-4 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#D96C4A] font-sans"
              />
              <button
                type="submit"
                disabled={isMapsLoading || !mapsQuery.trim()}
                className="px-5 py-2.5 bg-[#2D2A26] hover:bg-[#D96C4A] disabled:opacity-50 text-white rounded-md font-sans text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Maps Grounding</span>
              </button>
            </form>

            {isMapsLoading && (
              <div className="p-8 text-center bg-white rounded border border-[#E5E0D8]">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#D96C4A] mb-2" />
                <span className="text-xs font-mono text-[#595550]">Querying Google Maps location database...</span>
              </div>
            )}

            {mapsResult && (
              <div className="bg-white border border-[#E5E0D8] rounded-lg p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <span className="text-xs font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Google Maps Grounded Output
                  </span>
                  <span className="text-xs font-mono text-[#595550]">gemini-3.5-flash</span>
                </div>
                <div className="font-serif text-[#2D2A26] text-sm leading-relaxed whitespace-pre-wrap">
                  {mapsResult}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Audio Transcription */}
        {activeTab === 'transcribe' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                Speech to Text
              </span>
              <h3 className="text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
                Voice Note Transcription with gemini-3.5-transcribe
              </h3>
              <p className="text-sm font-serif text-[#595550] leading-relaxed">
                Dictate your thoughts, design notes, or masterclass reflections directly through your microphone. Audio is encoded and transcribed server-side.
              </p>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-lg p-8 text-center space-y-4 shadow-sm max-w-lg mx-auto">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-[#D96C4A] hover:bg-[#B85536] text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>

              <div>
                <h4 className="font-sans font-semibold text-base text-[#2D2A26]">
                  {isRecording ? 'Listening... Click to Finish' : 'Click Microphone to Record'}
                </h4>
                <p className="text-xs font-mono text-[#595550] mt-1">
                  {isRecording ? 'Recording active (16kHz audio)...' : 'Microphone audio transcribes to text via gemini-3.5-transcribe'}
                </p>
              </div>

              {isTranscribing && (
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#D96C4A]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing speech with gemini-3.5-transcribe...</span>
                </div>
              )}
            </div>

            {transcribedText && (
              <div className="bg-white border border-[#E5E0D8] rounded-lg p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
                  <span className="text-xs font-mono text-emerald-800 font-semibold uppercase">
                    Transcribed Voice Note
                  </span>
                  <button
                    onClick={() => {
                      setInputMessage(transcribedText);
                      setActiveTab('chat');
                    }}
                    className="text-xs font-sans font-semibold text-[#D96C4A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Send to Chatbot</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="font-serif text-[#2D2A26] text-sm leading-relaxed bg-[#FAF8F5] p-4 rounded border border-[#E5E0D8]">
                  "{transcribedText}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Veo Video & Lyria Music Studio */}
        {activeTab === 'media' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                Generative Video, Music & Imagery
              </span>
              <h3 className="text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
                Veo 3.1 & Lyria Generative Studio
              </h3>
              <p className="text-sm font-serif text-[#595550] leading-relaxed">
                Generate videos from text/photos using `veo-3.1-fast-generate-preview` or compose ambient study clips using `lyria-3-clip-preview`.
              </p>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-lg p-6 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#595550]">Media Mode:</span>
                <button
                  onClick={() => setMediaType('image')}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    mediaType === 'image' ? 'bg-[#2D2A26] text-white' : 'bg-[#FAF8F5] text-[#595550] border border-[#E5E0D8]'
                  }`}
                >
                  Image Synthesis
                </button>
                <button
                  onClick={() => setMediaType('video')}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    mediaType === 'video' ? 'bg-[#2D2A26] text-white' : 'bg-[#FAF8F5] text-[#595550] border border-[#E5E0D8]'
                  }`}
                >
                  Veo 3.1 Video
                </button>
                <button
                  onClick={() => setMediaType('music')}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    mediaType === 'music' ? 'bg-[#2D2A26] text-white' : 'bg-[#FAF8F5] text-[#595550] border border-[#E5E0D8]'
                  }`}
                >
                  Lyria Music Track
                </button>
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-[#2D2A26] block mb-1">
                  Creative Prompt *
                </label>
                <textarea
                  rows={3}
                  value={mediaPrompt}
                  onChange={(e) => setMediaPrompt(e.target.value)}
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded font-serif focus:outline-none focus:border-[#D96C4A]"
                />
              </div>

              {mediaType !== 'music' && (
                <div className="flex items-center gap-4 text-xs font-sans">
                  <span className="font-semibold text-[#2D2A26]">Aspect Ratio:</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="ar"
                      value="16:9"
                      checked={aspectRatio === '16:9'}
                      onChange={() => setAspectRatio('16:9')}
                    />
                    <span>16:9 Landscape</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="ar"
                      value="9:16"
                      checked={aspectRatio === '9:16'}
                      onChange={() => setAspectRatio('9:16')}
                    />
                    <span>9:16 Portrait</span>
                  </label>
                </div>
              )}

              <button
                onClick={handleGenerateMedia}
                disabled={mediaLoading}
                className="px-5 py-2.5 bg-[#D96C4A] hover:bg-[#B85536] disabled:opacity-50 text-white rounded text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                {mediaLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing in Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate with {mediaType === 'video' ? 'Veo 3.1' : mediaType === 'music' ? 'Lyria' : 'Gemini'}</span>
                  </>
                )}
              </button>

              {mediaStatus && (
                <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded text-xs font-mono text-[#595550]">
                  {mediaStatus}
                </div>
              )}

              {generatedMediaUrl && mediaType === 'music' && (
                <div className="p-4 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                  <audio controls src={generatedMediaUrl} className="w-full" />
                </div>
              )}

              {generatedMediaUrl && mediaType === 'image' && (
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8] max-w-sm">
                  <img src={generatedMediaUrl} alt="Synthesized design asset" className="rounded w-full" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
