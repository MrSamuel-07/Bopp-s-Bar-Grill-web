export type MenuCategory =
  | 'All'
  | 'Starters & Shareables'
  | 'Signature Burgers'
  | 'Sandwiches & Wraps'
  | 'Friday Fish Fry & Entrees'
  | 'Drinks & Drafts';

export type MenuTag = 'House Favorite' | 'Spicy' | 'Vegetarian';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  description: string;
  price: number;
  tags: MenuTag[];
}

export interface WeeklySpecial {
  id: string;
  dayLabel: string;
  title: string;
  highlight: string;
  description: string;
  timing: string;
}

export interface LocalReview {
  id: string;
  author: string;
  context: string;
  quote: string;
  rating: number;
}

export const TAVERN_INFO = {
  name: "Bopp's Bar & Grill",
  streetAddress: '103 E Front St',
  cityStateZip: 'Harvard, IL 60033',
  fullAddress: '103 E Front St, Harvard, IL 60033',
  phoneDisplay: '+1 815-943-7033',
  phoneHref: 'tel:+18159437033',
  mapsPlaceUrl:
    'https://www.google.com/maps/search/?api=1&query=103+E+Front+St,+Harvard,+IL+60033',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=103+E+Front+St,+Harvard,+IL+60033',
  ratingScore: '4.4',
  reviewCountLabel: '300+',
  hours: [
    { days: 'Mon – Thu', time: '11:00 AM – 10:00 PM' },
    { days: 'Fri – Sun', time: '11:00 AM – 12:00 AM' },
  ],
} as const;

export const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Starters & Shareables',
  'Signature Burgers',
  'Sandwiches & Wraps',
  'Friday Fish Fry & Entrees',
  'Drinks & Drafts',
];

export const MENU_TAGS: MenuTag[] = ['House Favorite', 'Spicy', 'Vegetarian'];

