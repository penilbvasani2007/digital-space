import type * as THREE from 'three';

export type GameState = 'title' | 'playing' | 'paused' | 'gameover' | 'victory';

export interface GameStats {
  score: number;
  highScore: number;
  distance: number;
  combo: number;
  maxCombo: number;
  nodesCollected: number;
  clutterCleared: number;
  health: number; // 0 to 100
  clarityEnergy: number; // 0 to 100 for pulse shockwave
  speed: number;
}

export interface CollectibleEntity {
  id: number;
  type: 'kpi' | 'token' | 'clarity';
  mesh: THREE.Group | THREE.Mesh;
  z: number;
  x: number;
  y: number;
  active: boolean;
  value: number;
}

export interface HazardEntity {
  id: number;
  type: 'monolith' | 'barrier' | 'glitch';
  mesh: THREE.Group | THREE.Mesh;
  z: number;
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
  pulseTelegraphTimer?: number;
}

export interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}
