import { motion, useReducedMotion, type Variants } from "framer-motion"
import { type ReactNode } from "react"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/** First-paint stagger for the hero copy. Does not depend on scroll. */
export function HeroEntrance({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  if (reduced) return <>{children}</>
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {children}
    </motion.div>
  )
}

export function HeroEntranceItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
