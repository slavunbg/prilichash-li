'use server';

import OpenAI from 'openai';
import { LikenessResult } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeLikeness(imageBase64: string): Promise<LikenessResult> {
  try {
    // Remove data URL prefix
    const base64Data = imageBase64.includes('base64,') 
      ? imageBase64.split('base64,')[1] 
      : imageBase64;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Анализирай тази снимка и отговори САМО с валиден JSON обект. Не пиши нищо друго.

Формат:
{
  "celebrity": "име на звездата",
  "era": "епоха/години на върха на славата",
  "reason": "кратко обяснение за приликата",
  "products": [
    {
      "name": "име на продукта",
      "description": "описание на продукта",
      "image": "линк към изображение",
      "amazonLink": "примерен Amazon линк"
    }
  ]
}

Препоръчай точно 4 продукта, които са характерни за стила на тази звезда. Използвай реалистични Amazon линкове (примерни). Използвай само латински букви в JSON.`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Data}`
              }
            }
          ]
        }
      ],
      max_tokens: 1200,
      temperature: 0.7
    });

    const content = response.choices[0].message.content?.trim() || '{}';
    
    // Try to parse JSON
    try {
      const result: LikenessResult = JSON.parse(content);
      
      // Validate required fields
      if (!result.celebrity || !result.products || !Array.isArray(result.products)) {
        throw new Error('Invalid response format from AI');
      }
      
      // Ensure we have at least 4 products
      while (result.products.length < 4) {
        result.products.push({
          name: 'Продукт не е разпознат',
          description: 'Опитайте с друга снимка',
          image: '/placeholder.jpg',
          amazonLink: '#'
        });
      }
      
      return result;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('AI Response:', content);
      throw new Error('AI не успя да разпознае приликата. Моля, опитайте с друга снимка.');
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    throw new Error(error.message || 'Грешка при свързване с AI. Моля, опитайте отново.');
  }
}