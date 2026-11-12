import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.8,
  distance = 40,
  once = true
}) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {}
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: once, margin: '-80px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Premium cubic-bezier easeOut
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
