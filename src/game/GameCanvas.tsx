import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GameState, GameStats, CollectibleEntity, HazardEntity, Particle } from './types';
import { sound } from './audio';

interface GameCanvasProps {
  gameState: GameState;
  onUpdateStats: (updater: (prev: GameStats) => GameStats) => void;
  onGameOver: (finalStats: GameStats) => void;
  clarityTrigger: number; // Increment to fire pulse
  isMuted: boolean;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  onUpdateStats,
  onGameOver,
  clarityTrigger,
  isMuted,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const gameStateRef = useRef<GameState>(gameState);
  gameStateRef.current = gameState;

  const statsRef = useRef<GameStats>({
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

  const lastClarityTriggerRef = useRef<number>(clarityTrigger);

  useEffect(() => {
    sound.setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL for graceful fallback
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#141312');
    scene.fog = new THREE.FogExp2('#141312', 0.012);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      250
    );
    camera.position.set(0, 5.5, 12);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Studio Lighting (Key, Cool Fill, Backlight)
    const ambientLight = new THREE.HemisphereLight('#6ba3ff', '#1f1b18', 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#ffecd1', 1.8);
    keyLight.position.set(8, 16, 10);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 40;
      keyLight.shadow.camera.left = -15;
      keyLight.shadow.camera.right = 15;
      keyLight.shadow.camera.top = 15;
      keyLight.shadow.camera.bottom = -15;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#d96c4a', 1.2);
    rimLight.position.set(-10, 6, -10);
    scene.add(rimLight);

    // 3. Composite 3D Player Craft (5 distinct parts: Hull, Cockpit Visor, Wings, Thrusters, Glow Tail)
    const playerGroup = new THREE.Group();

    // Hull (Primary silhouette)
    const hullGeo = new THREE.ConeGeometry(0.75, 2.4, 4);
    hullGeo.rotateX(Math.PI / 2);
    hullGeo.rotateY(Math.PI / 4);
    const hullMat = new THREE.MeshStandardMaterial({
      color: '#2a2825',
      roughness: 0.25,
      metalness: 0.8,
    });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.castShadow = !isSoftwareGl;
    playerGroup.add(hull);

    // Visor Canopy (Secondary read)
    const visorGeo = new THREE.BoxGeometry(0.45, 0.25, 0.85);
    const visorMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      roughness: 0.1,
      metalness: 0.9,
      emissive: '#0284c7',
      emissiveIntensity: 0.6,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.22, 0.1);
    playerGroup.add(visor);

    // Aerodynamic Wings (Accent detail)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(1.8, -0.6);
    wingShape.lineTo(1.5, -1.2);
    wingShape.lineTo(0, -0.8);
    wingShape.closePath();
    const wingExtrude = new THREE.ExtrudeGeometry(wingShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03 });
    wingExtrude.rotateX(-Math.PI / 2);
    const wingMat = new THREE.MeshStandardMaterial({
      color: '#d96c4a',
      roughness: 0.35,
      metalness: 0.6,
    });
    const leftWing = new THREE.Mesh(wingExtrude, wingMat);
    leftWing.position.set(0.1, 0, 0.2);
    leftWing.castShadow = !isSoftwareGl;
    playerGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingExtrude, wingMat);
    rightWing.scale.set(-1, 1, 1);
    rightWing.position.set(-0.1, 0, 0.2);
    rightWing.castShadow = !isSoftwareGl;
    playerGroup.add(rightWing);

    // Dual Kinetic Thrusters
    const thrusterGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.6, 8);
    thrusterGeo.rotateX(Math.PI / 2);
    const thrusterMat = new THREE.MeshStandardMaterial({
      color: '#1a1816',
      roughness: 0.4,
      metalness: 0.9,
    });
    const leftThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    leftThruster.position.set(0.42, 0, 1.1);
    playerGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    rightThruster.position.set(-0.42, 0, 1.1);
    playerGroup.add(rightThruster);

    // Glowing Ion Tail Exhaust
    const exhaustGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const exhaustMat = new THREE.MeshBasicMaterial({ color: '#38bdf8' });
    const leftExhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
    leftExhaust.position.set(0.42, 0, 1.4);
    playerGroup.add(leftExhaust);

    const rightExhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
    rightExhaust.position.set(-0.42, 0, 1.4);
    playerGroup.add(rightExhaust);

