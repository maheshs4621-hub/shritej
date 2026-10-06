import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { productId, author, rating, comment } = await req.json();

    if (!productId || !author || !comment) {
      return NextResponse.json({ success: false, error: 'Product ID, author and comment are required' }, { status: 400 });
    }

    const reviewId = 'rev-' + Date.now();
    const newReview = {
      id: reviewId,
      author,
      rating: Number(rating) || 5,
      date: 'Just now',
      comment,
      verified: true,
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Insert into reviews table
        await supabase.from('reviews').insert([{
          id: reviewId,
          product_id: productId,
          author,
          rating: Number(rating) || 5,
          date: newReview.date,
          comment,
          verified: true,
        }]);

        // Also update product reviews_list, rating & reviews_count in products table
        const { data: prod } = await supabase.from('products').select('reviews_list, reviews_count, rating').eq('id', productId).single();
        if (prod) {
          const list = Array.isArray(prod.reviews_list) ? [...prod.reviews_list, newReview] : [newReview];
          const newCount = list.length;
          const avgRating = Math.round((list.reduce((sum: number, r: any) => sum + Number(r.rating || 5), 0) / newCount) * 10) / 10;
          await supabase.from('products').update({
            reviews_list: list,
            reviews_count: newCount,
            rating: avgRating,
          }).eq('id', productId);
        }
      } catch (dbErr) {
        console.warn('Supabase review insert note:', dbErr);
      }
    }

    return NextResponse.json({ success: true, review: newReview });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}