import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Search from "../../components/Search";
import SimpleItem from "../../components/ShopItems/SimpleItem";
import { useSearch } from "../../hooks/useSearch";

import electronicsData from "../../data/electronicsData.json";

// --- small UI helpers ---
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{children}</h2>
);

const CategoryCard = ({ to, title, desc, gradient, icon }: { to: string; title: string; desc: string; gradient: string; icon: React.ReactNode }) => (
  <Link to={to} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl">
    <div
      className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${gradient}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-sm ring-1 ring-black/5">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {desc}
          </p>
        </div>
      </div>

      {/* subtle gradient gloss */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  </Link>
);

// New component for featured products
const FeaturedProductCard = ({ product }: { product: any }) => (
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

// New component for brand showcase
const BrandShowcase = () => {
  const brands = [
    { name: "ASUS", logo: "A" },
    { name: "MSI", logo: "M" },
    { name: "Gigabyte", logo: "G" },
    { name: "Intel", logo: "I" },
    { name: "AMD", logo: "A" },
    { name: "Anker", logo: "A" },
  ];

  return (
    <section className="mx-auto mt-8 max-w-8xl px-4 sm:px-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thương hiệu nổi bật</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg border border-gray-200 p-4 transition-all hover:bg-gray-50"
            >
              <span className="text-lg font-bold text-gray-700">{brand.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// New component for promotions
const PromotionBanner = () => (
  <section className="mx-auto mt-8 max-w-8xl px-4 sm:px-6">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 p-6 sm:p-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
        <div className="mb-4 sm:mb-0 sm:mr-6">
          <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
            Khuyến mãi đặc biệt
          </span>
          <h3 className="mt-2 text-2xl font-bold text-white">Giảm giá 20% cho đơn hàng đầu tiên</h3>
          <p className="mt-2 text-white/90">Áp dụng cho tất cả sản phẩm trong tuần này</p>
          <button className="mt-4 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-amber-600 shadow-sm hover:bg-gray-100">
            Mua ngay
          </button>
        </div>
        <div className="hidden sm:block">
          <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">20%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    electronicsData,
    ["name", "desc"]
  );

  const resultCount = filteredItems.length;

  // Get featured products (top rated)
  const featuredProducts = [...electronicsData]
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
    .slice(0, 6);

  // Get latest products
  const latestProducts = [...electronicsData]
    .sort((a, b) => b._id.localeCompare(a._id))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global header (giữ nguyên) */}
      <Header className="mb-6 lg:mb-10" />

      {/* Hero / Banner */}
      <section className="mx-auto max-w-8xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 p-5 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div className="min-w-0">
              <p className="text-sm font-medium uppercase tracking-wider text-white/80">Linh kiện điện tử</p>
              <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white">
                Build PC & Phụ kiện sạc / Hub chuyển đổi
              </h1>
              <p className="mt-2 sm:mt-3 text-white/90">
                Duyệt nhanh các danh mục chính: Mainboard, Linh kiện sạc điện thoại, Hub chuyển đổi.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/mainboard"
                  className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-slate-50"
                >
                  Xem Mainboard
                </Link>
                <Link
                  to="/charging-components"
                  className="inline-flex items-center rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-indigo-800 shadow-sm ring-1 ring-black/5 transition hover:bg-white"
                >
                  Linh kiện sạc
                </Link>
                <Link
                  to="/hubs"
                  className="inline-flex items-center rounded-lg bg-indigo-900/20 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-indigo-900/30"
                >
                  Hub chuyển đổi
                </Link>
              </div>
            </div>

            {/* banner image */}
            <div className="hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"
                alt="Electronics"
                className="h-40 w-full rounded-2xl object-cover md:h-48 lg:h-56"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <PromotionBanner />

      {/* Categories */}
      <section className="mx-auto mt-8 max-w-8xl px-4 sm:px-6">
        <div className="mb-5 sm:mb-6 flex items-center justify-between">
          <SectionTitle>Danh mục sản phẩm</SectionTitle>
          <Link to="/catalog" className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <CategoryCard
            to="/mainboard"
            title="Mainboard"
            desc="Bo mạch chủ cho Intel/AMD, form ATX/mATX/ITX, chipset đa dạng."
            gradient="bg-gradient-to-br from-indigo-50 to-white"
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-indigo-600">
                <path fill="currentColor" d="M3 5h18v14H3V5zm2 2v10h14V7H5zm3 2h2v2H8V9zm4 0h2v2h-2V9zM8 13h2v2H8v-2zm4 0h5v2h-5v-2z" />
              </svg>
            }
          />
          <CategoryCard
            to="/charging-components"
            title="Linh kiện sạc điện thoại"
            desc="Cốc sạc, IC sạc, dây cáp, module PD/QC, linh kiện thay thế."
            gradient="bg-gradient-to-br from-emerald-50 to-white"
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-600">
                <path fill="currentColor" d="M11 21h2v-4h-2v4zM7 3h10v8H7V3zm-2 8V3a2 2 0 012-2h10a2 2 0 012 2v8h1a1 1 0 110 2H4a1 1 0 010-2h1z" />
              </svg>
            }
          />
          <CategoryCard
            to="/hubs"
            title="Hub chuyển đổi"
            desc="USB-C/USB-A hub, HDMI/DP/VGA, LAN, SD, PD passthrough."
            gradient="bg-gradient-to-br from-fuchsia-50 to-white"
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-fuchsia-600">
                <path fill="currentColor" d="M4 10h16v4H4v-4zm2 6h12v2H6v-2zM6 6h12v2H6V6z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto mt-8 max-w-8xl px-4 sm:px-6">
        <div className="mb-5 sm:mb-6 flex items-center justify-between">
          <SectionTitle>Sản phẩm nổi bật</SectionTitle>
          <Link to="/catalog" className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="mx-auto mt-8 max-w-8xl px-4 sm:px-6">
        <div className="mb-5 sm:mb-6 flex items-center justify-between">
          <SectionTitle>Sản phẩm mới nhất</SectionTitle>
          <Link to="/catalog" className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {latestProducts.map((product) => (
            <FeaturedProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Search */}
      <section className="mx-auto mt-8 max-w-8xl px-4 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionTitle>Tìm kiếm</SectionTitle>
            <p className="text-sm text-gray-600">
              {resultCount > 0 ? (
                <>Tìm thấy <span className="font-semibold text-gray-900">{resultCount}</span> sản phẩm</>
              ) : (
                <>Không có kết quả phù hợp</>
              )}
            </p>
          </div>
          <div className="mt-3">
            <Search className="mb-2" filter={searchTerm} onFilterChange={setSearchTerm} />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto mt-6 max-w-8xl px-4 pb-12 sm:px-6">
        {resultCount === 0 ? (
          <div className="grid min-h-[200px] place-items-center rounded-2xl border border-dashed border-gray-200 bg-white/60 p-10 text-center">
            <div>
              <p className="text-sm text-gray-600">Thử từ khóa khác hoặc truy cập danh mục bên trên.</p>
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

export default Home;