    playerGroup.position.set(0, 1.2, 3);
    scene.add(playerGroup);

    // 4. Ground Runway with Procedural Grid Shader / Texture
    const runwayWidth = 22;
    const runwayLength = 300;
    const runwayGeo = new THREE.PlaneGeometry(runwayWidth, runwayLength, 20, 100);
    runwayGeo.rotateX(-Math.PI / 2);

    // Procedural grid canvas texture
    const gridCanvas = document.createElement('canvas');
    gridCanvas.width = 512;
    gridCanvas.height = 512;
    const ctx = gridCanvas.getContext('2d')!;
    ctx.fillStyle = '#171614';
    ctx.fillRect(0, 0, 512, 512);

    // Architectural grid lines
    ctx.strokeStyle = '#2d2924';
    ctx.lineWidth = 3;
    for (let i = 0; i <= 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    // Center guide runway lines
    ctx.strokeStyle = '#d96c4a';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(256, 0);
    ctx.lineTo(256, 512);
    ctx.stroke();

    const gridTexture = new THREE.CanvasTexture(gridCanvas);
    gridTexture.wrapS = THREE.RepeatWrapping;
    gridTexture.wrapT = THREE.RepeatWrapping;
    gridTexture.repeat.set(2, 24);
    gridTexture.colorSpace = THREE.SRGBColorSpace;
    gridTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const runwayMat = new THREE.MeshStandardMaterial({
      map: gridTexture,
      roughness: 0.8,
      metalness: 0.2,
    });
    const runway = new THREE.Mesh(runwayGeo, runwayMat);
    runway.receiveShadow = !isSoftwareGl;
    scene.add(runway);

    // 5. Flanking Architectural Monoliths (Distant Skyboxes)
    const towerGroup = new THREE.Group();
    const towerMat = new THREE.MeshStandardMaterial({
      color: '#1d1b19',
      roughness: 0.7,
      metalness: 0.4,
    });

    const towerCount = 36;
    for (let i = 0; i < towerCount; i++) {
      const h = 8 + Math.random() * 24;
      const w = 2.5 + Math.random() * 3.5;
      const towerGeo = new THREE.BoxGeometry(w, h, w);
      const tower = new THREE.Mesh(towerGeo, towerMat);
      const side = i % 2 === 0 ? 1 : -1;
      const x = side * (14 + Math.random() * 18);
      const z = -140 + (i / towerCount) * 280;
      tower.position.set(x, h / 2, z);
      towerGroup.add(tower);
    }
    scene.add(towerGroup);

    // 6. Collectibles & Hazards Entity Pools
    const collectibles: CollectibleEntity[] = [];
    const hazards: HazardEntity[] = [];

    // Reusable Geometries & Materials
    const kpiGeo = new THREE.SphereGeometry(0.5, 12, 12);
    const ringGeo = new THREE.TorusGeometry(0.75, 0.06, 8, 24);
    const kpiMat = new THREE.MeshStandardMaterial({
      color: '#4ade80',
      emissive: '#16a34a',
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });
    const ringMat = new THREE.MeshBasicMaterial({ color: '#86efac' });

    const tokenGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.16, 6);
    const tokenMat = new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#d97706',
      emissiveIntensity: 0.5,
      metalness: 0.7,
      roughness: 0.2,
    });

    const clarityGeo = new THREE.OctahedronGeometry(0.65, 0);
    const clarityMat = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      emissive: '#0284c7',
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });

    const monolithMat = new THREE.MeshStandardMaterial({
      color: '#dc2626',
      emissive: '#7f1d1d',
      emissiveIntensity: 0.35,
      roughness: 0.4,
    });

    const barrierMat = new THREE.MeshStandardMaterial({
      color: '#ea580c',
      emissive: '#9a3412',
      emissiveIntensity: 0.4,
      roughness: 0.3,
    });

    // Spawn Collectible
    function spawnCollectible(zTarget: number) {
      const typeRoll = Math.random();
      const type = typeRoll < 0.2 ? 'clarity' : typeRoll < 0.6 ? 'token' : 'kpi';
      const grp = new THREE.Group();

      if (type === 'kpi') {
        const mesh = new THREE.Mesh(kpiGeo, kpiMat);
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotateX(Math.PI / 4);
        grp.add(mesh, ring);
      } else if (type === 'token') {
        const mesh = new THREE.Mesh(tokenGeo, tokenMat);
        mesh.rotateX(Math.PI / 3);
        grp.add(mesh);
      } else {
        const mesh = new THREE.Mesh(clarityGeo, clarityMat);
        grp.add(mesh);
      }

      const lane = (Math.floor(Math.random() * 5) - 2) * 2.8;
      grp.position.set(lane, 1.2, zTarget);
      scene.add(grp);

      collectibles.push({
        id: Math.random(),
        type,
        mesh: grp,
        x: lane,
        y: 1.2,
        z: zTarget,
        active: true,
        value: type === 'clarity' ? 150 : type === 'token' ? 80 : 50,
      });
    }

    // Spawn Hazard
    function spawnHazard(zTarget: number) {
      const typeRoll = Math.random();
      const type = typeRoll < 0.5 ? 'monolith' : 'barrier';
      const grp = new THREE.Group();
      let width = 1.8;
      let height = 3.2;

      if (type === 'monolith') {
        const geo = new THREE.BoxGeometry(1.6, 3.4, 1.6);
        const mesh = new THREE.Mesh(geo, monolithMat);
        mesh.position.y = 1.7;
        mesh.castShadow = !isSoftwareGl;
        grp.add(mesh);

        // Warning beacon top
        const beaconGeo = new THREE.SphereGeometry(0.2, 8, 8);
        const beaconMat = new THREE.MeshBasicMaterial({ color: '#ff4444' });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.y = 3.5;
        grp.add(beacon);
      } else {
        width = 4.2;
        height = 2.4;
        const geo = new THREE.BoxGeometry(width, height, 1.0);
        const mesh = new THREE.Mesh(geo, barrierMat);
        mesh.position.y = 1.2;
        mesh.castShadow = !isSoftwareGl;
        grp.add(mesh);
      }

      const lane = (Math.floor(Math.random() * 5) - 2) * 2.8;
      grp.position.set(lane, 0, zTarget);
      scene.add(grp);

      hazards.push({
        id: Math.random(),
        type,
        mesh: grp,
        x: lane,
        y: height / 2,
        z: zTarget,
        width,
        height,
        active: true,
      });
    }

    // Pre-populate track ahead
    for (let z = -30; z > -220; z -= 14) {
      if (Math.random() < 0.55) {
        spawnCollectible(z);
      } else {
        spawnHazard(z);
      }
    }

    // 7. Shockwave Mesh & Particles System
    const shockwaveGeo = new THREE.RingGeometry(0.2, 0.8, 32);
    shockwaveGeo.rotateX(-Math.PI / 2);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.position.set(0, 0.8, 0);
    scene.add(shockwaveMesh);
    let shockwaveRadius = 0;
    let shockwaveActive = false;

    // Particle Burst System
    const particles: Particle[] = [];
    const particleGeo = new THREE.BufferGeometry();
    const maxParticles = 300;
    const particlePositions = new Float32Array(maxParticles * 3);
    const particleColors = new Float32Array(maxParticles * 3);
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    function createParticleBurst(pos: THREE.Vector3, colorHex: string, count = 25) {
      const col = new THREE.Color(colorHex);
      for (let i = 0; i < count; i++) {
        if (particles.length >= maxParticles) break;
        const pVel = new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          Math.random() * 6 + 1,
          (Math.random() - 0.5) * 8
        );
        particles.push({
          position: pos.clone(),
          velocity: pVel,
          color: col,
          size: 0.35,
          alpha: 1,
          life: 0,
          maxLife: 0.45 + Math.random() * 0.35,
        });
      }
    }

    // 8. Input Tracking (Continuous held vs Edge-triggered)
    const keysHeld: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keysHeld[e.code] = true;

      // Space / Enter for Clarity Shockwave
      if ((e.code === 'Space' || e.code === 'Enter') && gameStateRef.current === 'playing') {
        triggerClarityPulse();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysHeld[e.code] = false;
    };

    const handleBlur = () => {
      for (const k of Object.keys(keysHeld)) {
        keysHeld[k] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    // Mobile / Touch Drag Steering
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) touchStartX = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const dx = e.touches[0].clientX - touchStartX;
        touchStartX = e.touches[0].clientX;
        playerTargetX = Math.max(-8.5, Math.min(8.5, playerTargetX + dx * 0.035));
      }
    };
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 9. Trigger Clarity Pulse Logic
    function triggerClarityPulse() {
      if (statsRef.current.clarityEnergy < 25) return;

      statsRef.current.clarityEnergy = Math.max(0, statsRef.current.clarityEnergy - 30);
      shockwaveActive = true;
      shockwaveRadius = 0.5;
      shockwaveMesh.position.copy(playerGroup.position);
      shockwaveMat.opacity = 0.85;

      sound.playShockwave();
      cameraShake = 0.35;

      // Dissolve nearby hazards
      hazards.forEach((h) => {
        if (!h.active) return;
        const dist = playerGroup.position.distanceTo(h.mesh.position);
        if (dist < 12) {
          h.active = false;
          h.mesh.visible = false;
          createParticleBurst(h.mesh.position, '#38bdf8', 35);
          statsRef.current.score += 200 * statsRef.current.combo;
          statsRef.current.clutterCleared += 1;
        }
      });
    }

    // 10. Simulation Loop
    let animFrameId = 0;
    let lastTime = performance.now();
    let playerX = 0;
    let playerTargetX = 0;
    let playerTilt = 0;
    let cameraShake = 0;
    let hitstopTimer = 0; // Brief 50ms pause on heavy impact

    function tick(now: number) {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      // Hitstop freeze handling
      if (hitstopTimer > 0) {
        hitstopTimer -= dt;
        renderer.render(scene, camera);
        animFrameId = requestAnimationFrame(tick);
        return;
      }

      // External clarity pulse trigger check (from mobile UI button)
      if (clarityTrigger !== lastClarityTriggerRef.current) {
        lastClarityTriggerRef.current = clarityTrigger;
        if (gameStateRef.current === 'playing') {
          triggerClarityPulse();
        }
      }

      // State-specific updates
      if (gameStateRef.current === 'title') {
        // Atmospheric live orbit pan on title screen
        const orbitAngle = now * 0.0004;
        camera.position.x = Math.sin(orbitAngle) * 9;
        camera.position.z = Math.cos(orbitAngle) * 11 + 2;
        camera.position.y = 5.2 + Math.sin(now * 0.001) * 0.8;
        camera.lookAt(playerGroup.position.x, playerGroup.position.y + 0.5, playerGroup.position.z);

        // Gentle idle hover of player craft
        playerGroup.position.y = 1.2 + Math.sin(now * 0.002) * 0.15;
        playerGroup.rotation.z = Math.sin(now * 0.0015) * 0.06;
      } else if (gameStateRef.current === 'playing') {
        const stats = statsRef.current;

        // Progressive speed & distance ramp
        stats.distance += stats.speed * dt;
        stats.speed = Math.min(68, 38 + stats.distance * 0.015);

        // Energy recharge
        stats.clarityEnergy = Math.min(100, stats.clarityEnergy + dt * 12);

        // Continuous steering
        if (keysHeld['KeyA'] || keysHeld['ArrowLeft']) {
          playerTargetX = Math.max(-8.5, playerTargetX - dt * 22);
        }
        if (keysHeld['KeyD'] || keysHeld['ArrowRight']) {
          playerTargetX = Math.min(8.5, playerTargetX + dt * 22);
        }

        // Smooth exponential damping on craft position and tilt
        playerX = THREE.MathUtils.damp(playerX, playerTargetX, 14, dt);
        const steerVelocity = playerTargetX - playerX;
        playerTilt = THREE.MathUtils.damp(playerTilt, -steerVelocity * 0.28, 12, dt);

        playerGroup.position.x = playerX;
        playerGroup.rotation.z = playerTilt;
        playerGroup.position.y = 1.2 + Math.sin(now * 0.008) * 0.05; // Engine vibration

        // Ground runway infinite scroll illusion
        gridTexture.offset.y = (gridTexture.offset.y + (stats.speed * dt * 0.08)) % 1;

        // Move Collectibles towards player
        collectibles.forEach((item) => {
          if (!item.active) return;
          item.z += stats.speed * dt;
          item.mesh.position.z = item.z;
          item.mesh.rotation.y += dt * 2.5;

          // Check collision with player
          const distToPlayer = Math.hypot(item.x - playerX, item.z - playerGroup.position.z);
          if (distToPlayer < 1.4) {
            item.active = false;
            item.mesh.visible = false;

            // Pick up reward
            stats.combo += 1;
            stats.maxCombo = Math.max(stats.maxCombo, stats.combo);
            stats.score += item.value * stats.combo;
            stats.nodesCollected += 1;

            if (item.type === 'clarity') {
              stats.clarityEnergy = Math.min(100, stats.clarityEnergy + 40);
            }

            sound.playPickup(item.type, stats.combo);
            createParticleBurst(item.mesh.position, item.type === 'clarity' ? '#38bdf8' : '#4ade80', 20);
          }

          // Recycle collectible once past camera
          if (item.z > 14) {
            item.active = true;
            item.mesh.visible = true;
            item.z = -180 - Math.random() * 40;
            item.x = (Math.floor(Math.random() * 5) - 2) * 2.8;
            item.mesh.position.set(item.x, item.y, item.z);
          }
        });

        // Move Hazards towards player
        hazards.forEach((h) => {
          if (!h.active) return;
          h.z += stats.speed * dt;
          h.mesh.position.z = h.z;

          // Check collision with player
          const dx = Math.abs(h.x - playerX);
          const dz = Math.abs(h.z - playerGroup.position.z);
          if (dx < (h.width / 2 + 0.6) && dz < 1.0) {
            h.active = false;
            h.mesh.visible = false;

            // Damage player
            stats.health = Math.max(0, stats.health - 28);
            stats.combo = 1; // Break streak
            cameraShake = 0.55;
            hitstopTimer = 0.055; // 55ms punchy hitstop

            sound.playImpact();
            createParticleBurst(playerGroup.position, '#dc2626', 30);

            if (stats.health <= 0) {
              sound.playGameOver();
              onGameOver(stats);
            }
          }

          // Recycle hazard once past camera
          if (h.z > 14) {
            h.active = true;
            h.mesh.visible = true;
            h.z = -180 - Math.random() * 40;
            h.x = (Math.floor(Math.random() * 5) - 2) * 2.8;
            h.mesh.position.set(h.x, 0, h.z);
          }
        });

        // Expand Clarity Shockwave if active
        if (shockwaveActive) {
          shockwaveRadius += dt * 32;
          shockwaveMesh.scale.set(shockwaveRadius, shockwaveRadius, 1);
          shockwaveMat.opacity = Math.max(0, 0.85 - (shockwaveRadius / 15));

          if (shockwaveRadius > 14) {
            shockwaveActive = false;
            shockwaveMat.opacity = 0;
          }
        }

        // Camera follow with decaying shake
        camera.position.x = THREE.MathUtils.damp(camera.position.x, playerX * 0.45, 8, dt);
        camera.position.y = 5.2;
        camera.position.z = 11.5;

        if (cameraShake > 0.01) {
          camera.position.x += (Math.random() - 0.5) * cameraShake * 2;
          camera.position.y += (Math.random() - 0.5) * cameraShake * 2;
          cameraShake *= Math.pow(0.08, dt);
        } else {
          cameraShake = 0;
        }

        camera.lookAt(playerX * 0.25, 1.8, -10);

        // Update React stats throttled
        onUpdateStats(() => ({ ...stats }));
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        p.position.addScaledVector(p.velocity, dt);
        p.velocity.y -= 9.8 * dt; // gravity
        p.alpha = 1 - (p.life / p.maxLife);
      }

      // Sync Particle Buffer
      for (let i = 0; i < maxParticles; i++) {
        if (i < particles.length) {
          const p = particles[i];
          particlePositions[i * 3] = p.position.x;
          particlePositions[i * 3 + 1] = p.position.y;
          particlePositions[i * 3 + 2] = p.position.z;

          particleColors[i * 3] = p.color.r * p.alpha;
          particleColors[i * 3 + 1] = p.color.g * p.alpha;
          particleColors[i * 3 + 2] = p.color.b * p.alpha;
        } else {
          particlePositions[i * 3] = 0;
          particlePositions[i * 3 + 1] = -999;
          particlePositions[i * 3 + 2] = 0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;
      particleGeo.attributes.color.needsUpdate = true;

      // Render
      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(tick);
    }

    animFrameId = requestAnimationFrame(tick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);

      renderer.dispose();
      runwayGeo.dispose();
      gridTexture.dispose();
      kpiGeo.dispose();
      ringGeo.dispose();
      shockwaveGeo.dispose();
      particleGeo.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#141312]" />;
};
