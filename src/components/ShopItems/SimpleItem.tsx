import React from "react";
import { Link } from "react-router-dom";

// --- helpers ---
const formatPrice = (n: number | string) =>
  typeof n === "number"
    ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n)
    : n || "0₫";

const fallbackImg =
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop";

const StarsMini = ({ value = 0 }) => {
  const full = Math.floor(value);
  const remain = 5 - full;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f-${i}`} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
          <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
      {Array.from({ length: remain }).map((_, i) => (
        <svg key={`e-${i}`} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#e5e7eb">
          <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
    </div>
  );
};

interface Props {
  product: any;
}

const SimpleItem = ({ product }: Props) => {
  if (!product)
    return (
      <div className="flex items-center justify-center">
        <span className="text-xs font-medium">Product not found</span>
      </div>
    );

  const {
    _id,
    imgLink,
    name = "Unnamed product",
    seller = "Unknown seller",
    price = 0,
    salePrice,
    desc = "",
    avgRating = 0,
    badges = [],
  } = product;

  const hasSale = Number.isFinite(salePrice) && salePrice < price;
  const safeImg = imgLink || fallbackImg;

  return (
    <article className="group relative h-full">
      <div className="relative h-full rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
        {/* Image */}
        <Link to={`/product/${_id}`} className="block">
          <div className="relative overflow-hidden rounded-t-2xl">
            <img
              src={safeImg}
              alt={name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = fallbackImg;
              }}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />

            {/* Badges */}
            <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
              {hasSale && (
                <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                  -{Math.round(((price - salePrice) / price) * 100)}%
                </span>
              )}
              {badges.slice(0, 2).map((b: any, i: any) => (
                <span
                  key={i}
                  className="rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Gradient hover overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </Link>

        {/* Body */}
        <div className="flex flex-col gap-3 p-4">
          {/* Title */}
          <Link to={`/product/${_id}`} className="block">
            <h3 className="line-clamp-2 text-[15px] font-semibold text-gray-900 hover:text-indigo-600">
              {name}
            </h3>
          </Link>

          {/* Seller + rating */}
          <div className="flex items-center justify-between">
            <span className="truncate text-[12px] text-gray-500">
              Sold by <span className="font-medium text-gray-700">{seller}</span>
            </span>

            {/* Rating (nếu có) */}
            <div className="ml-2 flex items-center gap-1">
              <StarsMini value={Number(avgRating || 0)} />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(hasSale ? salePrice : price)}
            </span>
            {hasSale && (
              <span className="pb-[2px] text-sm text-gray-400 line-through">
                {formatPrice(price)}
              </span>
            )}
          </div>

          {/* Desc */}
          <p className="line-clamp-2 text-[13px] leading-5 text-gray-600">
            {desc.length > 120 ? `${desc.slice(0, 120)}…` : desc}
          </p>

          {/* Actions */}
          <div className="mt-1 flex items-center gap-2">
            <Link
              to={`/product/${_id}`}
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Xem chi tiết
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
              onClick={() => alert("Thêm vào giỏ (mock)")}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>

      {/* subtle focus ring on card */}
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl ring-1 ring-black/5" />
    </article>
  );
};

export default SimpleItem;
