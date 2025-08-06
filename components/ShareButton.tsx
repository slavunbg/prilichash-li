'use client';

import React, { useState } from 'react';

interface ShareButtonProps {
  celebrity: string;
  image: string;
}

export default function ShareButton({ celebrity }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = `Качих снимка и AI каза, че приличам на ${celebrity}! 😱 Провери на кого приличаш ти → prilichash.li`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Кое ти ПРИЛИЧА?',
          text,
          url: window.location.href
        });
      } catch (err) {
        console.log('Грешка при споделяне:', err);
      }
    } else {
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log('Грешка при копиране:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? 'Копирано!' : 'Сподели резултата'}
    </button>
  );
}