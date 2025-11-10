import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../../data/electronicsData.json";

/* ---------- helpers ---------- */
const currency = (n: number) =>
  (Number(n) || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const clamp = (n: number, min: number = 0, max: number = 5) => Math.min(max, Math.max(min, n));

const readLocal = (key: string, fallback: any) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeLocal = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { }
};

/* ---------- tiny components ---------- */
function Stars({ value = 0, size = "sm", className = "" }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const sz = size === "lg" ? "w-5 h-5" : size === "xl" ? "w-6 h-6" : "w-4 h-4";
  const star = (fill: string) => (
    <svg className={`${sz}`} viewBox="0 0 20 20" fill={fill} key={Math.random()}>
      <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
    </svg>
  );
  const halfStar = (
    <div className="relative inline-block" key="half">
      <svg className={`${sz}`} viewBox="0 0 20 20" fill="#e5e7eb">
        <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
      </svg>
      <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
        <svg className={`${sz}`} viewBox="0 0 20 20" fill="#f59e0b">
          <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      </div>
    </div>
  );
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: full }).map(() => star("#f59e0b"))}
      {half ? halfStar : null}
      {Array.from({ length: empty }).map(() => star("#e5e7eb"))}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
      {children}
    </span>
  );
}

function Section({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

/* ---------- gallery ---------- */
function ThumbGallery({ images = [], name = "" }: { images: string[]; name: string }) {
  const safeImages = images.length ? images : ["/placeholder.png"];
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
        <img
          src={safeImages[active]}
          alt={name}
          className="h-80 w-full object-cover sm:h-96"
          loading="lazy"
        />
      </div>

      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {safeImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-lg ring-2 transition
                ${active === i ? "ring-indigo-500" : "ring-transparent hover:ring-gray-300"}`}
            >
              <img
                src={src}
                alt={`${name} - ${i + 1}`}
                className="h-20 w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- reviews ---------- */
function ReviewForm({ onSubmit }: { onSubmit: (r: any) => void }) {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!content.trim()) return;
        onSubmit({ rating: clamp(rating), author: author || "Ẩn danh", content, createdAt: new Date().toISOString() });
        setAuthor("");
        setContent("");
        setRating(5);
      }}
    >
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Đánh giá:</label>
        <select
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} sao</option>)}
        </select>
      </div>

      <input
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        placeholder="Tên (tuỳ chọn)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <textarea
        className="min-h-[90px] rounded-lg border border-gray-300 px-3 py-2 text-sm"
        placeholder="Chia sẻ cảm nhận của bạn…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex justify-end">
        <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          Gửi đánh giá
        </button>
      </div>
    </form>
  );
}

function ReviewItem({ r }: { r: any }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <Stars value={r.rating} />
        <span className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString("vi-VN")}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-900">{r.author || "Ẩn danh"}</p>
      <p className="mt-1 text-sm text-gray-700">{r.content}</p>
    </div>
  );
}

function ReviewList({ productId, seed = [] }: { productId: string; seed?: any[] }) {
  const lcKey = `reviews:${productId}`;
  const [list, setList] = useState(() => readLocal(lcKey, seed));

  useEffect(() => {
    // nếu data.json có thay đổi seed, merge 1 lần
    const current = readLocal(lcKey, []);
    if (!current || current.length === 0) writeLocal(lcKey, seed);
    // eslint-disable-next-line
  }, [productId]);

  const merged = readLocal(lcKey, seed);

  const avg = merged.length
    ? merged.reduce((s: number, x: any) => s + clamp(Number(x.rating)), 0) / merged.length
    : 0;

  const addReview = (r: any) => {
    const next = [r, ...merged];
    writeLocal(lcKey, next);
    setList(next);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Stars value={avg} size="lg" />
          <span className="text-sm text-gray-600">({merged.length} đánh giá) • Trung bình {avg.toFixed(1)}/5</span>
        </div>
      </div>

      <ReviewForm onSubmit={addReview} />

      <div className="grid gap-3">
        {merged.length ? merged.map((r: any, i: number) => <ReviewItem key={i} r={r} />) : (
          <p className="text-sm text-gray-500">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Q&A ---------- */
function QASection({ productId }: { productId: string }) {
  const lcKey = `qa:${productId}`;
  const [list, setList] = useState(() => readLocal(lcKey, []));
  const [q, setQ] = useState("");

  const ask = () => {
    if (!q.trim()) return;
    const item = { q, a: null, createdAt: new Date().toISOString() };
    const next = [item, ...list];
    setList(next);
    writeLocal(lcKey, next);
    setQ("");
  };

  const answer = (idx: number, a: any) => {
    const next = list.map((it: any, i: number) => (i === idx ? { ...it, a, answeredAt: new Date().toISOString() } : it));
    setList(next);
    writeLocal(lcKey, next);
  };

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Đặt câu hỏi về sản phẩm…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={ask} className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">
          Hỏi
        </button>
      </div>

      <div className="grid gap-3">
        {list.length ? list.map((it: any, i: number) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm font-medium text-gray-900">Hỏi: {it.q}</p>
            {it.a ? (
              <p className="mt-1 text-sm text-emerald-700">• Trả lời: {it.a}</p>
            ) : (
              <div className="mt-2 flex gap-2">
                <input
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Nhập câu trả lời (demo offline)…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      answer(i, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Pill>Mới</Pill>
              </div>
            )}
          </div>
        )) : <p className="text-sm text-gray-500">Chưa có câu hỏi nào.</p>}
      </div>
    </div>
  );
}

/* ---------- Related ---------- */
function RelatedGrid({ currentId, category }: { currentId: string; category: string }) {
  const items = data
    .filter((p) => p.category === category && p._id !== currentId)
    .slice(0, 4);

  if (!items.length) return null;

  return (
    <Section title="Sản phẩm liên quan">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <Link
            to={`/product/${p._id}`}
            key={p._id}
            className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
              <img src={p.images?.[0] || p.imgLink} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-3">
              <p className="line-clamp-2 font-semibold text-gray-900 group-hover:text-indigo-600">{p.name}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-indigo-600 font-bold">
                  {(Number(p.price) || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </span>
                <span className="text-xs text-gray-500">{p.inStock > 0 ? `Còn ${p.inStock}` : "Hết hàng"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ---------- MAIN PAGE ---------- */
export default function ProductDetail() {
  const { id } = useParams();
  const product = useMemo(() => data.find((p) => p._id === id), [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 p-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Không tìm thấy sản phẩm</h1>
          <p className="mt-1 text-gray-600">Mã sản phẩm: {id}</p>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              ← Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : (product.imgLink ? [product.imgLink] : []);
  const specs = product.specs || {};
  const seedReviews = product.reviews || [] as any[]; // từ data.json nếu có
  const avgSeed = product.avgRating || 0 as number; // từ data.json nếu có

  // sticky quick box (desktop)
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Header */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-2">
            <Stars value={avgSeed} />
            <span className="text-sm text-gray-600">{avgSeed ? `${avgSeed.toFixed(1)}/5` : "Chưa có rating"}</span>
            <Pill>{product.inStock > 0 ? `Còn hàng: ${product.inStock}` : "Hết hàng"}</Pill>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Gallery + tabs */}
          <div className="space-y-6">
            <ThumbGallery images={images} name={product.name} />

            {/* Tabs: mô tả / thông số / Q&A / review */}
            <Section
              title="Thông tin sản phẩm"
              right={
                <div className="hidden rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 sm:block">
                  Hỗ trợ đổi trả 7 ngày
                </div>
              }
            >
              <div className="grid gap-6">
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">Mô tả</h4>
                  <p className="text-gray-700">{product.desc}</p>
                </div>

                {Object.keys(specs).length > 0 && (
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">Thông số kỹ thuật</h4>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      <table className="w-full text-left text-sm">
                        <tbody>
                          {Object.entries(specs).map(([k, v]) => (
                            <tr key={k} className="odd:bg-white even:bg-gray-50">
                              <th className="w-1/3 px-4 py-2 font-medium text-gray-600">{k}</th>
                              <td className="px-4 py-2 text-gray-900">{String(v)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div>
                  <Section title="Đánh giá & Nhận xét">
                    <ReviewList productId={product._id} seed={seedReviews} />
                  </Section>
                </div>
              </div>
            </Section>

            <RelatedGrid currentId={product._id} category={product.category} />
          </div>

          {/* Sticky Buy Box */}
          <div className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">Giá bán</p>
                  <p className="mt-1 text-3xl font-extrabold text-indigo-600">{currency(product.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Nhà bán</p>
                  <p className="mt-1 font-semibold text-gray-900">{product.seller}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Số lượng</span>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                    className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Miễn phí vận chuyển đơn từ 500.000đ • Giao nhanh 2h nội thành (tuỳ khu vực)
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <button
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                  onClick={() => alert(`(Demo) Thêm ${qty} sản phẩm vào giỏ`)}
                >
                  Thêm vào giỏ
                </button>
                <button
                  className="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-black"
                  onClick={() => alert("(Demo) Mua ngay")}
                >
                  Mua ngay
                </button>
              </div>

              <div className="mt-5 grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span>Bảo hành chính hãng</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span>Đổi trả trong 7 ngày nếu lỗi nhà sản xuất</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span>Hỗ trợ kỹ thuật miễn phí</span>
                </div>
              </div>
            </div>
          </div>
        </div>{/* /Main grid */}
      </div >
    </div >
  );
}
