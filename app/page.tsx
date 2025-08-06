'use client';

import React, { useState } from 'react';
import UploadZone from '@/components/UploadZone';
import ResultCard from '@/components/ResultCard';
import { LikenessResult } from '@/types';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<LikenessResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
            Кое ти <span className="text-purple-600">ПРИЛИЧА</span>?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Качи снимка и разбери на кой известен човек приличаш. После виж какво носи той — и го купи!
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {!image ? (
            <UploadZone 
              onImageUpload={setImage}
              onLoading={setLoading}
              onError={setError}
              setResult={setResult}
            />
          ) : (
            <div className="space-y-6">
              {/* Preview */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto">
                <img 
                  src={image} 
                  alt="Качена снимка" 
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>

              {/* Analyze Button */}
              {!result && !loading && (
                <div className="text-center">
                  <button
                    onClick={() => {
                      // Тук ще извикаме AI функцията
                      const analyzeImage = async () => {
                        setLoading(true);
                        setError(null);
                        try {
                          const { analyzeLikeness } = await import('@/lib/ai');
                          const result = await analyzeLikeness(image);
                          setResult(result);
                        } catch (err: any) {
                          setError(err.message || 'Грешка при анализ. Моля, опитайте отново.');
                        } finally {
                          setLoading(false);
                        }
                      };
                      analyzeImage();
                    }}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-pink-600 hover:to-purple-700 transition transform hover:scale-105"
                  >
                    Разбери на кого приличаш
                  </button>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                  <p className="text-gray-600">Анализираме снимката... Това може да отнеме 5-10 секунди</p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="text-red-600">{error}</p>
                  <button 
                    onClick={handleReset}
                    className="mt-2 text-red-600 hover:text-red-800 underline"
                  >
                    Опитай отново
                  </button>
                </div>
              )}

              {/* Result */}
              {result && (
                <ResultCard 
                  result={result} 
                  onReset={handleReset}
                  image={image}
                />
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 Кое ти ПРИЛИЧА? • Всички Amazon линкове са афилиейт</p>
        </footer>
      </div>
    </div>
  );
}