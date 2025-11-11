import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { BsFillQuestionCircleFill } from "react-icons/bs";

import Tooltip from "../../components/Tooltip";

type Props = {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
};

const Summary = ({ subtotal, shippingCost, tax, total }: Props) => {
  const navigate = useNavigate();

  // Calculate discount (10% off for orders over 2M VND)
  const discount = subtotal > 2000000 ? subtotal * 0.1 : 0;
  const finalTotal = total - discount;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Tóm tắt đơn hàng</h3>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính</span>
          <span className="font-medium text-gray-900">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Khuyến mãi</span>
            <span className="font-medium text-green-600">
              -{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">
            Phí vận chuyển
            <Tooltip text="Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ">
              <BsFillQuestionCircleFill className="ml-1 inline align-text-top text-gray-400" />
            </Tooltip>
          </span>
          <span className="font-medium text-gray-900">
            {shippingCost > 0
              ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(shippingCost)
              : "Miễn phí"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Thuế (10%)</span>
          <span className="font-medium text-gray-900">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tax)}
          </span>
        </div>

        <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
          <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
          <div className="text-right">
            {discount > 0 && (
              <p className="text-sm text-gray-500 line-through">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)}
              </p>
            )}
            <span className="text-xl font-bold text-indigo-600">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(finalTotal)}
            </span>
          </div>
        </div>
      </div>

      <button
        className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
        onClick={() => navigate("/checkout")}
      >
        Tiến hành thanh toán
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          hoặc tiếp tục mua sắm <Link to="/" className="text-indigo-600 hover:text-indigo-800">tại đây</Link>
        </p>
      </div>
    </div>
  );
};

export default Summary;
