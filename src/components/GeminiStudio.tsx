import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Search, MapPin, Mic, MicOff, Volume2, 
  Sparkles, Video, Music, Image as ImageIcon, Send, X, 
  Bot, RefreshCw, ExternalLink, Play, Pause, AlertCircle, 
  CheckCircle2, ArrowRight, Upload, Film, Clapperboard, 
  Trash2, Download, Sliders, Info, Zap, Cpu
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  model?: string;
  sources?: Array<{ title: string; uri: string }>;
}

interface GeneratedVideo {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  type: 'text-to-video' | 'animate-photo';
  timestamp: string;
}

export const GeminiStudio: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'video' | 'search' | 'maps' | 'transcribe' | 'media'>('chat');
  
  // ----------------------------------------------------
  // 1. CHATBOT STATE
  // ----------------------------------------------------
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hello! I am your Gemini AI Architecture & Strategy Companion. I can help analyze web design token architectures, synthesize high data-ink executive dashboards, or critique digital business models. How can I assist you?",
      model: 'gemini-3.8-flash',
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatRole, setChatRole] = useState<'architect' | 'analytics' | 'strategy' | 'presentation' | 'general'>('architect');
  // Required models: gemini-4-argon (complex), gemini-3.8-flash (general), gemini-3.1-flash-lite (fast)
  const [chatModel, setChatModel] = useState<'gemini-4-argon' | 'gemini-3.8-flash' | 'gemini-3.1-flash-lite'>('gemini-3.8-flash');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [customSystemInstruction, setCustomSystemInstruction] = useState('');
  const [showRoleCustomizer, setShowRoleCustomizer] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------
  // 2. VIDEO STUDIO STATE (gemini-omni-1.1-flash via Interactions API)
  // ----------------------------------------------------
  const [videoMode, setVideoMode] = useState<'animate' | 'text'>('animate');
  const [videoPrompt, setVideoPrompt] = useState('A sleek architectural studio with morning sunlight shifting across travertine stone desks and glass partitions');
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoDuration, setVideoDuration] = useState<'5s' | '10s'>('5s');
  
  // Photo animation state
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoMimeType, setPhotoMimeType] = useState<string>('image/png');
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);
  const [motionPrompt, setMotionPrompt] = useState('Gently animate the scene with natural ambient camera push-in, soft lighting transitions, and subtle spatial depth');
  
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [videoProgressMessage, setVideoProgressMessage] = useState<string | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoHistory, setVideoHistory] = useState<GeneratedVideo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----------------------------------------------------
  // 3. SEARCH GROUNDING STATE
  // ----------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{ answer: string; sources: Array<{ title: string; uri: string }> } | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // ----------------------------------------------------
  // 4. MAPS GROUNDING STATE
  // ----------------------------------------------------
  const [mapsQuery, setMapsQuery] = useState('Top independent design studios and digital agencies in Zurich and San Francisco');
  const [mapsResult, setMapsResult] = useState<string | null>(null);
  const [isMapsLoading, setIsMapsLoading] = useState(false);

  // ----------------------------------------------------
  // 5. AUDIO TRANSCRIPTION STATE
  // ----------------------------------------------------
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // ----------------------------------------------------
  // 6. IMAGE & MUSIC MEDIA STATE
  // ----------------------------------------------------
  const [imagePrompt, setImagePrompt] = useState('A minimalist travertine architectural desk with an open typography notebook, warm diffused side lighting');
  const [musicPrompt, setMusicPrompt] = useState('A calm, ambient acoustic study track with soft organic strings for thoughtful reading');
  const [imageAspectRatio, setImageAspectRatio] = useState<'16:9' | '1:1' | '9:16'>('16:9');
  const [mediaLoading, setMediaLoading] = useState(false);
  const [generatedMediaUrl, setGeneratedMediaUrl] = useState<string | null>(null);
  const [mediaStatus, setMediaStatus] = useState<string | null>(null);

  // ----------------------------------------------------
  // 7. TTS AUDIO STATE
  // ----------------------------------------------------
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  // ----------------------------------------------------
  // HANDLERS: CHAT
  // ----------------------------------------------------
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
          systemInstruction: customSystemInstruction || undefined,
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

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        text: `Chat thread reset. Current role: ${chatRole.toUpperCase()} · Model: ${chatModel}. How can I help you today?`,
        model: chatModel,
      }
    ]);
  };

  // ----------------------------------------------------
  // HANDLERS: VIDEO GENERATION (gemini-omni-1.1-flash via Interactions API)
  // ----------------------------------------------------
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPhotoBase64(result);
      setPhotoMimeType(file.type || 'image/png');
      setPhotoFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleAnimatePhoto = async () => {
    if (!photoBase64) {
      setVideoError('Please upload a photo first to animate into a video.');
      return;
    }

    setIsVideoGenerating(true);
    setVideoError(null);
    setVideoProgressMessage('Sending photo to gemini-omni-1.1-flash via Interactions API...');

    try {
      const res = await fetch('/api/animate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: photoBase64,
          mimeType: photoMimeType,
          motionPrompt: motionPrompt.trim(),
          aspectRatio: videoAspectRatio,
        }),
      });

      const data = await res.json();
      if (data.videoUrl) {
        setCurrentVideoUrl(data.videoUrl);
        setVideoProgressMessage('Animation synthesized successfully!');
        const newRecord: GeneratedVideo = {
          id: `vid-${Date.now()}`,
          url: data.videoUrl,
          prompt: motionPrompt,
          aspectRatio: videoAspectRatio,
          type: 'animate-photo',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setVideoHistory((prev) => [newRecord, ...prev]);
      } else {
        setVideoError(data.error || 'Unable to generate video. Verify your API key capabilities.');
        setVideoProgressMessage(null);
      }
    } catch (err: any) {
      setVideoError(err.message || 'Error occurred during photo animation.');
      setVideoProgressMessage(null);
    } finally {
      setIsVideoGenerating(false);
    }
  };

  const handleGenerateTextToVideo = async () => {
    if (!videoPrompt.trim()) {
      setVideoError('Please provide a prompt describing the video.');
      return;
    }

    setIsVideoGenerating(true);
    setVideoError(null);
    setVideoProgressMessage('Calling gemini-omni-1.1-flash text-to-video via Interactions API...');

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: videoPrompt.trim(),
          aspectRatio: videoAspectRatio,
          duration: videoDuration,
        }),
      });

      const data = await res.json();
      if (data.videoUrl) {
        setCurrentVideoUrl(data.videoUrl);
        setVideoProgressMessage('Video generated successfully!');
        const newRecord: GeneratedVideo = {
          id: `vid-${Date.now()}`,
          url: data.videoUrl,
          prompt: videoPrompt,
          aspectRatio: videoAspectRatio,
          type: 'text-to-video',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setVideoHistory((prev) => [newRecord, ...prev]);
      } else {
        setVideoError(data.error || 'Video generation failed. Verify API key capabilities.');
        setVideoProgressMessage(null);
      }
    } catch (err: any) {
      setVideoError(err.message || 'Error occurred during video synthesis.');
      setVideoProgressMessage(null);
    } finally {
      setIsVideoGenerating(false);
    }
  };

  // ----------------------------------------------------
  // HANDLERS: GROUNDING & TRANSCRIPTION
  // ----------------------------------------------------
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

  const handleGenerateImage = async () => {
    setMediaLoading(true);
    setMediaStatus('Synthesizing image with Gemini image engine...');
    setGeneratedMediaUrl(null);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt, aspectRatio: imageAspectRatio }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedMediaUrl(data.imageUrl);
        setMediaStatus('Image synthesized successfully.');
      } else {
        setMediaStatus(data.error || 'Image generation completed.');
      }
    } catch (err: any) {
      setMediaStatus(err.message || 'Generation request error.');
    } finally {
      setMediaLoading(false);
    }
  };

  const handleGenerateMusic = async () => {
    setMediaLoading(true);
    setMediaStatus('Synthesizing study soundtrack with Lyria...');
    setGeneratedMediaUrl(null);

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: musicPrompt }),
      });
      const data = await res.json();
      if (data.audioBase64) {
        setGeneratedMediaUrl(`data:audio/wav;base64,${data.audioBase64}`);
        setMediaStatus('Lyria audio clip synthesized.');
      } else {
        setMediaStatus(data.error || 'Music synthesis complete.');
      }
    } catch (err: any) {
      setMediaStatus(err.message || 'Music generation error.');
    } finally {
      setMediaLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#FAF8F5] rounded-xl border border-[#E5E0D8] w-full max-w-5xl h-[95vh] sm:h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#2D2A26]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 border-b border-[#E5E0D8] bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#D96C4A] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-sans font-bold text-sm sm:text-base text-[#2D2A26] truncate">
                  Penil's AI Creative &amp; Research Studio
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-[#FAF8F5] border border-[#E5E0D8] text-[10px] font-mono text-[#D96C4A] rounded">
                  Gemini Interactions API
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#595550] hidden sm:block truncate">
                Multi-Turn Chat · Omni 1.1 Video Animation · Search &amp; Maps Grounding · Voice Transcribe
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#595550] hover:text-[#2D2A26] hover:bg-[#FAF8F5] transition-colors cursor-pointer shrink-0"
            aria-label="Close AI Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 bg-white border-b border-[#E5E0D8] overflow-x-auto scrollbar-none text-xs font-sans font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-xs ${
              activeTab === 'chat' ? 'bg-[#2D2A26] text-white shadow-xs' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Gemini Chatbot</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-xs relative ${
              activeTab === 'video' ? 'bg-[#D96C4A] text-white shadow-xs' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Video Studio (Omni 1.1)</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-black/20 text-white font-mono">NEW</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-xs ${
              activeTab === 'search' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('maps')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-xs ${
              activeTab === 'maps' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Maps Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('transcribe')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-xs ${
              activeTab === 'transcribe' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Transcription</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-xs ${
              activeTab === 'media' ? 'bg-[#2D2A26] text-white' : 'text-[#595550] hover:bg-[#FAF8F5]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Image &amp; Music</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: GEMINI CHATBOT (MULTI-TURN, ROLES, MODEL SELECT) */}
        {/* ==================================================== */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#FAF8F5]">
            {/* Model & Persona Controls Bar */}
            <div className="px-4 sm:px-6 py-2.5 bg-white/90 border-b border-[#E5E0D8] flex flex-wrap items-center justify-between gap-3 text-xs font-sans shrink-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Specific Roles selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#595550] font-mono text-[11px] font-semibold">ROLE:</span>
                  <select
                    value={chatRole}
                    onChange={(e) => setChatRole(e.target.value as any)}
                    className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded text-[#2D2A26] font-semibold text-xs cursor-pointer focus:outline-none focus:border-[#D96C4A]"
                  >
                    <option value="architect">Website Architecture Specialist</option>
                    <option value="analytics">Business Analytics &amp; Dashboard Advisor</option>
                    <option value="strategy">Digital Business &amp; Micro-SaaS Strategist</option>
                    <option value="presentation">Executive Presentation Designer</option>
                    <option value="general">General Strategic Advisor</option>
                  </select>
                </div>

                {/* Model Selector: gemini-4-argon, gemini-3.8-flash, gemini-3.1-flash-lite */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#595550] font-mono text-[11px] font-semibold">MODEL:</span>
                  <select
                    value={chatModel}
                    onChange={(e) => setChatModel(e.target.value as any)}
                    className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded text-[#2D2A26] font-mono text-[11px] font-semibold cursor-pointer focus:outline-none focus:border-[#D96C4A]"
                  >
                    <option value="gemini-4-argon">gemini-4-argon (Complex Tasks)</option>
                    <option value="gemini-3.8-flash">gemini-3.8-flash (General Tasks · Default)</option>
                    <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast Tasks)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowRoleCustomizer(!showRoleCustomizer)}
                  className={`px-2 py-1 rounded text-[11px] font-mono border transition-colors cursor-pointer flex items-center gap-1 ${
                    showRoleCustomizer 
                      ? 'bg-[#2D2A26] text-white border-[#2D2A26]' 
                      : 'bg-white text-[#595550] border-[#E5E0D8] hover:text-[#2D2A26]'
                  }`}
                  title="Customize system instruction prompt"
                >
                  <Sliders className="w-3 h-3" />
                  <span>Custom Prompt</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearChat}
                  className="px-2 py-1 rounded text-[11px] font-mono text-[#595550] hover:text-rose-600 bg-white border border-[#E5E0D8] hover:border-rose-300 transition-colors cursor-pointer flex items-center gap-1"
                  title="Clear conversation thread"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Reset Thread</span>
                </button>
              </div>
            </div>

            {/* Optional Custom System Instruction Panel */}
            {showRoleCustomizer && (
              <div className="p-3 bg-[#FAF8F5] border-b border-[#E5E0D8] px-4 sm:px-6 animate-in slide-in-from-top-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#D96C4A]">
                    Custom System Instruction (Role Override)
                  </span>
                  <button
                    onClick={() => setCustomSystemInstruction('')}
                    className="text-[10px] font-mono text-[#595550] hover:underline cursor-pointer"
                  >
                    Reset to Default Role
                  </button>
                </div>
                <input
                  type="text"
                  value={customSystemInstruction}
                  onChange={(e) => setCustomSystemInstruction(e.target.value)}
                  placeholder="e.g. Act as a senior database architect reviewing PostgreSQL sharding and schema normal forms..."
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E0D8] rounded focus:outline-none focus:border-[#D96C4A] font-sans"
                />
              </div>
            )}

            {/* Scrollable Conversation Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 sm:gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2D2A26] text-white flex items-center justify-center font-mono text-[10px] sm:text-xs font-semibold shrink-0 shadow-xs">
                      AI
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-lg p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#D96C4A] text-white font-sans rounded-br-none shadow-xs'
                        : 'bg-white border border-[#E5E0D8] text-[#2D2A26] font-serif rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.role === 'assistant' && (
                      <div className="mt-2.5 pt-2 border-t border-[#E5E0D8]/70 flex items-center justify-between text-[10px] font-mono text-[#595550]">
                        <span className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E5E0D8]">
                          {m.model || chatModel}
                        </span>
                        <button
                          onClick={() => handlePlayTTS(m.text)}
                          className="hover:text-[#D96C4A] flex items-center gap-1 cursor-pointer transition-colors"
                          title="Listen to response with speech synthesis"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>{isTtsPlaying ? 'Playing...' : 'Listen'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[#2D2A26] flex items-center justify-center font-mono text-[10px] sm:text-xs font-semibold shrink-0">
                      PV
                    </div>
                  )}
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#595550] bg-white p-3 rounded-lg border border-[#E5E0D8] max-w-xs shadow-xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D96C4A]" />
                  <span>{chatModel} is generating multi-turn response...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 sm:px-6 py-2 bg-white/60 border-t border-[#E5E0D8]/60 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] font-sans">
              <span className="text-[#595550] font-mono text-[10px] shrink-0 font-semibold">PRESETS:</span>
              <button
                type="button"
                onClick={() => setInputMessage('Explain how zero-pill metadata discipline enhances visual readability and typography hierarchy on long-form articles.')}
                className="px-2.5 py-1 bg-white border border-[#E5E0D8] rounded hover:border-[#D96C4A] text-[#2D2A26] shrink-0 cursor-pointer transition-colors"
              >
                Zero-Pill Typography
              </button>
              <button
                type="button"
                onClick={() => setInputMessage('How should an executive dashboard organize North Star, leading, and trailing metrics for weekly reviews?')}
                className="px-2.5 py-1 bg-white border border-[#E5E0D8] rounded hover:border-[#D96C4A] text-[#2D2A26] shrink-0 cursor-pointer transition-colors"
              >
                Executive Dashboard KPIs
              </button>
              <button
                type="button"
                onClick={() => setInputMessage('What unit economics benchmarks define sustainable vertical micro-SaaS with low CAC and organic retention?')}
                className="px-2.5 py-1 bg-white border border-[#E5E0D8] rounded hover:border-[#D96C4A] text-[#2D2A26] shrink-0 cursor-pointer transition-colors"
              >
                Micro-SaaS Unit Economics
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChat} className="p-3 sm:p-4 bg-white border-t border-[#E5E0D8] flex gap-2 shrink-0">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask ${chatRole} (${chatModel})...`}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#D96C4A] font-sans text-[#2D2A26]"
              />
              <button
                type="submit"
                disabled={isChatLoading || !inputMessage.trim()}
                className="px-4 sm:px-5 py-2.5 bg-[#D96C4A] hover:bg-[#B85536] disabled:opacity-50 text-white rounded-md font-sans text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send Message</span>
              </button>
            </form>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: VIDEO STUDIO (gemini-omni-1.1-flash INTERACTIONS API) */}
        {/* ==================================================== */}
        {activeTab === 'video' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FAF8F5]">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-mono uppercase text-[#D96C4A] font-bold">
                  Omni Flash Video Engine
                </span>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#E5E0D8] text-[#2D2A26]">
                  Model: gemini-omni-1.1-flash
                </span>
                <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Interactions API
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#2D2A26] mb-1">
                Animate Photos &amp; Synthesize Videos from Text
              </h3>
              <p className="text-xs sm:text-sm font-serif text-[#595550] leading-relaxed">
                Powered by Google’s native Omni Flash video model via <code className="font-mono text-xs text-[#2D2A26]">ai.interactions.create</code>. Animate static images with cinematic motion or generate high-definition video from text prompts in 16:9 landscape or 9:16 portrait.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 border-b border-[#E5E0D8] pb-3">
              <button
                onClick={() => {
                  setVideoMode('animate');
                  setVideoError(null);
                }}
                className={`px-3.5 py-2 rounded-md text-xs font-sans font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                  videoMode === 'animate'
                    ? 'bg-[#2D2A26] text-white shadow-xs'
                    : 'bg-white text-[#595550] border border-[#E5E0D8] hover:text-[#2D2A26]'
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-[#D96C4A]" />
                <span>1. Animate Photo into Video</span>
              </button>

              <button
                onClick={() => {
                  setVideoMode('text');
                  setVideoError(null);
                }}
                className={`px-3.5 py-2 rounded-md text-xs font-sans font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                  videoMode === 'text'
                    ? 'bg-[#2D2A26] text-white shadow-xs'
                    : 'bg-white text-[#595550] border border-[#E5E0D8] hover:text-[#2D2A26]'
                }`}
              >
                <Clapperboard className="w-3.5 h-3.5 text-[#D96C4A]" />
                <span>2. Generate Video from Text</span>
              </button>
            </div>

            {/* Main Interactive Work Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Input Form */}
              <div className="lg:col-span-7 bg-white border border-[#E5E0D8] rounded-lg p-5 sm:p-6 space-y-4 shadow-xs">
                {videoMode === 'animate' ? (
                  <>
                    {/* PHOTO UPLOADER */}
                    <div>
                      <label className="text-xs font-sans font-semibold text-[#2D2A26] block mb-1.5">
                        Upload Photo to Animate *
                      </label>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />

                      {photoBase64 ? (
                        <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-md flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={photoBase64}
                              alt="Upload preview"
                              className="w-14 h-14 object-cover rounded border border-[#E5E0D8] shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-sans font-semibold text-[#2D2A26] truncate">
                                {photoFileName || 'Selected photo'}
                              </p>
                              <span className="text-[10px] font-mono text-[#595550]">
                                Ready for gemini-omni-1.1-flash animation
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2.5 py-1.5 bg-white border border-[#E5E0D8] hover:border-[#D96C4A] text-[11px] font-sans font-semibold rounded text-[#2D2A26] cursor-pointer"
                          >
                            Change Photo
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-[#E5E0D8] hover:border-[#D96C4A] rounded-lg p-6 text-center bg-[#FAF8F5] cursor-pointer transition-colors"
                        >
                          <Upload className="w-8 h-8 mx-auto text-[#D96C4A] mb-2" />
                          <p className="text-xs font-sans font-semibold text-[#2D2A26]">
                            Click or drag an image here to upload
                          </p>
                          <p className="text-[11px] font-mono text-[#595550] mt-1">
                            Supports PNG, JPG, or WEBP (up to 10MB)
                          </p>
                        </div>
                      )}
                    </div>

                    {/* MOTION PROMPT */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-sans font-semibold text-[#2D2A26]">
                          Motion &amp; Camera Prompt
                        </label>
                        <span className="text-[10px] font-mono text-[#595550]">Direction for Omni Flash</span>
                      </div>
                      <textarea
                        rows={2}
                        value={motionPrompt}
                        onChange={(e) => setMotionPrompt(e.target.value)}
                        placeholder="Describe how the camera or elements in the photo should move..."
                        className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded font-serif focus:outline-none focus:border-[#D96C4A]"
                      />
                    </div>

                    {/* QUICK MOTION PRESETS */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#595550] font-semibold block">
                        Quick Motion Presets:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => setMotionPrompt('Cinematic gentle push-in with subtle lighting shifts and soft ambient drift')}
                          className="text-[11px] px-2 py-1 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#D96C4A] rounded text-[#2D2A26] cursor-pointer"
                        >
                          Cinematic Push-In
                        </button>
                        <button
                          type="button"
                          onClick={() => setMotionPrompt('Subtle water ripple and gentle breeze motion through foliage with realistic depth')}
                          className="text-[11px] px-2 py-1 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#D96C4A] rounded text-[#2D2A26] cursor-pointer"
                        >
                          Breeze &amp; Ripple
                        </button>
                        <button
                          type="button"
                          onClick={() => setMotionPrompt('Architectural slow orbit revealing natural sunlight and soft window reflections')}
                          className="text-[11px] px-2 py-1 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#D96C4A] rounded text-[#2D2A26] cursor-pointer"
                        >
                          Architectural Orbit
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* TEXT TO VIDEO PROMPT */}
                    <div>
                      <label className="text-xs font-sans font-semibold text-[#2D2A26] block mb-1.5">
                        Text Prompt for Video *
                      </label>
                      <textarea
                        rows={3}
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        placeholder="Describe the full video scene, lighting, camera movement, and textures in detail..."
                        className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded font-serif focus:outline-none focus:border-[#D96C4A]"
                      />
                    </div>

                    {/* QUICK SCENE PRESETS */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#595550] font-semibold block">
                        Scene Inspirations:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => setVideoPrompt('A minimalist travertine architectural desk with an open typography notebook, warm diffused side lighting, 4k cinematic')}
                          className="text-[11px] px-2 py-1 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#D96C4A] rounded text-[#2D2A26] cursor-pointer"
                        >
                          Design Studio
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoPrompt('Cinematic drone flight over a misty pine valley at sunrise with golden shafts of volumetric morning light')}
                          className="text-[11px] px-2 py-1 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#D96C4A] rounded text-[#2D2A26] cursor-pointer"
                        >
                          Golden Valley
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoPrompt('Slow motion glass prism refracting iridescent rainbow light patterns across a textured stone surface')}
                          className="text-[11px] px-2 py-1 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#D96C4A] rounded text-[#2D2A26] cursor-pointer"
                        >
                          Prism Light
                        </button>
                      </div>
                    </div>

                    {/* DURATION */}
                    <div className="flex items-center gap-4 text-xs font-sans">
                      <span className="font-semibold text-[#2D2A26]">Duration:</span>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="vduration"
                          value="5s"
                          checked={videoDuration === '5s'}
                          onChange={() => setVideoDuration('5s')}
                        />
                        <span>5 Seconds (Standard)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="vduration"
                          value="10s"
                          checked={videoDuration === '10s'}
                          onChange={() => setVideoDuration('10s')}
                        />
                        <span>10 Seconds (Extended)</span>
                      </label>
                    </div>
                  </>
                )}

                {/* ASPECT RATIO SELECTION: 16:9 or 9:16 */}
                <div className="pt-2 border-t border-[#E5E0D8]/80 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#2D2A26]">Aspect Ratio:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer px-2 py-1 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                      <input
                        type="radio"
                        name="var"
                        value="16:9"
                        checked={videoAspectRatio === '16:9'}
                        onChange={() => setVideoAspectRatio('16:9')}
                      />
                      <span className="font-semibold">16:9 Landscape</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer px-2 py-1 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                      <input
                        type="radio"
                        name="var"
                        value="9:16"
                        checked={videoAspectRatio === '9:16'}
                        onChange={() => setVideoAspectRatio('9:16')}
                      />
                      <span className="font-semibold">9:16 Portrait</span>
                    </label>
                  </div>

                  <span className="text-[10px] font-mono text-[#595550]">
                    720p HD · MP4 Output
                  </span>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="button"
                  onClick={videoMode === 'animate' ? handleAnimatePhoto : handleGenerateTextToVideo}
                  disabled={isVideoGenerating || (videoMode === 'animate' && !photoBase64)}
                  className="w-full py-3 bg-[#D96C4A] hover:bg-[#B85536] disabled:opacity-50 text-white rounded-md text-xs font-sans font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                >
                  {isVideoGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Video with gemini-omni-1.1-flash...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {videoMode === 'animate' 
                          ? 'Animate Photo into Video (gemini-omni-1.1-flash)' 
                          : 'Generate Video from Text (gemini-omni-1.1-flash)'}
                      </span>
                    </>
                  )}
                </button>

                {/* PROGRESS / ERROR FEEDBACK */}
                {videoProgressMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs font-mono text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{videoProgressMessage}</span>
                  </div>
                )}

                {videoError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs font-serif text-rose-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">Generation notice:</p>
                      <p className="text-[11px] leading-relaxed font-mono">{videoError}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Video Output Player & History */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white border border-[#E5E0D8] rounded-lg p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#2D2A26] flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-[#D96C4A]" />
                      <span>Video Output Player</span>
                    </span>
                    {currentVideoUrl && (
                      <a
                        href={currentVideoUrl}
                        download={`omni-video-${Date.now()}.mp4`}
                        className="text-xs font-sans font-semibold text-[#D96C4A] hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download MP4</span>
                      </a>
                    )}
                  </div>

                  {currentVideoUrl ? (
                    <div className="space-y-3">
                      <div className="rounded-lg overflow-hidden bg-black flex items-center justify-center border border-[#E5E0D8]">
                        <video
                          src={currentVideoUrl}
                          controls
                          autoPlay
                          loop
                          playsInline
                          className={`w-full max-h-[380px] object-contain ${videoAspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'}`}
                        />
                      </div>
                      <div className="p-2.5 bg-[#FAF8F5] rounded border border-[#E5E0D8] text-[11px] font-mono text-[#595550] flex items-center justify-between">
                        <span>Model: gemini-omni-1.1-flash</span>
                        <span>Ratio: {videoAspectRatio}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-14 text-center bg-[#FAF8F5] rounded-lg border border-[#E5E0D8] p-6 space-y-2">
                      <Video className="w-10 h-10 mx-auto text-[#595550]/40" />
                      <p className="text-xs font-sans font-semibold text-[#2D2A26]">
                        No video generated yet
                      </p>
                      <p className="text-[11px] font-serif text-[#595550] max-w-xs mx-auto">
                        Upload a photo to animate or enter a text prompt, then click generate.
                      </p>
                    </div>
                  )}
                </div>

                {/* Session Video History */}
                {videoHistory.length > 0 && (
                  <div className="bg-white border border-[#E5E0D8] rounded-lg p-4 shadow-xs space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#595550] font-semibold block mb-1">
                      Recent Session Renders ({videoHistory.length})
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {videoHistory.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setCurrentVideoUrl(item.url)}
                          className="p-2 bg-[#FAF8F5] hover:bg-[#E5E0D8]/40 border border-[#E5E0D8] rounded text-xs cursor-pointer flex items-center justify-between gap-2 transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="font-semibold text-[#2D2A26] block truncate">
                              {item.type === 'animate-photo' ? 'Photo Animation' : 'Text-to-Video'}: {item.prompt}
                            </span>
                            <span className="text-[10px] font-mono text-[#595550]">
                              {item.aspectRatio} · {item.timestamp}
                            </span>
                          </div>
                          <Play className="w-3.5 h-3.5 text-[#D96C4A] shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: GOOGLE SEARCH GROUNDING */}
        {/* ==================================================== */}
        {activeTab === 'search' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                Real-Time Search Grounding
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
                Live Web Research with Google Search
              </h3>
              <p className="text-xs sm:text-sm font-serif text-[#595550] leading-relaxed">
                Queries the live web via <code className="font-mono text-xs text-[#2D2A26]">gemini-3.5-flash</code> with the <code className="font-mono text-xs text-[#2D2A26]">googleSearch</code> tool to provide up-to-date benchmarks, design system documentation, and industry case studies.
              </p>
            </div>

            <form onSubmit={handleSearchGrounding} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Latest CSS container queries adoption and OKLCH browser support in 2026"
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#D96C4A] font-sans"
              />
              <button
                type="submit"
                disabled={isSearchLoading || !searchQuery.trim()}
                className="px-5 py-2.5 bg-[#2D2A26] hover:bg-[#D96C4A] disabled:opacity-50 text-white rounded-md font-sans text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
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
              <div className="bg-white border border-[#E5E0D8] rounded-lg p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Google Search Grounded
                  </span>
                  <span className="text-xs font-mono text-[#595550]">gemini-3.5-flash</span>
                </div>

                <div className="prose prose-stone max-w-none font-serif text-[#2D2A26] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
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
                          title={`Read verified source: ${src.title || src.uri}`}
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[220px]">{src.title || src.uri || 'External Source'}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: GOOGLE MAPS GROUNDING */}
        {/* ==================================================== */}
        {activeTab === 'maps' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                Spatial &amp; Location Intelligence
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
                Google Maps Grounding
              </h3>
              <p className="text-xs sm:text-sm font-serif text-[#595550] leading-relaxed">
                Connects <code className="font-mono text-xs text-[#2D2A26]">gemini-3.5-flash</code> with the <code className="font-mono text-xs text-[#2D2A26]">googleMaps</code> tool to explore geographic context for design studios, tech campuses, and creative collectives.
              </p>
            </div>

            <form onSubmit={handleMapsGrounding} className="flex gap-2">
              <input
                type="text"
                value={mapsQuery}
                onChange={(e) => setMapsQuery(e.target.value)}
                placeholder="e.g. Creative digital agencies and design collectives in Munich"
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#D96C4A] font-sans"
              />
              <button
                type="submit"
                disabled={isMapsLoading || !mapsQuery.trim()}
                className="px-5 py-2.5 bg-[#2D2A26] hover:bg-[#D96C4A] disabled:opacity-50 text-white rounded-md font-sans text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
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
              <div className="bg-white border border-[#E5E0D8] rounded-lg p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <span className="text-xs font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Google Maps Grounded Output
                  </span>
                  <span className="text-xs font-mono text-[#595550]">gemini-3.5-flash</span>
                </div>
                <div className="font-serif text-[#2D2A26] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {mapsResult}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: VOICE TRANSCRIPTION */}
        {/* ==================================================== */}
        {activeTab === 'transcribe' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                Speech to Text
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
                Voice Note Transcription with gemini-3.5-transcribe
              </h3>
              <p className="text-xs sm:text-sm font-serif text-[#595550] leading-relaxed">
                Dictate thoughts, design critiques, or business reflections directly through your microphone. Audio is encoded and transcribed server-side.
              </p>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-lg p-8 text-center space-y-4 shadow-xs max-w-lg mx-auto">
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
                  {isRecording ? 'Listening... Click to Finish Recording' : 'Click Microphone to Start Speaking'}
                </h4>
                <p className="text-xs font-mono text-[#595550] mt-1">
                  {isRecording ? 'Recording active audio stream...' : 'Transcribes to clean text via gemini-3.5-transcribe'}
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
              <div className="bg-white border border-[#E5E0D8] rounded-lg p-5 sm:p-6 space-y-3 shadow-xs">
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
                <p className="font-serif text-[#2D2A26] text-xs sm:text-sm leading-relaxed bg-[#FAF8F5] p-4 rounded border border-[#E5E0D8]">
                  "{transcribedText}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: IMAGE & MUSIC STUDIO */}
        {/* ==================================================== */}
        {activeTab === 'media' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#D96C4A] font-semibold block mb-1">
                Visual &amp; Acoustic Synthesis
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#2D2A26] mb-2">
                Gemini Image &amp; Lyria Music Studio
              </h3>
              <p className="text-xs sm:text-sm font-serif text-[#595550] leading-relaxed">
                Generate custom design illustrations using Gemini Image models or compose acoustic focus tracks with Lyria preview.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Box */}
              <div className="bg-white border border-[#E5E0D8] rounded-lg p-5 space-y-3 shadow-xs">
                <span className="text-xs font-mono text-[#D96C4A] font-semibold flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Image Synthesis</span>
                </span>
                <textarea
                  rows={3}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the aesthetic composition..."
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded font-serif focus:outline-none focus:border-[#D96C4A]"
                />
                <button
                  onClick={handleGenerateImage}
                  disabled={mediaLoading}
                  className="w-full py-2 bg-[#2D2A26] hover:bg-[#D96C4A] text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                >
                  Generate Image
                </button>
              </div>

              {/* Music Box */}
              <div className="bg-white border border-[#E5E0D8] rounded-lg p-5 space-y-3 shadow-xs">
                <span className="text-xs font-mono text-[#D96C4A] font-semibold flex items-center gap-1">
                  <Music className="w-3.5 h-3.5" />
                  <span>Lyria Music Composition</span>
                </span>
                <textarea
                  rows={3}
                  value={musicPrompt}
                  onChange={(e) => setMusicPrompt(e.target.value)}
                  placeholder="Describe tempo, instruments, and mood..."
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded font-serif focus:outline-none focus:border-[#D96C4A]"
                />
                <button
                  onClick={handleGenerateMusic}
                  disabled={mediaLoading}
                  className="w-full py-2 bg-[#2D2A26] hover:bg-[#D96C4A] text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                >
                  Generate Soundtrack
                </button>
              </div>
            </div>

            {mediaStatus && (
              <div className="p-3 bg-white border border-[#E5E0D8] rounded text-xs font-mono text-[#595550]">
                {mediaStatus}
              </div>
            )}

            {generatedMediaUrl && (
              <div className="p-4 bg-white border border-[#E5E0D8] rounded-lg">
                {generatedMediaUrl.startsWith('data:audio') ? (
                  <audio controls src={generatedMediaUrl} className="w-full" />
                ) : (
                  <img src={generatedMediaUrl} alt="Synthesized design visual" className="rounded max-h-72 object-contain mx-auto" />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
