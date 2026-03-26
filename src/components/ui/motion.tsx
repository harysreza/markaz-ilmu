"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

export function MotionDiv({ children, ...props }: HTMLMotionProps<"div">) {
  return <motion.div {...props}>{children}</motion.div>
}
