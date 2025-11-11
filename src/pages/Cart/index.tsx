import React, { useState } from "react";
import { Link } from "react-router-dom";

import Summary from "./Summary";
import EmptyCart from "./EmptyCart";

import electronicsData from "../../data/electronicsData.json";

type Props = {};

// Cart item type
interface CartItem {
  product: any;
  quantity: number;
}

const Cart = (props: Props) => {
  // For frontend demo, we'll use the first few products with random quantities
  const initialCartItems: CartItem[] = electronicsData
    .slice(0, 3)
    .map(product => ({
      product,
      quantity: Math.floor(Math.random() * 3) + 1 // Random quantity between 1-3
    }));

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  const shippingCost = subtotal > 1000000 ? 0 : 30000; // Free shipping over 1M VND
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  // Update item quantity
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.product._id !== productId)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="min-h-screen bg-gray-50 my-20">
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
          <p className="text-gray-600 mt-1">Quản lý các sản phẩm bạn muốn mua</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Cart items */}
          <div className="flex-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {cartItems.length} sản phẩm trong giỏ hàng
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product._id}
                    className="flex flex-col gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0 md:flex-row"
                  >
                    {/* Product image */}
                    <div className="flex-shrink-0">
                      <img
                        src={product.imgLink}
                        alt={product.name}
                        className="h-24 w-24 rounded-lg object-cover md:h-32 md:w-32"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-1">
                      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">Sold by {product.seller}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-indigo-600">
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Số lượng:</span>
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(product._id, quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-l-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="flex h-8 w-12 items-center justify-center border-y border-gray-300 bg-white text-sm">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product._id, quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-r-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-sm font-medium text-gray-900">
                            Tổng: <span className="font-bold">
                              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price * quantity)}
                            </span>
                          </p>
                          <button
                            onClick={() => removeItem(product._id)}
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue shopping */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-96">
            <div className="sticky top-6">
              <Summary
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                total={total}
              />

              {/* Shopping benefits */}
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lợi ích khi mua hàng</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Đổi trả trong 30 ngày nếu sản phẩm lỗi</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hỗ trợ kỹ thuật 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
