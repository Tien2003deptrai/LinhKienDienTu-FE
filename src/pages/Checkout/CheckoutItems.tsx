import React from "react";
import { useNavigate } from "react-router-dom";

import ItemCheckoutVar from "../../components/ShopItems/ItemCheckoutVar";

// Cart item type
interface CartItem {
  product: any;
  quantity: number;
}

type Props = {
  cartItems: CartItem[];
};

const CheckoutItems = ({ cartItems }: Props) => {
  const navigate = useNavigate();

  // Calculate totals based on cart items
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  const shippingCost = subtotal > 1000000 ? 0 : 30000; // Free shipping over 1M VND
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  return (
    <div className="space-y-4">
      {/* Cart Items Here */}
      <div className="space-y-4">
        {cartItems.map(({ product, quantity }) => (
          <ItemCheckoutVar
            key={product._id}
            product={product}
            quantity={quantity}
          />
        ))}
      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tạm tính</span>
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Phí vận chuyển</span>
            <span className="font-medium text-gray-900">
              {shippingCost > 0
                ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(shippingCost)
                : "Miễn phí"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Thuế (10%)</span>
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tax)}
            </span>
          </div>

          <div className="flex justify-between text-base font-semibold pt-3 border-t border-gray-200">
            <span className="text-gray-900">Tổng cộng</span>
            <span className="text-indigo-600">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutItems;
