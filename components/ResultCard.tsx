'use client';

import React from 'react';
import { LikenessResult } from '@/types';
import ShareButton from './ShareButton';

interface ResultCardProps {
  result: LikenessResult;
  onReset: () => void;
  image: string;
}

export default function ResultCard({ result, onReset, image }: ResultCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mx-auto max-w-4xl animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Приличаш на{' '}
          <span className="text-purple-600">{result.celebrity}</span>
        </h2>
        <p className="text-gray-500 mb-2">✨ Върхът на славата: {result.era}</p>
        <p className="text-gray-700 italic">"{result.reason}"</p>
      </div>

      {/* Share Button */}
      <div className="flex justify-center mb-6">
        <ShareButton 
          celebrity={result.celebrity}
          image={image}
        />
      </div>

      {/* Products */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Стилът на {result.celebrity}
        </h3>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {result.products.slice(0, 4).map((product, i) => (
            <div 
              key={i} 
              className="border rounded-xl overflow-hidden hover:shadow-md transition bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 md:h-40 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.jpg';
                }}
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 text-sm md:text-base">{product.name}</h4>
                <p className="text-gray-600 text-xs md:text-sm mt-1 mb-2 line-clamp-2">{product.description}</p>
                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-blue-600 hover:underline font-medium"
                >
                  Купи в Amazon →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Качи нова снимка
        </button>
      </div>
    </div>
  );
}