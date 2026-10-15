import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in seconds, useful for grids. */
  delay?: number
}

/**
 * Fades and lifts its children into view once, on scroll.
 * Renders a plain div when the user prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