export const MENU_ITEMS: MenuItem[] = [
  // Starters & Shareables
  {
    id: 'cheese-curds',
    name: 'Wisconsin White Cheddar Curds',
    category: 'Starters & Shareables',
    description:
      'Lightly breaded white cheddar curds fried golden and served hot with buttermilk ranch.',
    price: 10.5,
    tags: ['House Favorite', 'Vegetarian'],
  },
  {
    id: 'pub-wings',
    name: 'Jumbo Tavern Wings (8 pc)',
    category: 'Starters & Shareables',
    description:
      'Crispy bone-in wings tossed in classic Buffalo, Honey BBQ, Garlic Parmesan, or Nashville Hot.',
    price: 13.5,
    tags: ['House Favorite', 'Spicy'],
  },
  {
    id: 'loaded-nachos',
    name: 'Front Street Loaded Nachos',
    category: 'Starters & Shareables',
    description:
      'House tortilla chips layered with seasoned ground beef, queso, jalapeños, pico de gallo, and sour cream.',
    price: 13.0,
    tags: ['Spicy'],
  },
  {
    id: 'pretzel-bites',
    name: 'Warm Pretzel Bites & Beer Cheese',
    category: 'Starters & Shareables',
    description:
      'Salted soft Bavarian pretzel bites served with house-made amber ale cheddar dip and stone-ground mustard.',
    price: 10.0,
    tags: ['Vegetarian'],
  },
  {
    id: 'sweet-potato-basket',
    name: 'Crispy Sweet Potato Fries Basket',
    category: 'Starters & Shareables',
    description:
      'Full pub basket of seasoned sweet potato fries dusted with sea salt and served with maple-cinnamon dip.',
    price: 7.5,
    tags: ['Vegetarian'],
  },

  // Signature Burgers (served with kettle chips or fries)
  {
    id: 'southwest-burger',
    name: 'The Southwest Burger',
    category: 'Signature Burgers',
    description:
      'Half-pound locally ground beef patty topped with pepper jack cheese, crispy bacon, pickled jalapeños, onion rings, and smoky chipotle mayo on a toasted brioche bun.',
    price: 15.5,
    tags: ['House Favorite', 'Spicy'],
  },
  {
    id: 'black-n-blue',
    name: 'Black-N-Blue Tavern Burger',
    category: 'Signature Burgers',
    description:
      'Blackened seasoning crust, crumbled Danish blue cheese, caramelized onions, crisp greens, and garlic aioli on a buttered brioche bun.',
    price: 15.0,
    tags: ['House Favorite'],
  },
  {
    id: 'bopps-classic-smash',
    name: "Bopp's Classic Double Cheeseburger",
    category: 'Signature Burgers',
    description:
      'Two seared locally ground beef patties, double aged American cheddar, crisp dill pickles, shaved onion, and house burger sauce.',
    price: 14.5,
    tags: ['House Favorite'],
  },
  {
    id: 'patty-melt',
    name: 'Griddled Rye Patty Melt',
    category: 'Signature Burgers',
    description:
      'Juicy half-pound patty with melted Swiss and American cheese plus sweet sautéed onions on toasted marble rye.',
    price: 14.5,
    tags: [],
  },
  {
    id: 'mushroom-swiss-burger',
    name: 'Garlic Mushroom & Swiss Burger',
    category: 'Signature Burgers',
    description:
      'Seared beef patty piled high with cremini mushrooms sautéed in garlic butter and double melted Swiss.',
    price: 14.75,
    tags: [],
  },

  // Sandwiches & Wraps
  {
    id: 'malibu-chicken',
    name: 'Malibu Chicken Sandwich',
    category: 'Sandwiches & Wraps',
    description:
      'Char-grilled chicken breast layered with honey ham, melted Swiss cheese, crisp lettuce, tomato, and honey-mustard glaze on brioche.',
    price: 14.0,
    tags: ['House Favorite'],
  },
  {
    id: 'chipotle-chicken-wrap',
    name: 'Crispy Chicken Chipotle Wrap',
    category: 'Sandwiches & Wraps',
    description:
      'Golden chicken tenders, cheddar-jack, romaine, tomato, tortilla strips, and chipotle ranch rolled in a warm flour tortilla.',
    price: 13.0,
    tags: ['Spicy'],
  },
  {
    id: 'italian-beef',
    name: 'Chicago-Style Italian Beef',
    category: 'Sandwiches & Wraps',
    description:
      'Slow-roasted shaved beef simmered in herb au jus on Turano French bread with sweet peppers or hot giardiniera.',
    price: 14.5,
    tags: ['Spicy'],
  },
  {
    id: 'pub-club',
    name: 'Three-Decker Tavern Club',
    category: 'Sandwiches & Wraps',
    description:
      'Roasted turkey breast, hardwood smoked bacon, Swiss, lettuce, ripe tomato, and mayo on toasted sourdough.',
    price: 13.5,
    tags: [],
  },

  // Friday Fish Fry & Entrees
  {
    id: 'friday-fish-fry',
    name: 'Friday Beer-Battered Cod Platter',
    category: 'Friday Fish Fry & Entrees',
    description:
      'Three flaky Atlantic cod fillets hand-dipped in golden lager batter, served with creamy coleslaw, buttered marble rye, lemon, tartar sauce, and seasoned fries.',
    price: 17.5,
    tags: ['House Favorite'],
  },
  {
    id: 'baked-cod-dinner',
    name: 'Lemon Herb Baked Cod',
    category: 'Friday Fish Fry & Entrees',
    description:
      'Oven-baked North Atlantic cod finished with white wine butter, paprika, fresh parsley, potato pancakes or fries, and coleslaw.',
    price: 17.5,
    tags: [],
  },
  {
    id: 'ribeye-steak-sandwich',
    name: '8 oz Tavern Steak Sandwich',
    category: 'Friday Fish Fry & Entrees',
    description:
      'Char-grilled choice ribeye steak served open-faced on garlic-buttered Texas toast with crispy onion straws and fries.',
    price: 21.0,
    tags: ['House Favorite'],
  },
  {
    id: 'chicken-tender-platter',
    name: 'Hand-Breaded Tender Basket',
    category: 'Friday Fish Fry & Entrees',
    description:
      'Buttermilk-brined chicken tenders fried crisp and served with seasoned fries, slaw, and choice of dipping sauce.',
    price: 13.5,
    tags: [],
  },

  // Drinks & Drafts
  {
    id: 'draft-craft-pint',
    name: 'Midwest Rotating Craft Draft (16 oz)',
    category: 'Drinks & Drafts',
    description:
      'Ask your bartender for today’s chilled regional IPA, amber ale, or seasonal wheat pour straight from the brass taps.',
    price: 6.5,
    tags: ['House Favorite'],
  },
  {
    id: 'domestic-tall-draft',
    name: 'Ice-Cold Domestic Draft (20 oz)',
    category: 'Drinks & Drafts',
    description:
      'Miller Lite, Coors Light, or Bud Light poured frosty cold in a heavy tavern glass.',
    price: 5.0,
    tags: [],
  },
  {
    id: 'supper-club-old-fashioned',
    name: 'Tavern Brandy Old Fashioned',
    category: 'Drinks & Drafts',
    description:
      'Hand-muddled orange, brandied cherry, and bitters over Korbel brandy topped with sweet or sour soda.',
    price: 9.5,
    tags: ['House Favorite'],
  },
  {
    id: 'jalapeno-margarita',
    name: 'Spicy Jalapeño Lime Margarita',
    category: 'Drinks & Drafts',
    description:
      'Reposado tequila shaken with fresh lime juice, agave, and muddled jalapeño over a chili-salt rim.',
    price: 10.0,
    tags: ['Spicy'],
  },
  {
    id: 'root-beer-float-bottle',
    name: 'Craft Root Beer Bottle',
    category: 'Drinks & Drafts',
    description:
      'Ice-cold small-batch Sprecher root beer served in a frosted pint glass.',
    price: 3.75,
    tags: ['Vegetarian'],
  },
];

