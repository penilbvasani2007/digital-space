import React, { useState, useEffect, useCallback } from 'react';
import { GameCanvas } from './GameCanvas';
import { GameState, GameStats } from './types';
import { sound } from './audio';
import { Volume2, VolumeX, Play, RotateCcw, X, Shield, Zap, Sparkles, Trophy, Flame } from 'lucide-react';

interface GameShellProps {
  onExitGame: () => void;
}

export const GameShell: React.FC<GameShellProps> = ({ onExitGame }) => {
  const [gameState, setGameState] = useState<GameState>('title');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [clarityTrigger, setClarityTrigger] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('data_runner_high_score') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [stats, setStats] = useState<GameStats>({
    score: 0,
    highScore: 0,
    distance: 0,
    combo: 1,
    maxCombo: 1,
    nodesCollected: 0,
    clutterCleared: 0,
    health: 100,
    clarityEnergy: 100,
    speed: 38,
  });

  // Handle global keyboard shortcuts (Space/Enter to start, Esc to pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'title') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          startGame();
        }
      } else if (gameState === 'playing') {
        if (e.code === 'Escape' || e.code === 'KeyP') {
          e.preventDefault();
          pauseGame();
        }
      } else if (gameState === 'paused') {
        if (e.code === 'Escape' || e.code === 'KeyP' || e.code === 'Space') {
          e.preventDefault();
          resumeGame();
        }
      } else if (gameState === 'gameover') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          restartGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const startGame = useCallback(() => {
    setStats({
      score: 0,
      highScore,
      distance: 0,
      combo: 1,
      maxCombo: 1,
      nodesCollected: 0,
      clutterCleared: 0,
      health: 100,
      clarityEnergy: 100,
      speed: 38,
    });
    setGameState('playing');
    sound.startMusic();
  }, [highScore]);

  const pauseGame = useCallback(() => {
    setGameState('paused');
    sound.stopMusic();
  }, []);

  const resumeGame = useCallback(() => {
    setGameState('playing');
    sound.startMusic();
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const handleGameOver = useCallback((finalStats: GameStats) => {
    setGameState('gameover');
    sound.stopMusic();
    setHighScore((prev) => {
      const next = Math.max(prev, finalStats.score);
      try {
        localStorage.setItem('data_runner_high_score', next.toString());
      } catch {}
      return next;
    });
  }, []);

  const toggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleClarityPulse = () => {
    setClarityTrigger((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-[#141312] text-[#f5f0e8] select-none overflow-hidden font-sans">
      {/* 3D WebGL Canvas Engine */}
      <GameCanvas
        gameState={gameState}
        onUpdateStats={setStats}
        onGameOver={handleGameOver}
        clarityTrigger={clarityTrigger}
        isMuted={isMuted}
      />

      {/* Low-Occlusion UI Layer (pointer-events: none on wrapper, no backdrop-filter) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3.5 sm:p-6">
        {/* TOP STATUS CLUSTERS */}
        <div className="flex items-start justify-between w-full">
          {/* Top Left: North Star Metric & Multiplier */}
          {gameState === 'playing' && (
            <div className="bg-[#1f1d1a]/90 border border-[#3d3832] p-2.5 sm:p-3 rounded-lg shadow-lg flex items-center gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d96c4a] block font-semibold">
                  NORTH STAR METRIC
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold tabular-nums text-white">
                  {stats.score.toLocaleString()}
                </span>
              </div>
              {stats.combo > 1 && (
                <div className="flex items-center gap-1 bg-[#d96c4a]/20 border border-[#d96c4a] px-2 py-1 rounded text-xs font-mono font-bold text-[#d96c4a]">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{stats.combo}x STREAK</span>
                </div>
              )}
            </div>
          )}

          {gameState === 'title' && (
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#2a2723] border border-[#3d3832] text-xs font-mono text-[#a8a29a]">
                HIGH SCORE: <strong className="text-white tabular-nums">{highScore.toLocaleString()}</strong>
              </span>
            </div>
          )}

          {/* Top Right: Cognitive Clarity (Health) & Controls */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            {gameState === 'playing' && (
              <div className="bg-[#1f1d1a]/90 border border-[#3d3832] px-3 py-2 rounded-lg flex items-center gap-2.5">
                <Shield className={`w-4 h-4 ${stats.health > 40 ? 'text-[#4ade80]' : 'text-[#ef4444]'}`} />
                <div className="w-24 sm:w-32 bg-[#2d2925] h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-150 ${
                      stats.health > 60 ? 'bg-[#4ade80]' : stats.health > 30 ? 'bg-[#f59e0b]' : 'bg-[#ef4444]'
                    }`}
                    style={{ width: `${stats.health}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold tabular-nums text-white">
                  {Math.round(stats.health)}%
                </span>
              </div>
            )}

            <button
              onClick={toggleMute}
              className="p-2 sm:p-2.5 rounded-lg bg-[#1f1d1a]/90 border border-[#3d3832] hover:border-[#d96c4a] text-[#a8a29a] hover:text-white transition-colors"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {gameState === 'playing' && (
              <button
                onClick={pauseGame}
                className="px-3 py-2 rounded-lg bg-[#1f1d1a]/90 border border-[#3d3832] hover:border-[#d96c4a] text-xs font-mono text-[#a8a29a] hover:text-white transition-colors"
              >
                ESC PAUSE
              </button>
            )}

            <button
              onClick={onExitGame}
              className="p-2 sm:p-2.5 rounded-lg bg-[#1f1d1a]/90 border border-[#3d3832] hover:border-[#ef4444] text-[#a8a29a] hover:text-[#ef4444] transition-colors"
              title="Exit to Notebook"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BOTTOM STATUS & MOBILE ACTION CONTROLS */}
        {gameState === 'playing' && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Speedometer & Nodes */}
            <div className="flex items-center gap-3 bg-[#1f1d1a]/90 border border-[#3d3832] px-3.5 py-2 rounded-lg text-xs font-mono text-[#a8a29a]">
              <span>VELOCITY: <strong className="text-white tabular-nums">{Math.round(stats.speed)} kn</strong></span>
              <span>·</span>
              <span>DISTANCE: <strong className="text-[#38bdf8] tabular-nums">{Math.round(stats.distance)} m</strong></span>
            </div>

            {/* Clarity Pulse Shockwave Action (Mobile Touch + Desktop Indicator) */}
            <div className="pointer-events-auto flex items-center gap-3">
              <button
                onClick={handleClarityPulse}
                disabled={stats.clarityEnergy < 25}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all shadow-lg ${
                  stats.clarityEnergy >= 25
                    ? 'bg-[#0284c7] hover:bg-[#38bdf8] text-white active:scale-95 shadow-[#0284c7]/40'
                    : 'bg-[#2a2723] text-[#78716c] cursor-not-allowed border border-[#3d3832]'
                }`}
              >
                <Zap className="w-4 h-4 text-[#38bdf8]" />
                <span>CLARITY PULSE (SPACE)</span>
                <span className="text-[10px] tabular-nums bg-black/30 px-1.5 py-0.5 rounded">
                  {Math.round(stats.clarityEnergy)}%
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. TITLE SCREEN OVERLAY */}
      {/* ========================================================================= */}
      {gameState === 'title' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 z-10 pointer-events-none">
          {/* 30-40% Negative space with Bespoke Title Lockup */}
          <div className="max-w-[620px] pt-12 sm:pt-20">
            {/* Bespoke inline SVG Title Lockup */}
            <div className="flex items-center gap-2.5 mb-3">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="2" width="24" height="24" rx="4" stroke="#d96c4a" strokeWidth="2" />
                <path d="M 8 14 L 14 8 L 20 14 L 14 20 Z" fill="#d96c4a" />
              </svg>
              <span className="text-xs font-mono uppercase tracking-[2px] text-[#d96c4a] font-bold">
                PENIL'S DIGITAL SPACE · 3D EXPERIMENT
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight leading-[1.05] text-white mb-4 drop-shadow-md">
              DATA RUNNER 3D
            </h1>

            <p className="text-sm sm:text-base font-serif text-[#a8a29a] leading-relaxed mb-8 max-w-[500px]">
              Pilot the architectural kinetic cursor across high-ink isometric pipelines. Collect clean KPI tokens, dodge cognitive bloat monoliths, and unleash Clarity Shockwaves to dissolve visual clutter.
            </p>

            {/* Primary Start CTA */}
            <div className="pointer-events-auto flex flex-wrap items-center gap-4">
              <button
                onClick={startGame}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#d96c4a] hover:bg-[#b85536] text-white rounded-lg font-mono text-sm font-bold tracking-wide transition-all shadow-xl active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>START ARCHITECTURE RUN (SPACE)</span>
              </button>

              <button
                onClick={onExitGame}
                className="inline-flex items-center gap-2 px-4 py-3 bg-[#1f1d1a]/80 border border-[#3d3832] hover:border-[#a8a29a] text-xs font-mono text-[#a8a29a] hover:text-white rounded-lg transition-colors"
              >
                <span>EXIT TO NOTEBOOK</span>
              </button>
            </div>
          </div>

          {/* Single Flat Control-Hint Line */}
          <div className="pb-4 border-t border-[#2d2925] pt-4">
            <p className="font-mono text-xs text-[#78716c] tracking-wide">
              A / D / Arrows <span className="text-[#a8a29a]">Steer</span> · Space / Enter <span className="text-[#a8a29a]">Clarity Shockwave</span> · Esc <span className="text-[#a8a29a]">Pause</span> · Touch Drag <span className="text-[#a8a29a]">Mobile Steer</span>
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PAUSE MODAL */}
      {/* ========================================================================= */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-4 z-20">
          <div className="bg-[#1a1816] border border-[#3d3832] rounded-xl p-6 sm:p-8 max-w-[420px] w-full text-center shadow-2xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d96c4a] font-bold">
              SIMULATION PAUSED
            </span>
            <h2 className="text-2xl font-serif font-bold text-white">System in Equilibrium</h2>
            <div className="p-4 bg-[#141312] border border-[#2d2925] rounded-lg text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-[#a8a29a]">Current Score:</span>
                <span className="text-white font-bold tabular-nums">{stats.score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a8a29a]">Distance Covered:</span>
                <span className="text-[#38bdf8] font-bold tabular-nums">{Math.round(stats.distance)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a8a29a]">High-Ink Pickups:</span>
                <span className="text-[#4ade80] font-bold tabular-nums">{stats.nodesCollected}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={resumeGame}
                className="w-full py-3 bg-[#d96c4a] hover:bg-[#b85536] text-white font-mono text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>RESUME RUN (ESC)</span>
              </button>

              <button
                onClick={restartGame}
                className="w-full py-2.5 bg-[#25221f] hover:bg-[#322e2a] border border-[#3d3832] text-white font-mono text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESTART SIMULATION</span>
              </button>

              <button
                onClick={onExitGame}
                className="w-full py-2 text-xs font-mono text-[#a8a29a] hover:text-[#ef4444] transition-colors"
              >
                Exit to Notebook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. GAME OVER MODAL */}
      {/* ========================================================================= */}
      {gameState === 'gameover' && (
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-4 z-20">
          <div className="bg-[#1a1816] border border-[#ef4444]/60 rounded-xl p-6 sm:p-8 max-w-[460px] w-full text-center shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-[#ef4444]/20 border border-[#ef4444] flex items-center justify-center mx-auto text-[#ef4444]">
              <X className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ef4444] font-bold block mb-1">
                COGNITIVE OVERLOAD DETECTED
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Architecture Run Terminated
              </h2>
            </div>

            {/* Score & Detailed Analytics */}
            <div className="p-4 bg-[#141312] border border-[#2d2925] rounded-lg text-left text-xs font-mono space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-[#2d2925]">
                <span className="text-[#a8a29a]">FINAL METRIC SCORE:</span>
                <span className="text-xl text-[#d96c4a] font-bold tabular-nums">
                  {stats.score.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a8a29a]">Peak Multiplier Streak:</span>
                <span className="text-white font-bold tabular-nums">{stats.maxCombo}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a8a29a]">Distance Traversed:</span>
                <span className="text-[#38bdf8] font-bold tabular-nums">{Math.round(stats.distance)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a8a29a]">Clutter Dissolved (Shockwave):</span>
                <span className="text-[#4ade80] font-bold tabular-nums">{stats.clutterCleared}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a8a29a]">All-Time High Score:</span>
                <span className="text-yellow-400 font-bold tabular-nums">{highScore.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={restartGame}
                className="w-full py-3 bg-[#d96c4a] hover:bg-[#b85536] text-white font-mono text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>PLAY AGAIN (SPACE)</span>
              </button>

              <button
                onClick={onExitGame}
                className="w-full py-2.5 bg-[#25221f] hover:bg-[#322e2a] border border-[#3d3832] text-xs font-mono text-[#a8a29a] hover:text-white rounded-lg transition-colors"
              >
                RETURN TO NOTEBOOK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
