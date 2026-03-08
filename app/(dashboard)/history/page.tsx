'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHistory, clearHistory } from '@/lib/history';
import type { HistoryItem } from '@/lib/history';
import HistoryCard from '@/components/HistoryCard';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            History
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Your generated content
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Clear History
          </button>
        )}
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {history.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <HistoryCard item={item} />
          </motion.div>
        ))}
      </div>

      {history.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-gray-300 p-16 text-center dark:border-gray-600"
        >
          <span className="text-6xl">📜</span>
          <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No history yet
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Your generated content will appear here
          </p>
        </motion.div>
      )}
    </div>
  );
}
