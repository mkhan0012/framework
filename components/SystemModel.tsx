"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Sphere, Icosahedron } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Glitch, ChromaticAberration } from "@react-three/postprocessing";
import { useState, useRef } from "react";
import * as THREE from "three";

export type SystemPhase = "ORIGIN" | "PERCEPTION" | "CONFLICT";

// --- CONSTANTS (Optimization: Define vectors once to prevent re-renders) ---
const CA_OFFSET = new THREE.Vector2(0.002, 0.002);
const GLITCH_DELAY = new THREE.Vector2(1.5, 3.5);
const GLITCH_DURATION = new THREE.Vector2(0.1, 0.3);
const GLITCH_STRENGTH = new THREE.Vector2(0.1, 0.2);

const NODE_DATA: Record<string, { label: string; desc: string }> = {
  framing: { label: "FUNCTION: ENGAGEMENT REBALANCING", desc: "Reweights emotional salience to increase transmission probability." },
  amplification: { label: "FUNCTION: PROPAGATION SELECTION", desc: "Expands signal reach based on compatibility with network dynamics." },
  suppression: { label: "FUNCTION: STABILITY PRESERVATION", desc: "Reduces visibility through friction rather than removal." },
  mutation: { label: "FUNCTION: SURVIVAL OPTIMIZATION", desc: "Simplifies and emotionalizes the belief across spread cycles." },
  core: { label: "SYSTEM ROLE: INFRASTRUCTURE PRIORITIZATION", desc: "Determines which belief variants remain structurally sustainable." }
};

const ENGINE_NODES = [
  { id: "framing", position: [2.5, 1.2, 0] },
  { id: "amplification", position: [-2.5, 1.2, 0] },
  { id: "suppression", position: [-2.5, -1.2, 0] },
  { id: "mutation", position: [2.5, -1.2, 0] },
];

// --- COMPONENT: ENGINE NODE ---
const EngineNode = ({ node, phase, setHover }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (phase === "CONFLICT") {
        meshRef.current.rotation.x += delta * 4;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 20) * 0.1;
    } else if (phase === "PERCEPTION") {
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.5;
    } else {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={node.position}>
      <mesh 
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); setHover(NODE_DATA[node.id]); }}
        onPointerOut={() => setHover(null)}
      >
        <Icosahedron args={[0.4, 0]} />
        <meshStandardMaterial 
          color={phase === "CONFLICT" ? "#ef4444" : phase === "PERCEPTION" ? "#a855f7" : "#0ea5e9"} 
          wireframe={true}
          emissive={phase === "CONFLICT" ? "#ef4444" : "#0ea5e9"}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

// --- COMPONENT: SIGNAL PULSE ---
const SignalPacket = ({ start, end, phase }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [offset] = useState(Math.random() * 10);

  useFrame((state) => {
    if (!meshRef.current) return;
    const speed = phase === "CONFLICT" ? 2.5 : phase === "PERCEPTION" ? 0.5 : 1;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    
    // Manual Lerp to optimize performance
    meshRef.current.position.x = start[0] + (end[0] - start[0]) * t;
    meshRef.current.position.y = start[1] + (end[1] - start[1]) * t;
    meshRef.current.position.z = start[2] + (end[2] - start[2]) * t;

    const scale = Math.sin(t * Math.PI) * 0.15;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="white" toneMapped={false} />
    </mesh>
  );
};

// --- MAIN SCENE ---
export default function SystemModel({ phase = "ORIGIN", onHoverNode }: { phase?: SystemPhase, onHoverNode?: (data: any) => void }) {
  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="white" />

        {/* CORE NUCLEUS */}
        <mesh onPointerEnter={(e) => { e.stopPropagation(); onHoverNode && onHoverNode(NODE_DATA.core); }} onPointerOut={() => onHoverNode && onHoverNode(null)}>
            <Sphere args={[0.8, 32, 32]} />
            <meshStandardMaterial 
                color="#000" 
                emissive={phase === "CONFLICT" ? "#ef4444" : "#0ea5e9"}
                emissiveIntensity={1.5}
                wireframe={phase === "PERCEPTION"} 
                toneMapped={false}
            />
        </mesh>

        {/* NODES & SIGNALS */}
        {ENGINE_NODES.map((node) => (
            <group key={node.id}>
                <EngineNode node={node} phase={phase} setHover={onHoverNode} />
                <Line points={[[0,0,0], node.position as any]} color="#333" transparent opacity={0.2} />
                <SignalPacket start={[0,0,0]} end={node.position} phase={phase} />
            </group>
        ))}

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={phase === "CONFLICT" ? 2 : 0.5} />

        {/* POST PROCESSING */}
        <EffectComposer>
            <Bloom luminanceThreshold={0.1} intensity={1.5} />
            <Noise opacity={0.05} />
            
            {/* FIX: Use <></> (Fragment) instead of null to satisfy strict Types */}
            {phase === "PERCEPTION" ? (
                <ChromaticAberration offset={CA_OFFSET} />
            ) : <></>}

            {phase === "CONFLICT" ? (
                <Glitch 
                    delay={GLITCH_DELAY} 
                    duration={GLITCH_DURATION} 
                    strength={GLITCH_STRENGTH} 
                />
            ) : <></>}
        </EffectComposer>
      </Canvas>
    </div>
  );
}