/**
 * Owner-Editable Weekly Specials & Game Day Hooks.
 * Update titles, highlights, or days here to change the live Weekly Specials grid.
 */
export const WEEKLY_SPECIALS: WeeklySpecial[] = [
  {
    id: 'wing-wednesday',
    dayLabel: 'Wednesdays',
    title: 'Wing Wednesday',
    highlight: '$0.95 Jumbo Wings',
    description:
      'Order crispy bone-in wings tossed in your choice of house sauce alongside $4 domestic draft pints all evening.',
    timing: '4:00 PM – Close',
  },
  {
    id: 'friday-fish-fry',
    dayLabel: 'Fridays',
    title: 'Friday Night Fish Fry',
    highlight: 'Hand-Dipped Cod & Rye',
    description:
      'Harvard’s favorite Friday tradition: crispy beer-battered or herb-baked cod platters with slaw, marble rye, and tartar.',
    timing: '11:00 AM – 11:00 PM',
  },
  {
    id: 'late-night-kitchen',
    dayLabel: 'Fri – Sun',
    title: 'Late-Night Kitchen',
    highlight: 'Grill Open Until Midnight',
    description:
      'Full burger, wing, and appetizer menu firing late every Friday, Saturday, and Sunday so nobody goes home hungry.',
    timing: 'Until 12:00 AM',
  },
  {
    id: 'game-day-buckets',
    dayLabel: 'Game Days',
    title: 'Game Day Drafts & Buckets',
    highlight: '$18 Domestic Buckets',
    description:
      'Catch every Bears, Cubs, and college matchup on our big screens with ice-cold 5-bottle buckets and hot shareables.',
    timing: 'All Kickoffs & Tip-Offs',
  },
];

export const LOCAL_REVIEWS: LocalReview[] = [
  {
    id: 'review-1',
    author: 'Matt K.',
    context: 'Harvard Local · Dinner & Drafts',
    quote:
      'The Southwest Burger and sweet potato fries hit the spot every single time. Best bar burger in McHenry County, and the polished wood bar feels like classic hometown hospitality.',
    rating: 5,
  },
  {
    id: 'review-2',
    author: 'Sarah M.',
    context: 'Friday Night Fish Fry Guest',
    quote:
      'Stopped in on a busy Friday night and the service never missed a beat. Crispy beer-battered cod, cold pints, spotless dining room, and welcoming folks behind the bar.',
    rating: 5,
  },
  {
    id: 'review-3',
    author: 'Dave R.',
    context: 'Weekend Regular · Front Street',
    quote:
      'Bopp’s is the kind of neighborhood spot where you can bring family for lunch or stay late for the game. Fresh beef, fair prices, and ice-cold drafts.',
    rating: 4,
  },
];
