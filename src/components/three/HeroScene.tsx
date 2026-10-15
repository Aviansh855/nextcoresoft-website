import { ContactShadows, Float } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import type { Group, Mesh } from "three"

interface HeroSceneProps {
  /** Pointer position normalized to roughly -1..1, driving the parallax. */
  pointer: { x: number; y: number }
  reducedMotion: boolean
}

const NODE_COUNT = 72
const NODE_RADIUS = 2.15

function Core({ pointer, reducedMotion }: HeroSceneProps) {
  const rig = useRef<Group>(null)
  const ringA = useRef<Mesh>(null)
  const ringB = useRef<Mesh>(null)
  const ringC = useRef<Mesh>(null)

  const nodes = useMemo(() => {
    // Evenly-ish distributed points on a sphere (Fibonacci lattice).
    const golden = Math.PI * (3 - Math.sqrt(5))
    return Array.from({ length: NODE_COUNT }, (_, i) => {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = golden * i
      return [
        Math.cos(theta) * radius * NODE_RADIUS,
        y * NODE_RADIUS,
        Math.sin(theta) * radius * NODE_RADIUS,
      ] as [number, number, number]
    })
  }, [])

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime
    const spin = reducedMotion ? 0 : delta * 0.12
    if (rig.current) {
      rig.current.rotation.y += spin
      const targetX = pointer.y * 0.35
      const targetY = rig.current.rotation.y + pointer.x * 0.02
      rig.current.rotation.x += (targetX - rig.current.rotation.x) * 0.04
      rig.current.rotation.y = targetY
    }
    const wobble = reducedMotion ? 0 : 1
    if (ringA.current) ringA.current.rotation.z = t * 0.15 * wobble
    if (ringB.current) ringB.current.rotation.z = -t * 0.11 * wobble
    if (ringC.current) ringC.current.rotation.x = t * 0.09 * wobble
  })

  return (
    <group ref={rig}>
      <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* Glass inner sphere */}
        <mesh>
          <sphereGeometry args={[0.72, 48, 48]} />
          <meshPhysicalMaterial
            color="#9fd4ff"
            transmission={0.92}
            thickness={0.6}
            roughness={0.08}
            metalness={0}
            ior={1.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Bright core */}
        <mesh>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial
            color="#d7f4ff"
            emissive="#3db7ff"
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
        {/* Wireframe shell */}
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial color="#67e8f9" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>

      {/* Orbital rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[1.95, 0.008, 12, 128]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, 1.1, 0.4]}>
        <torusGeometry args={[2.25, 0.006, 12, 128]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ringC} rotation={[0.6, 0.4, 0]}>
        <torusGeometry args={[2.55, 0.005, 12, 96]} />
        <meshStandardMaterial
          color="#8b7cf7"
          emissive="#8b7cf7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Constellation of nodes */}
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[i % 9 === 0 ? 0.045 : 0.025, 8, 8]} />
          <meshStandardMaterial
            color={i % 5 === 0 ? "#67e8f9" : "#93c5fd"}
            emissive={i % 5 === 0 ? "#22d3ee" : "#3b82f6"}
            emissiveIntensity={0.9}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export function HeroSceneCanvas({ pointer, reducedMotion }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} color="#e0f2fe" />
      <pointLight position={[-4, -2, -3]} intensity={8} color="#3b82f6" distance={14} />
      <pointLight position={[3, 2, 2]} intensity={6} color="#22d3ee" distance={12} />
      <Core pointer={pointer} reducedMotion={reducedMotion} />
      <ContactShadows
        position={[0, -3.1, 0]}
        opacity={0.35}
        scale={12}
        blur={2.6}
        far={5}
        color="#020617"
      />
    </Canvas>
  )
}
