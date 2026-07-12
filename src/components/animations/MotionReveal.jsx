import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "motion/react";

// Animation variants for different reveal effects
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

// Reusable MotionReveal component
export default function MotionReveal({
  children,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  triggerOnce = true,
  amount = 0.3,
  className = "",
  style = {},
  as = "div"
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold, triggerOnce, amount });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0, transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0, transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: [0.16, 1, 0.3, 1] } }
    }
  };

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}

// Stagger container component
export function MotionStagger({
  children,
  delay = 0,
  staggerChildren = 0.1,
  className = "",
  style = {},
  as = "div"
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1, triggerOnce: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay
      }
    }
  };

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}

// Stagger item component
export function MotionStaggerItem({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  style = {},
  as = "div"
}) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}