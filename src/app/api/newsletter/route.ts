import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const { data, error } = await supabase.from('subscribers').insert([
      { email }
    ]);

    if (error) {
      console.warn('Supabase subscriber note:', error.message);
      return NextResponse.json({ success: true, savedToDb: false, message: error.message });
    }

    return NextResponse.json({ success: true, savedToDb: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}