'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateContent, getAudioUrl } from '@/lib/api';
import { addToHistory } from '@/lib/history';
import LanguageSelector from '@/components/LanguageSelector';
import LoaderAnimation from '@/components/loader/LoaderAnimation';
import AudioPlayer from '@/components/AudioPlayer';

export default function GeneratePage() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    generatedText: string;
    audioUrl: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    try {
      const data = await generateContent(topic.trim(), language);
      const audioUrl = getAudioUrl(data);
      setResult({
        generatedText: data.generated_text,
        audioUrl: audioUrl || '',
      });
      addToHistory({
        topic: topic.trim(),
        language,
        generatedText: data.generated_text,
        audioUrl: audioUrl || '',
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to generate content. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Generate Content
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Enter a topic and select a language to generate script and audio.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Benefits of yoga for mental health"
            className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-soft placeholder:text-gray-400 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>
        <LanguageSelector
          value={language}
          onChange={setLanguage}
          disabled={loading}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full rounded-xl bg-saffron px-4 py-3 font-medium text-white shadow-glow transition-colors hover:bg-saffron/90 disabled:opacity-60"
        >
          Generate
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading && <LoaderAnimation key="loader" />}
        {!loading && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Generated Script
              </h3>
              <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {result.generatedText}
              </p>
            </div>
            {result.audioUrl && (
              <AudioPlayer src={result.audioUrl} key={result.audioUrl} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
