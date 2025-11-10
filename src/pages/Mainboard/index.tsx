import React from "react";
import { Link } from "react-router-dom";

import SimpleItem from "../../components/ShopItems/SimpleItem";
import Search from "../../components/Search";
import { useSearch } from "../../hooks/useSearch";

import electronicsData from "../../data/electronicsData.json";

// UI helpers nhỏ
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{children}</h2>
);

// New component for featured products in this category
const CategoryProductCard = ({ product }: { product: any }) => (
  <div className="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="aspect-square overflow-hidden rounded-lg">
      <img
        src={product.imgLink}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="mt-3">
      <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{product.seller}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-indigo-600">
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
        </span>
        {product.avgRating && (
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4 fill-amber-400" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.417 8.264L12 19.771 4.583 23.86 6 15.596 0 9.748l8.332-1.73z" />
            </svg>
            <span className="text-xs font-medium text-gray-600">{product.avgRating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Mainboard = () => {
  // Lọc theo danh mục Mainboard
  const mainboardProducts = electronicsData.filter(
    (product) => product.category === "Mainboard"
  );

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    mainboardProducts,
    ["name", "desc"]
  );

  const resultCount = filteredItems.length;

  // Get featured products in this category (top rated)
  const featuredProducts = [...mainboardProducts]
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Hero / Header */}
      <section className="mx-auto max-w-8xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 p-6 sm:p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-[1.3fr_1fr] sm:items-center">
            <div className="min-w-0">
              <p className="text-sm font-medium uppercase tracking-wider text-white/80">
                Danh mục
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white">
                Mainboard
              </h1>
              <p className="mt-2 sm:mt-3 text-white/90">
                Các dòng bo mạch chủ chất lượng cho Intel/AMD, đa dạng chipset & form factor.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-lg bg-white/95 px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-black/5 transition hover:bg-white"
                >
                  ← Về trang chủ danh mục
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products in this category */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto mt-8 max-w-8xl px-4 sm:px-6">
          <div className="mb-5 sm:mb-6">
            <SectionTitle>Mainboard nổi bật</SectionTitle>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {featuredProducts.map((product) => (
              <CategoryProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Tìm kiếm */}
      <section className="mx-auto mt-8 max-w-8xl px-4 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionTitle>Tìm kiếm Mainboard</SectionTitle>
            <p className="text-sm text-gray-600">
              {resultCount > 0 ? (
                <>Tìm thấy <span className="font-semibold text-gray-900">{resultCount}</span> sản phẩm</>
              ) : (
                <>Không có kết quả phù hợp</>
              )}
            </p>
          </div>
          <div className="mt-3">
            <Search
              className="mb-2"
              filter={searchTerm}
              onFilterChange={setSearchTerm}
            />
          </div>
        </div>
      </section>

      {/* Lưới sản phẩm */}
      <section className="mx-auto mt-6 max-w-8xl px-4 pb-12 sm:px-6">
        {resultCount === 0 ? (
          <div className="grid min-h-[200px] place-items-center rounded-2xl border border-dashed border-gray-200 bg-white/60 p-10 text-center">
            <div>
              <p className="text-sm text-gray-600">
                Không tìm thấy sản phẩm nào. Hãy thử đổi từ khóa hoặc quay lại danh mục.
              </p>
              <div className="mt-3">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Về trang chủ danh mục
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredItems.map((product) => (
              <SimpleItem key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Mainboard;
