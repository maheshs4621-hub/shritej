import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/initialData';
import { Product } from '@/types';

export const dynamic = 'force-dynamic';

function mapDbToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline || '',
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    rating: Number(row.rating || 5.0),
    reviewsCount: Number(row.reviews_count || 0),
    reviewsList: row.reviews_list || [],
    category: row.category,
    image: row.image,
    stock: Number(row.stock || 0),
    isFeatured: Boolean(row.is_featured),
    isNewArrival: Boolean(row.is_new_arrival),
    description: row.description || '',
    ingredients: row.ingredients || '',
    ayurvedicBenefits: Array.isArray(row.ayurvedic_benefits) ? row.ayurvedic_benefits : [],
    howToUse: row.how_to_use || '',
    suitableFor: row.suitable_for || '',
    netQuantity: row.net_quantity || '',
    shelfLife: row.shelf_life || '',
    storage: row.storage || '',
    packagingDetails: row.packaging_details || '',
    sustainabilityInfo: row.sustainability_info || '',
    disclaimer: row.disclaimer || '',
    sku: row.sku || '',
    weight: row.weight || '',
    specs: row.specs || {},
  };
}

function mapProductToDb(p: Partial<Product>) {
  const row: any = {};
  if (p.id !== undefined) row.id = p.id;
  if (p.name !== undefined) row.name = p.name;
  if (p.tagline !== undefined) row.tagline = p.tagline;
  if (p.price !== undefined) row.price = p.price;
  if (p.originalPrice !== undefined) row.original_price = p.originalPrice;
  if (p.rating !== undefined) row.rating = p.rating;
  if (p.reviewsCount !== undefined) row.reviews_count = p.reviewsCount;
  if (p.reviewsList !== undefined) row.reviews_list = p.reviewsList;
  if (p.category !== undefined) row.category = p.category;
  if (p.image !== undefined) row.image = p.image;
  if (p.stock !== undefined) row.stock = p.stock;
  if (p.isFeatured !== undefined) row.is_featured = p.isFeatured;
  if (p.isNewArrival !== undefined) row.is_new_arrival = p.isNewArrival;
  if (p.description !== undefined) row.description = p.description;
  if (p.ingredients !== undefined) row.ingredients = p.ingredients;
  if (p.ayurvedicBenefits !== undefined) row.ayurvedic_benefits = p.ayurvedicBenefits;
  if (p.howToUse !== undefined) row.how_to_use = p.howToUse;
  if (p.suitableFor !== undefined) row.suitable_for = p.suitableFor;
  if (p.netQuantity !== undefined) row.net_quantity = p.netQuantity;
  if (p.shelfLife !== undefined) row.shelf_life = p.shelfLife;
  if (p.storage !== undefined) row.storage = p.storage;
  if (p.packagingDetails !== undefined) row.packaging_details = p.packagingDetails;
  if (p.sustainabilityInfo !== undefined) row.sustainability_info = p.sustainabilityInfo;
  if (p.disclaimer !== undefined) row.disclaimer = p.disclaimer;
  if (p.sku !== undefined) row.sku = p.sku;
  if (p.weight !== undefined) row.weight = p.weight;
  if (p.specs !== undefined) row.specs = p.specs;
  return row;
}

export async function GET(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      success: true,
      source: 'fallback',
      products: INITIAL_PRODUCTS,
    });
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      // If table exists but is empty, try seeding it automatically
      if (!error && data && data.length === 0) {
        try {
          const rowsToInsert = INITIAL_PRODUCTS.map(p => mapProductToDb(p));
          await supabase.from('products').insert(rowsToInsert);
          return NextResponse.json({
            success: true,
            source: 'database-seeded',
            products: INITIAL_PRODUCTS,
          });
        } catch (seedErr) {}
      }

      return NextResponse.json({
        success: true,
        source: 'fallback',
        products: INITIAL_PRODUCTS,
        dbError: error ? error.message : null,
      });
    }

    const products = data.map(mapDbToProduct);
    return NextResponse.json({
      success: true,
      source: 'database',
      products,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      source: 'fallback',
      products: INITIAL_PRODUCTS,
      error: err.message,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 400 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const row = mapProductToDb(body);
    if (!row.id) {
      row.id = 'shritej-' + Date.now();
    }

    const { data, error } = await supabase.from('products').insert([row]).select().single();
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: mapDbToProduct(data) });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product id required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 400 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const row = mapProductToDb(updates);
    const { data, error } = await supabase.from('products').update(row).eq('id', id).select().single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: mapDbToProduct(data) });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}