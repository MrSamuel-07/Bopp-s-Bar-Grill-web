import { useMemo, useState } from 'react';
import { Minus, Plus, RotateCcw, Search, X } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MENU_TAGS,
  type MenuCategory,
  type MenuItem,
  type MenuTag,
} from '../data/tavernData';

interface MenuSectionProps {
  callAheadQuantities: Record<string, number>;
  onUpdateQuantity: (item: MenuItem, delta: number) => void;
}

export function MenuSection({
  callAheadQuantities,
  onUpdateQuantity,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [selectedTag, setSelectedTag] = useState<MenuTag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesTag =
        selectedTag === null || item.tags.includes(selectedTag);
      const matchesQuery =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedTag(null);
    setSearchQuery('');
  };

  return (
    <section
      id="menu"
      className="bg-[#FAF8F5] text-[#18181B] py-16 sm:py-20 lg:py-24 border-b border-zinc-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#B45309]">
              Kitchen &amp; Taproom
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B]">
              Classic Grill Menu &amp; Cold Drafts
            </h2>
            <p className="text-base text-zinc-600">
              Locally ground beef burgers, hand-dipped Friday cod, and crisp tavern shareables made to order. Add items to build a quick call-ahead list.
            </p>
          </div>
          <p className="text-sm text-zinc-500 tabular-nums shrink-0">
            Showing {filteredItems.length} of {MENU_ITEMS.length} items
          </p>
        </div>

        {/* Category Tabs */}
        <div className="pt-6 space-y-4">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full"
          >
            {MENU_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
                    isActive
                      ? 'bg-[#18181B] text-[#FAF8F5]'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:text-[#18181B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Bar & Tag Filter Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burgers, fish fry, wings, drafts..."
                aria-label="Search menu items"
                className="w-full pl-10 pr-9 py-2.5 rounded-md bg-white border border-zinc-300 text-sm text-[#18181B] placeholder:text-zinc-400 focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]"
              />
              {searchQuery !== '' && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear menu search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs font-medium text-zinc-500 mr-1">
                Filter:
              </span>
              {MENU_TAGS.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                    className={`px-3 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
                      isSelected
                        ? 'bg-[#D97706] text-white'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 py-14 px-6 text-center bg-white border border-zinc-200 rounded-lg">
            <p className="font-display text-xl font-semibold text-[#18181B]">
              No matching menu items found
            </p>
            <p className="mt-1.5 text-sm text-zinc-600">
              Try clearing your search or switching back to all menu categories.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#18181B] hover:bg-zinc-800 text-[#FAF8F5] text-sm font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0 border-t border-zinc-200">
            {filteredItems.map((item) => {
              const qty = callAheadQuantities[item.id] ?? 0;

              return (
                <article
                  key={item.id}
                  className="py-6 border-b border-zinc-200 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-[#18181B] leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-semibold text-base sm:text-lg text-[#18181B] tabular-nums shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Unboxed Clean Typographic Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span>{item.category}</span>
                      {item.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-2">
                          <span aria-hidden="true">·</span>
                          <span
                            className={
                              tag === 'House Favorite'
                                ? 'font-semibold text-[#B45309]'
                                : tag === 'Spicy'
                                  ? 'font-semibold text-red-700'
                                  : 'font-semibold text-emerald-800'
                            }
                          >
                            {tag}
                          </span>
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Call-Ahead Item Action */}
                  <div className="flex items-center justify-end pt-1">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item, 1)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-300 bg-white hover:border-[#D97706] hover:text-[#B45309] text-xs font-semibold text-zinc-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D97706]"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Add to Call-Ahead</span>
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-2 border border-[#D97706]/50 bg-[#D97706]/10 rounded-md px-2 py-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item, -1)}
                          aria-label={`Remove one ${item.name} from call-ahead list`}
                          className="w-7 h-7 inline-flex items-center justify-center rounded bg-white text-[#18181B] hover:bg-zinc-100 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="text-xs font-bold text-[#18181B] tabular-nums min-w-[1.25rem] text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item, 1)}
                          aria-label={`Add one more ${item.name} to call-ahead list`}
                          className="w-7 h-7 inline-flex items-center justify-center rounded bg-[#D97706] text-white hover:bg-[#B45309] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
