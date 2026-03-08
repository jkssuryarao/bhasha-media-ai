'use client';

import { motion } from 'framer-motion';

export default function LoaderAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-8 py-16"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-saffron/30 blur-2xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-saffron/50 bg-gradient-to-br from-saffron/20 to-indiaGreen/20"
        >
          <span className="flex gap-0.5 text-2xl" title="Sitar, Tabla, Harmonium">
            🪕🥁🎵
          </span>
        </motion.div>
      </motion.div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="h-2 w-2 rounded-full bg-saffron"
            />
          ))}
        </div>
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          AI will sing soon...
        </motion.p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Composing with Indian instruments
        </p>
      </div>

      <motion.div
        className="h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-saffron to-indiaGreen"
          animate={{
            x: ['-100%', '300%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
