import { ContactShadows, Float } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef, type RefObject } from "react"
import type { Group, Mesh } from "three"

export interface PointerTarget {
  x: number
  y: number
}

interface HeroSceneProps {
  /** Mutated by pointer moves. Read inside the frame loop so React does not re-render the canvas. */
  pointer: RefObject<PointerTarget>
  reducedMotion: boolean
}

const NODE_COUNT = 56
const NODE_RADIUS = 2.2

function nodePositions() {
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
}

function linkPositions(nodes: [number, number, number][]) {
  const pairs: number[] = []
  const maxDistSq = 1.45 * 1.45
  for (let i = 0; i < nodes.length && pairs.length < 80 * 6; i++) {
    for (let j = i + 1; j < nodes.length && pairs.length < 80 * 6; j++) {
      const dx = nodes[i][0] - nodes[j][0]
      const dy = nodes[i][1] - nodes[j][1]
      const dz = nodes[i][2] - nodes[j][2]
      if (dx * dx + dy * dy + dz * dz < maxDistSq) {
        pairs.push(nodes[i][0], nodes[i][1], nodes[i][2], nodes[j][0], nodes[j][1], nodes[j][2])
      }
    }
  }
  return new Float32Array(pairs)
}

function dustPositions() {
  const count = 160
  const data = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const radius = 2.6 + Math.random() * 1.5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    data[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    data[i * 3 + 1] = radius * Math.cos(phi)
    data[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
  }
  return data
}

/** Stops the render loop while the tab is in the background. */
function VisibilityPause() {
  const set = useThree((state) => state.set)
  useEffect(() => {
    const onChange = () => set({ frameloop: document.hidden ? "never" : "always" })
    document.addEventListener("visibilitychange", onChange)
    return () => document.removeEventListener("visibilitychange", onChange)
  }, [set])
  return null
}

function Core({ pointer, reducedMotion }: HeroSceneProps) {
  const rig = useRef<Group>(null)
  const dust = useRef<Group>(null)
  const ringA = useRef<Mesh>(null)
  const ringB = useRef<Mesh>(null)
  const ringC = useRef<Mesh>(null)
  const nodes = useMemo(() => nodePositions(), [])
  const links = useMemo(() => linkPositions(nodes), [nodes])
  const dustData = useMemo(() => dustPositions(), [])

  useFrame(({ clock, camera }, delta) => {
    if (document.hidden) return
    const t = clock.elapsedTime
    const motion = reducedMotion ? 0 : 1
    const aim = pointer.current

    if (rig.current && aim) {
      rig.current.rotation.y += delta * 0.22 * motion
      const targetX = aim.y * 0.4
      rig.current.rotation.x += (targetX - rig.current.rotation.x) * 0.05
      rig.current.rotation.z = Math.sin(t * 0.15) * 0.06 * motion
    }
    if (dust.current) dust.current.rotation.y -= delta * 0.05 * motion
    if (ringA.current) ringA.current.rotation.z = t * 0.28 * motion
    if (ringB.current) ringB.current.rotation.z = -t * 0.2 * motion
    if (ringC.current) ringC.current.rotation.x = t * 0.16 * motion

    if (aim) {
      const tx = aim.x * 0.55
      const ty = -aim.y * 0.32
      camera.position.x += (tx - camera.position.x) * 0.045
      camera.position.y += (ty - camera.position.y) * 0.045
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <group ref={rig}>
      <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={0.2} floatIntensity={0.45}>
        <mesh>
          <sphereGeometry args={[0.78, 48, 48]} />
          <meshPhysicalMaterial
            color="#b9e6ff"
            transmission={0.9}
            thickness={0.7}
            roughness={0.05}
            metalness={0}
            ior={1.45}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.36, 32, 32]} />
          <meshStandardMaterial
            color="#e0f7ff"
            emissive="#3db7ff"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.42, 1]} />
          <meshStandardMaterial color="#67e8f9" wireframe transparent opacity={0.45} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.85, 0]} />
          <meshStandardMaterial color="#8b7cf7" wireframe transparent opacity={0.22} />
        </mesh>
      </Float>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.95, 0.012, 16, 160]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, 1.1, 0.4]}>
        <torusGeometry args={[2.3, 0.009, 16, 140]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.9} toneMapped={false} />
      </mesh>
      <mesh ref={ringC} rotation={[0.55, 0.4, 0.2]}>
        <torusGeometry args={[2.65, 0.007, 12, 120]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#8b7cf7"
          emissiveIntensity={0.7}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[links, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.28} />
      </lineSegments>

      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[i % 7 === 0 ? 0.055 : 0.03, 10, 10]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? "#cffafe" : "#93c5fd"}
            emissive={i % 4 === 0 ? "#22d3ee" : "#3b82f6"}
            emissiveIntensity={1.15}
            toneMapped={false}
          />
        </mesh>
      ))}

      <group ref={dust}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[dustData, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#a5f3fc"
            size={0.035}
            sizeAttenuation
            transparent
            opacity={0.75}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  )
}

export function HeroSceneCanvas({ pointer, reducedMotion }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 7.4], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <VisibilityPause />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} color="#e0f2fe" />
      <pointLight position={[-4, -1, 2]} intensity={12} color="#3b82f6" distance={16} />
      <pointLight position={[3, 2, 3]} intensity={10} color="#22d3ee" distance={14} />
      <pointLight position={[0, -2, -2]} intensity={6} color="#8b7cf7" distance={12} />
      <Core pointer={pointer} reducedMotion={reducedMotion} />
      <ContactShadows position={[0, -3.2, 0]} opacity={0.25} scale={14} blur={2.4} far={5} color="#94a3b8" />
    </Canvas>
  )
}
