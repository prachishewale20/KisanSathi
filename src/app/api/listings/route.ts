import { NextResponse } from 'next/server';
import { SellListing, CropId } from '@/types';

// In-memory store initialized with realistic initial listings across Maharashtra
let listingsStore: SellListing[] = [
  {
    id: 'list-1',
    crop: 'tomato',
    quantityQuintals: 45,
    askingPricePerQuintal: 1950,
    village: 'Ozar Mig',
    district: 'Nashik',
    phone: '9822014589',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
  },
  {
    id: 'list-2',
    crop: 'onion',
    quantityQuintals: 120,
    askingPricePerQuintal: 2350,
    village: 'Lasalgaon',
    district: 'Nashik',
    phone: '9423187652',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
  },
  {
    id: 'list-3',
    crop: 'soybean',
    quantityQuintals: 60,
    askingPricePerQuintal: 4700,
    village: 'Ausa',
    district: 'Latur',
    phone: '9765432109',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
  },
  {
    id: 'list-4',
    crop: 'tomato',
    quantityQuintals: 80,
    askingPricePerQuintal: 1850,
    village: 'Manchar',
    district: 'Pune',
    phone: '9158765432',
    createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(), // 12 hours ago
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get('crop');
  const district = searchParams.get('district');

  let results = [...listingsStore];

  if (crop && crop !== 'all') {
    results = results.filter((item) => item.crop === crop);
  }

  if (district && district !== 'all') {
    results = results.filter(
      (item) => item.district.toLowerCase() === district.toLowerCase()
    );
  }

  // Sort newest first
  results.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json({
    success: true,
    total: results.length,
    listings: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { crop, quantityQuintals, askingPricePerQuintal, village, district, phone } = body;

    // Validation (FR-SL4)
    if (!crop || !['tomato', 'onion', 'soybean'].includes(crop)) {
      return NextResponse.json(
        { error: 'Valid crop (tomato, onion, soybean) is required' },
        { status: 400 }
      );
    }

    const qty = Number(quantityQuintals);
    if (isNaN(qty) || qty <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be a positive number' },
        { status: 400 }
      );
    }

    const price = Number(askingPricePerQuintal);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: 'Asking price must be a positive number' },
        { status: 400 }
      );
    }

    if (!village || typeof village !== 'string' || village.trim().length === 0) {
      return NextResponse.json(
        { error: 'Village / town name is required' },
        { status: 400 }
      );
    }

    if (!district || typeof district !== 'string' || district.trim().length === 0) {
      return NextResponse.json(
        { error: 'District is required' },
        { status: 400 }
      );
    }

    // 10-digit Indian mobile number validation
    const cleanPhone = String(phone || '').replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'A valid 10-digit mobile phone number is required' },
        { status: 400 }
      );
    }

    const newListing: SellListing = {
      id: `list-${Date.now()}`,
      crop: crop as CropId,
      quantityQuintals: qty,
      askingPricePerQuintal: price,
      village: village.trim(),
      district: district.trim(),
      phone: cleanPhone,
      createdAt: new Date().toISOString(),
    };

    // Prepend to store so it appears at the top (FR-SL2)
    listingsStore.unshift(newListing);

    return NextResponse.json({
      success: true,
      message: 'Listing published successfully',
      listing: newListing,
    });
  } catch (error) {
    console.error('Error adding listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
