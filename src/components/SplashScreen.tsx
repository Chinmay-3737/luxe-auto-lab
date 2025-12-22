import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Vyronex Motors Text */}
        <motion.h1
          className="font-heading text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Vyronex <span className="text-primary">Motors</span>
        </motion.h1>

        {/* Red Line */}
        <motion.div
          className="h-1 bg-primary mb-8"
          initial={{ width: 0 }}
          animate={{ width: 450 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Tyre Smoke Effect */}
        <div className="relative w-32 h-32">
          {/* Left Smoke */}
          <motion.div
            className="absolute left-0 top-1/2 w-12 h-12 bg-gradient-to-r from-smoke-gray to-transparent rounded-full blur-xl"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 0.6, 0], x: -40 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Center Smoke */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-smoke-gray via-smoke-gray to-transparent rounded-full blur-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Right Smoke */}
          <motion.div
            className="absolute right-0 top-1/2 w-12 h-12 bg-gradient-to-l from-smoke-gray to-transparent rounded-full blur-xl"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 0.6, 0], x: 40 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Loading Indicator */}
        <motion.div
          className="mt-8 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
