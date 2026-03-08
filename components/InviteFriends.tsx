'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InviteFriends() {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareText = 'Join me on BHASHA-MEDIA AI - Create multilingual scripts and voice content with AI! 🇮🇳';

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: 'BHASHA-MEDIA AI',
          text: shareText,
          url: shareUrl,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleShare}
      className="flex items-center gap-2 rounded-xl border border-saffron/40 bg-saffron/10 px-4 py-2.5 text-sm font-medium text-saffron hover:bg-saffron/20 transition-colors"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? 'Link copied!' : 'Invite Friends'}
    </motion.button>
  );
}
