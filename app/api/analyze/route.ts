import { analyzeLikeness } from '@/lib/ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: 'Липсва изображение' },
        { status: 400 }
      );
    }

    const result = await analyzeLikeness(image);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Грешка при анализ' },
      { status: 500 }
    );
  }
}