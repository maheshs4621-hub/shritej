import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ubtan-100g',
    name: 'SHRiTEJ Traditional Ayurvedic Ubtan (100g)',
    tagline: 'Pure authentic herbal formulation for naturally glowing & radiant skin',
    price: 299,
    originalPrice: 449,
    rating: 5.0,
    reviewsCount: 9,
    category: 'Ubtan & Lepa',
    image: '/images/shritej-ubtan.jpg',
    stock: 85,
    isFeatured: true,
    isNewArrival: true,
    description: 'Crafted strictly according to time-honoured Ayurvedic wisdom. SHRiTEJ AYURVED Traditional Ayurvedic Ubtan is 100% natural, pure herbal, and free from added synthetic chemicals. Packed with potent botanicals including Manjishta, Chandan, Vetchandan, Lodhra, Nagkesar, Halad, Gulab, and Multani Mitti. Gently purifies pores, reduces sun tan, fades blemishes, and imparts a natural golden luster.',
    ingredients: 'Manjishta (Rubia cordifolia), Chandan (Santalum album), Vetchandan, Lodhra (Symplocos racemosa), Nagkesar (Mesua ferrea), Multani Mitti (Fuller\'s Earth), Halad (Curcuma longa), Gulab Petal Powder (Rosa damascena).',
    ayurvedicBenefits: [
      'Traditionally valued for calming Pitta and Kapha skin imbalances',
      'Naturally exfoliates without stripping natural lipid barriers',
      'Supports healthy skin cell renewal and reversal of tanning',
      'Imparts a natural golden Ayurvedic complexion (Varnya)'
    ],
    howToUse: 'Take 1 to 2 teaspoons in a brass or ceramic bowl. Mix with SHRiTEJ Pure Kannauj Rose Water (for oily/normal skin) or raw organic milk/curd (for dry skin) to form a smooth paste. Apply evenly over face and neck. Leave for 12-15 minutes until semi-dry. Rinse with cool water in gentle circular motions.',
    suitableFor: 'All skin types (Vata, Pitta, Kapha). Suitable for both men and women.',
    netQuantity: '100g',
    shelfLife: '24 Months from manufacturing date',
    storage: 'Store in a cool, dry place away from direct sunlight. Ensure zipper pouch is sealed tightly after each use.',
    packagingDetails: '100% Biodegradable unbleached raw kraft stand-up pouch with moisture-barrier compostable lining.',
    sustainabilityInfo: 'Zero plastic exterior. 100% biodegradable kraft and water-based soy ink printing.',
    disclaimer: 'Ayurvedic proprietary cosmetic formulation. For external use only. Natural ingredients may be prone to slight color variations across batches without affecting potency. Patch test recommended before first use.',
    sku: 'STA-UBT-100',
    weight: '100g',
    reviewsList: [
      { id: 'r1', author: 'Pooja Kulkarni', rating: 5, date: '2 days ago', comment: 'This authentic Ayurvedic formulation gave my skin an instant radiant golden glow! Pure botanical feel with no chemicals.', verified: true },
      { id: 'r2', author: 'Aniket Deshmukh', rating: 5, date: '5 days ago', comment: 'Gently cleared deep sun tanning within a week. The fragrance is pure natural sandalwood and herbs.', verified: true },
      { id: 'r3', author: 'Sneha Patil', rating: 5, date: '1 week ago', comment: 'Truly authentic. Mixed with SHRiTEJ Rose Water, it leaves skin nourished without any dryness.', verified: true },
      { id: 'r4', author: 'Rahul Shinde', rating: 4.9, date: '2 weeks ago', comment: 'Unbeatable craftsmanship and earth-conscious biodegradable wrap. Genuine Indian wellness.', verified: true }
    ],
    specs: {
      'Form': 'Fine Stone-Pulverized Botanical Powder',
      'Herbal Actives': 'Manjishta, Lodhra, Chandan, Halad, Gulab, Nagkesar',
      'Purity Standard': '100% Natural, Chemical Free, Skin-friendly',
      'Skin Compatibility': 'For All Skin Types (Men & Women)',
      'Packaging': 'Biodegradable Resealable Pouch'
    }
  },
  {
    id: 'rose-water',
    name: 'SHRiTEJ Kannauj Pure Steam-Distilled Gulab Jal (200ml)',
    tagline: '100% Pure Distillate natural face toner & Ayurvedic ubtan activator',
    price: 249,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 8,
    category: 'Toners & Mists',
    image: '/images/shivtej-rose-water.jpg',
    stock: 65,
    isFeatured: true,
    isNewArrival: true,
    description: 'SHRiTEJ AYURVED Premium Rose Water is crafted via classical Deg-Bhapka hydro-steam distillation of freshly handpicked Kannauj Damask roses. 100% pure steam-distilled floral hydrosol. Balances skin pH, calms flushed redness, tightens enlarged pores, and acts as the perfect botanical activator for SHRiTEJ Ayurvedic Ubtan.',
    ingredients: '100% Pure Steam Distillate of fresh Indian Damask Roses (Rosa damascena hydrosol). Zero added alcohol, artificial fragrance, or synthetic preservatives.',
    ayurvedicBenefits: [
      'Traditionally cools excess Pitta heat in facial skin',
      'Hydrates and balances natural skin moisture levels',
      'Acts as a gentle botanical astringent to refine pore appearance',
      'Aromatherapeutic Damask rose essence calms senses'
    ],
    howToUse: 'Spritz generously onto cleansed face and neck morning and evening. Allow to air absorb. Alternatively, use 2 tablespoons to activate SHRiTEJ Traditional Ayurvedic Ubtan into a smooth paste.',
    suitableFor: 'All skin types, especially sensitive and inflamed Pitta skin.',
    netQuantity: '200ml',
    shelfLife: '18 Months from distillation',
    storage: 'Keep in a cool, shaded sanctuary. Can be refrigerated for an invigorating cooling effect.',
    packagingDetails: 'Reusable amber recyclable bottle with fine mist sprayer and eco-label.',
    sustainabilityInfo: 'Glass/PET recyclable vessel, plastic-minimized pump, biodegradable unbleached carton.',
    disclaimer: 'Natural hydrosol. Free from parabens, synthetic fragrances, and alcohol.',
    sku: 'STA-GJ-200',
    weight: '230g',
    reviewsList: [
      { id: 'r5', author: 'Meera Iyer', rating: 5, date: '3 days ago', comment: 'The natural aroma of Kannauj roses is divine. Not synthetic perfume at all, just soothing real rose water.', verified: true },
      { id: 'r6', author: 'Kavita Joshi', rating: 4.9, date: '1 week ago', comment: 'So soothing on my sensitive skin. I spritz this throughout the day in summer.', verified: true }
    ],
    specs: {
      'Origin': 'Kannauj, India (Traditional Hydro-Distillation)',
      'Packaging': 'Fine Mist Sprayer, Eco-Friendly Bottle',
      'Purity Standard': '100% Pure Distillate, Zero Added Alcohol',
      'Application': 'Direct Hydrosol Mist or Ubtan Activator'
    }
  },
  {
    id: 'chandan-bar',
    name: 'SHRiTEJ Mysore Sandalwood & A2 Ghee Soap (125g)',
    tagline: 'Artisan handmade bath bar with Pure Mysore Sandalwood & Vedic A2 Cow Ghee',
    price: 189,
    originalPrice: 260,
    rating: 5.0,
    reviewsCount: 7,
    category: 'Bathing Rituals',
    image: '/images/shritej-soap.jpg',
    stock: 70,
    isFeatured: true,
    isNewArrival: true,
    description: 'SHRiTEJ AYURVED Mysore Sandalwood Bath Bar is an artisan cold-cured soap enriched with real Indian Sandalwood paste, Vedic A2 Cow Ghee, and virgin cold-pressed coconut oil. Produces a velvety, creamy lather that deep cleanses pores while sealing natural skin lipids without tightness.',
    ingredients: 'Pure Mysore Sandalwood Extract (Santalum album), Vedic Gir Cow A2 Ghee, Saponified Virgin Coconut Oil, Castor Oil, Mahua Oil, Botanical Glycerin, Natural Sandalwood Essential Oil.',
    ayurvedicBenefits: [
      'Pure Chandan cools and soothes irritated, sun-stressed skin',
      'Vedic A2 Ghee deeply penetrates epidermis for long-lasting hydration',
      'Promotes satvik calming during classical daily snana (bath)',
      'Helps clear blemishes and maintains natural moisture barrier'
    ],
    howToUse: 'Wet skin with lukewarm water. Rub the bar gently between palms to generate rich Ayurvedic lather. Massage over body in mindful circles. Rinse thoroughly.',
    suitableFor: 'Normal to dry, sensitive skin. Gentle enough for daily bath ritual.',
    netQuantity: '125g',
    shelfLife: '36 Months from packaging',
    storage: 'Store in a draining soap dish to dry between uses for extended bar life.',
    packagingDetails: 'Hand-wrapped in 100% natural handmade cotton-rag paper and bound with organic raw jute twine. Completely plastic-free.',
    sustainabilityInfo: '100% Zero Plastic Packaging. Biodegradable compostable wrap.',
    disclaimer: 'Grade 1 TFM (>78%). SLS & Paraben free. Free from animal fat.',
    sku: 'STA-SN-125',
    weight: '125g',
    reviewsList: [
      { id: 'r7', author: 'Dr. Ramesh Sharma', rating: 5, date: '4 days ago', comment: 'Outstanding soap. The inclusion of genuine A2 Ghee leaves skin so supple without needing lotion.', verified: true },
      { id: 'r8', author: 'Aditi Nair', rating: 5, date: '2 weeks ago', comment: 'The packaging with jute thread and handmade paper is breathtakingly traditional. Smells like a temple.', verified: true }
    ],
    specs: {
      'Net Weight': '125g Handcrafted Embossed Bar',
      'Key Ingredients': 'Pure Mysore Sandalwood, Vedic A2 Cow Ghee, Cold-Pressed Coconut Oil',
      'Quality Standard': 'Grade 1 TFM (>78%), SLS Free, Paraben Free',
      'Packaging': '100% Plastic-Free Handmade Cotton Paper & Jute'
    }
  },
  {
    id: 'ubtan-glow-combo',
    name: 'SHRiTEJ Royal Ubtan & Rose Water Ritual Duo',
    tagline: 'Complete Ayurvedic glowing ritual pack with Steam-Distilled Gulab Jal',
    price: 499,
    originalPrice: 749,
    rating: 5.0,
    reviewsCount: 10,
    category: 'Combos & Kits',
    image: '/images/shivtej-rose-water.jpg',
    stock: 40,
    isFeatured: true,
    isNewArrival: false,
    description: 'The ultimate Ayurvedic glow pairing. Includes authentic SHRiTEJ Traditional Ayurvedic Ubtan (100g) paired with our 100% pure Kannauj Rose Water to create the perfect soothing paste for regular exfoliation, instant tan reversal, and deep hydration.',
    ingredients: 'Combo kit containing 1x SHRiTEJ Traditional Ubtan (100g) and 1x Kannauj Pure Rose Water (200ml).',
    ayurvedicBenefits: [
      'Comprehensive synergistic treatment for uneven skin tone',
      'Rose water acts as the optimal botanical carrier for Ubtan actives',
      'Purifies pores and imparts a lit-from-within Ayurvedic radiance',
      'Time-tested combination used in traditional bridal snana rituals'
    ],
    howToUse: 'Scoop 1 teaspoon Ubtan into a bowl, spritz 4-5 pumps of Rose Water, mix into a paste. Apply for 15 minutes and rinse gently.',
    suitableFor: 'All skin types looking for natural tan clearing and radiance.',
    netQuantity: '100g Pouch + 200ml Bottle',
    shelfLife: '18 Months',
    storage: 'Store in cool dry conditions.',
    packagingDetails: 'Packed in an unbleached recycled cardboard gift box with wood-wool padding.',
    sustainabilityInfo: '100% recyclable shipping box, minimal tape, biodegradable cushioning.',
    disclaimer: 'Ayurvedic proprietary kit. For external wellness ritual only.',
    sku: 'STA-KIT-DUO',
    weight: '350g',
    reviewsList: [
      { id: 'r9', author: 'Swati R.', rating: 5, date: '3 days ago', comment: 'Best duo for weekly pampering. Skin looks so fresh and clean after using them together.', verified: true }
    ],
    specs: {
      'Kit Contents': '1x Ubtan (100g) + 1x Kannauj Rose Water (200ml)',
      'Primary Benefits': 'Instant tan removal, refined pores, radiant glow',
      'Ritual Frequency': '2-3 times weekly'
    }
  },
  {
    id: 'ubtan-snana-trio',
    name: 'SHRiTEJ Complete Ayurvedic Snana Box (3-Piece)',
    tagline: 'The Ultimate 3-Piece Traditional Bathing & Glow Ritual',
    price: 699,
    originalPrice: 1050,
    rating: 5.0,
    reviewsCount: 6,
    category: 'Combos & Kits',
    image: '/images/shritej-soap.jpg',
    stock: 35,
    isFeatured: true,
    isNewArrival: true,
    description: 'An all-inclusive Ayurvedic body and skin care sanctuary box. Contains SHRiTEJ Ayurvedic Ubtan (100g), Mysore Sandalwood & A2 Ghee Soap (125g), and Pure Kannauj Rose Water (200ml) for a royal snana ritual at home.',
    ingredients: 'Complete trio: Ubtan Herbal Powder, Mysore Sandalwood Cold-Cured Soap, Steam-Distilled Rose Water.',
    ayurvedicBenefits: [
      'Cleanses, exfoliates, and balances total body skin vitality',
      'Replaces synthetic shower gels and plastic body scrubs completely',
      'Infuses skin with sacred sandalwood, saffron notes, and herbal warmth'
    ],
    howToUse: 'Cleanse body with Mysore Sandalwood soap. Once weekly, apply Ubtan mixed with Rose Water over full body. Spritz rose water after drying.',
    suitableFor: 'Full family wellness, festive preparation, daily Ayurvedic bathing.',
    netQuantity: '100g + 125g + 200ml',
    shelfLife: '18 Months',
    storage: 'Store in ambient conditions away from damp moisture.',
    packagingDetails: 'Packaged in a heritage corrugated unbleached gift box tied with raw coir string.',
    sustainabilityInfo: 'Completely plastic-free outer packaging.',
    disclaimer: 'Pure botanical formulations. Zero synthetic foaming agents.',
    sku: 'STA-KIT-TRIO',
    weight: '500g',
    reviewsList: [
      { id: 'r10', author: 'Gaurav K.', rating: 5, date: '1 week ago', comment: 'Gifted this to my mother for Diwali. The aroma and packaging are genuinely royal and Ayurvedic.', verified: true }
    ],
    specs: {
      'Box Includes': '1x Ubtan (100g) + 1x Soap (125g) + 1x Rose Water (200ml)',
      'Best For': 'Festivals, Weddings, Complete Skincare Wellness',
      'Packaging': 'Biodegradable Craft Box'
    }
  },
  {
    id: 'ubtan-family-200g',
    name: 'SHRiTEJ Ayurvedic Ubtan Family Pack (200g)',
    tagline: 'Double value pack of our signature herbal glowing ubtan',
    price: 499,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 8,
    category: 'Ubtan & Lepa',
    image: '/images/shritej-ubtan.jpg',
    stock: 50,
    isFeatured: true,
    isNewArrival: false,
    description: 'Economical family size pouch of authentic SHRiTEJ Ayurvedic Ubtan. Ideal for daily face cleansing, bridal glow prep, and weekly whole-body traditional Ayurvedic bath (snana). Packed with Manjishta, Chandan, Lodhra, and Halad.',
    ingredients: 'Manjishta, Chandan, Vetchandan, Lodhra, Nagkesar, Multani Mitti, Halad, Gulab Petals.',
    ayurvedicBenefits: [
      'Ample quantity for whole body Ayurvedic snana (bath ritual)',
      'Natural solution for body tanning, rough elbows, and back acne',
      'Economical eco-pack saving packaging waste'
    ],
    howToUse: 'Use 2-3 tablespoons for full body massage before bath. Let sit for 10 minutes then wash off with warm water.',
    suitableFor: 'All skin types, full family use.',
    netQuantity: '200g (2 x 100g Pouches)',
    shelfLife: '24 Months',
    storage: 'Seal zip lock tightly after opening.',
    packagingDetails: 'Biodegradable kraft twin pouches.',
    sustainabilityInfo: 'Reduces outer packaging overhead by 40%.',
    disclaimer: 'Natural product. Suitable for external use.',
    sku: 'STA-UBT-200',
    weight: '210g',
    reviewsList: [
      { id: 'r11', author: 'Sunita M.', rating: 5, date: '5 days ago', comment: 'We use this for the whole family on Sundays. Makes skin very soft without soap.', verified: true }
    ],
    specs: {
      'Net Weight': '200g (2 x 100g Pouches)',
      'Benefits': 'Full-body tan removal, silky texture, blemish clearing',
      'Ingredients': 'Chandan, Halad, Manjishta, Lodhra, Gulab, Nagkesar'
    }
  },
  {
    id: 'kumkumadi-oil',
    name: 'SHRiTEJ Kumkumadi Miraculous Beauty Tailam (30ml)',
    tagline: 'Ancient Kashmiri Saffron elixir with 26 classical botanicals',
    price: 799,
    originalPrice: 1299,
    rating: 5.0,
    reviewsCount: 7,
    category: 'Facial Oils',
    image: '/images/placeholder-tailam.svg',
    stock: 0,
    isFeatured: true,
    isNewArrival: false,
    description: 'Formulated according to classical Ashtanga Hridaya taila paka methods. Infused with Grade-A Kashmiri Mogra Saffron, Red Sandalwood, Manjishta, and sacred lotus stamens in cold-pressed sesame oil. Apply nightly after washing off SHRiTEJ Ubtan to seal in moisture and rejuvenate skin tone.',
    ingredients: 'Kashmiri Kesar (Crocus sativus), Raktachandana, Manjishta, Yashtimadhu, Ushira, Padmaka, Kamal Kesar, Cold-Pressed Black Sesame Oil, Goat Milk decoction.',
    ayurvedicBenefits: [
      'Traditionally celebrated as classical "Varnya Tailam" for radiant skin',
      'Assists in minimizing fine lines and pigmentation spots',
      'Provides deep lipid nourishment during overnight rejuvenation'
    ],
    howToUse: 'Take 2 to 3 drops onto clean fingertips. Gently press onto cleansed, slightly damp face and neck. Massage in upward strokes until absorbed.',
    suitableFor: 'Normal to dry, mature, and dull skin.',
    netQuantity: '30ml',
    shelfLife: '24 Months',
    storage: 'Store away from direct light.',
    packagingDetails: 'Heavy amber UV-protective glass bottle with glass dropper.',
    sustainabilityInfo: '100% recyclable amber glass vessel.',
    disclaimer: 'Ayurvedic classical formulation. Not for internal consumption.',
    sku: 'STA-KUM-30',
    weight: '85g',
    reviewsList: [
      { id: 'r12', author: 'Nandini Sen', rating: 5, date: '1 week ago', comment: 'A few drops overnight and wake up with glowing, non-greasy skin. Real saffron strands inside!', verified: true }
    ],
    specs: {
      'Net Volume': '30ml Glass Dropper Bottle',
      'Key Ingredients': 'Kashmiri Kesar, Sandalwood, Manjishta, Sesame Oil',
      'Standard': 'Classical Taila Paka Method'
    }
  },
  {
    id: 'neem-tulsi-lepa',
    name: 'SHRiTEJ Purifying Neem & Tulsi Anti-Blemish Lepa (100g)',
    tagline: 'Targeted clarifying herbal clay pack for active acne and oil control',
    price: 320,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 5,
    category: 'Ubtan & Lepa',
    image: '/images/placeholder-lepa.svg',
    stock: 0,
    isFeatured: false,
    isNewArrival: true,
    description: 'Formulated with organic Neem leaf powder, Krishna Tulsi, Lodhra, and therapeutic Multani Mitti. Decongests clogged pores, pacifies irritated blemishes, and absorbs excess oil while preserving vital skin hydration.',
    ingredients: 'Organic Neem (Azadirachta indica), Krishna Tulsi (Ocimum sanctum), Lodhra (Symplocos racemosa), Haridra, Multani Mitti.',
    ayurvedicBenefits: [
      'Soothes active blemishes and Kapha oily congestion',
      'Natural anti-bacterial botanical action without drying alcohols',
      'Tightens pores and clarifies dull oily complexion'
    ],
    howToUse: 'Mix 1 teaspoon with SHRiTEJ Rose Water or fresh curd. Apply onto blemish-prone areas or full face. Rinse after 10-12 minutes.',
    suitableFor: 'Oily, acne-prone, and combination skin.',
    netQuantity: '100g',
    shelfLife: '24 Months',
    storage: 'Store in dry place.',
    packagingDetails: 'Biodegradable unbleached raw kraft stand-up pouch.',
    sustainabilityInfo: 'Plastic-free compostable kraft pouch.',
    disclaimer: 'Herbal cosmetic lepa. Patch test recommended.',
    sku: 'STA-NTL-100',
    weight: '100g',
    reviewsList: [
      { id: 'r13', author: 'Vikas P.', rating: 5, date: '2 weeks ago', comment: 'Calmed my breakouts within 3 days without peeling or irritation like chemical face washes.', verified: true }
    ],
    specs: {
      'Net Weight': '100g Pouch',
      'Herbs': 'Wild Neem, Krishna Tulsi, Lodhra, Multani Mitti',
      'Best For': 'Acne & Oil Clarification'
    }
  }
];