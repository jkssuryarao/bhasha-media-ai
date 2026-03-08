'use client';

import { motion } from 'framer-motion';
import type { HistoryItem } from '@/lib/history';
import AudioPlayer from './AudioPlayer';

interface HistoryCardProps {
  item: HistoryItem;
}

export default function HistoryCard({ item }: HistoryCardProps) {
  const date = new Date(item.timestamp);
  const formattedDate = date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft transition-shadow hover:shadow-glow dark:border-gray-700 dark:bg-gray-800/50"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-saffron/20 px-3 py-1 text-xs font-medium text-saffron">
          {item.language}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formattedDate}
        </span>
      </div>
      <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
        {item.topic}
      </h3>
      <p className="mb-4 line-clamp-4 text-sm text-gray-600 dark:text-gray-400">
        {item.generatedText}
      </p>
      {item.audioUrl && (
        <AudioPlayer src={item.audioUrl} />
      )}
    </motion.article>
  );
}
