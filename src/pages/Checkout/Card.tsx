import React from "react";

import mastercardlogo from "../../assets/mastercardlogo.png";

type Props = {
  onCheckout: CallableFunction;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
};

const Card = ({ onCheckout, subtotal, shippingCost, tax, total }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin thanh toán</h2>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Tóm tắt đơn hàng</h3>

          <div className="space-y-3 bg-gray-50 rounded-lg p-4">
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

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Phương thức thanh toán</h3>

          <div className="space-y-3">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer">
              <input
                type="radio"
                id="credit-card"
                name="payment-method"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                defaultChecked
              />
              <label htmlFor="credit-card" className="ml-3 flex items-center w-full cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-800 font-bold text-sm">VISA</span>
                </div>
                <span className="font-medium text-gray-900">Thẻ tín dụng/ghi nợ</span>
                <div className="ml-auto flex">
                  <img src={mastercardlogo} alt="Mastercard" className="h-6 w-6 ml-2" />
                </div>
              </label>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer">
              <input
                type="radio"
                id="bank-transfer"
                name="payment-method"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="bank-transfer" className="ml-3 flex items-center w-full cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Chuyển khoản ngân hàng</span>
              </label>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer">
              <input
                type="radio"
                id="cod"
                name="payment-method"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="cod" className="ml-3 flex items-center w-full cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Thanh toán khi nhận hàng</span>
              </label>
            </div>
          </div>
        </div>

        {/* Card Details Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên trên thẻ</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số thẻ</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="**** **** **** ****"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="MM"
                />
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="YYYY"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="***"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <button
          onClick={() => onCheckout()}
          className="w-full rounded-xl bg-indigo-600 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
        >
          Đặt hàng
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          Bằng việc đặt hàng, bạn đồng ý với <a href="#" className="text-indigo-600 hover:underline">Điều khoản sử dụng</a> của chúng tôi
        </p>
      </div>
    </div>
  );
};

export default Card;
