import { useState } from 'react';
import { Check, Copy, Minus, Phone, Plus, Trash2, X } from 'lucide-react';
import { MENU_ITEMS, TAVERN_INFO, type MenuItem } from '../data/tavernData';
import type { TavernHoursStatus } from '../utils/hours';

interface CallAheadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quantities: Record<string, number>;
  onUpdateQuantity: (item: MenuItem, delta: number) => void;
  onClearAll: () => void;
  hoursStatus: TavernHoursStatus;
}

export function CallAheadDrawer({
  isOpen,
  onClose,
  quantities,
  onUpdateQuantity,
  onClearAll,
  hoursStatus,
}: CallAheadDrawerProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const selectedItems = MENU_ITEMS.filter((item) => (quantities[item.id] ?? 0) > 0);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
    0
  );

  const handleCopySummary = async () => {
    if (selectedItems.length === 0) return;
    const lines = selectedItems.map(
      (item) =>
        `${quantities[item.id]}x ${item.name} ($${(
          item.price * quantities[item.id]
        ).toFixed(2)})`
    );
    const summaryText = `Bopp's Bar & Grill Call-Ahead List:\n${lines.join(
      '\n'
    )}\nEstimated Subtotal: $${subtotal.toFixed(2)}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts; ignore silently
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-ahead-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
    >
      {/* Backdrop click closes */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      <aside className="w-full max-w-md bg-[#FAF8F5] text-[#18181B] h-full flex flex-col shadow-2xl border-l border-zinc-200">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-[#18181B] text-[#FAF8F5] flex items-center justify-between gap-4">
          <div>
            <h2 id="call-ahead-title" className="font-display text-xl font-bold">
              Order / Call Ahead
            </h2>
            <p className="text-xs text-zinc-300 mt-0.5 tabular-nums">
              {hoursStatus.statusLabel} · {hoursStatus.detailText}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close call-ahead drawer"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#B45309]">
              Fastest Way to Order Takeout
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Call our bartender directly at{' '}
              <span className="font-semibold text-[#18181B] tabular-nums">
                {TAVERN_INFO.phoneDisplay}
              </span>{' '}
              to place your pickup order. Build your checklist below so you have everything ready when you dial.
            </p>
          </div>

          {selectedItems.length === 0 ? (
            <div className="py-10 px-4 text-center border border-dashed border-zinc-300 rounded-lg space-y-3">
              <p className="font-display text-lg font-semibold text-[#18181B]">
                Your call-ahead list is empty
              </p>
              <p className="text-sm text-zinc-600">
                Browse the menu and click &ldquo;+ Add to Call-Ahead&rdquo; on any burger, fish fry, or starter, or call us directly right now.
              </p>
              <a
                href="#menu"
                onClick={onClose}
                className="inline-block px-4 py-2 rounded-md bg-[#18181B] text-[#FAF8F5] text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                Browse Menu Items
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#18181B]">
                  Your Call-Ahead Checklist
                </h3>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              </div>

              <ul className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
                {selectedItems.map((item) => {
                  const qty = quantities[item.id] ?? 0;
                  return (
                    <li
                      key={item.id}
                      className="py-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#18181B] truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-500 tabular-nums">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="inline-flex items-center gap-1.5 border border-zinc-300 bg-white rounded-md px-1.5 py-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item, -1)}
                            aria-label={`Decrease ${item.name}`}
                            className="w-6 h-6 inline-flex items-center justify-center rounded hover:bg-zinc-100 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" aria-hidden="true" />
                          </button>
                          <span className="text-xs font-bold tabular-nums min-w-[1.25rem] text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item, 1)}
                            aria-label={`Increase ${item.name}`}
                            className="w-6 h-6 inline-flex items-center justify-center rounded hover:bg-zinc-100 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" aria-hidden="true" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold tabular-nums w-16 text-right">
                          ${(item.price * qty).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-medium text-zinc-600">
                  Estimated Subtotal (before tax)
                </span>
                <span className="font-display text-xl font-bold text-[#18181B] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-zinc-300 bg-white hover:bg-zinc-50 text-xs font-semibold text-[#18181B] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                    <span>Copied Order List</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                    <span>Copy Checklist to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-6 bg-white border-t border-zinc-200 space-y-2.5">
          <a
            href={TAVERN_INFO.phoneHref}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors tabular-nums"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Call {TAVERN_INFO.phoneDisplay} to Place Order</span>
          </a>
          <p className="text-center text-xs text-zinc-500">
            Pickup at {TAVERN_INFO.fullAddress}
          </p>
        </div>
      </aside>
    </div>
  );
}
