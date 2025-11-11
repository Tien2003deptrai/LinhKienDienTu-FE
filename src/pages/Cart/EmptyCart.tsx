import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const EmptyCart = (props: Props) => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">
              <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Giỏ hàng của bạn đang trống!
            </h2>

            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy tiếp tục mua sắm để tìm sản phẩm bạn yêu thích.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/")}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                Tiếp tục mua sắm
              </button>

              <button
                onClick={() => navigate("/mainboard")}
                className="rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Xem danh mục Mainboard
              </button>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tại sao nên mua sắm với chúng tôi?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="mt-3 font-medium text-gray-900">Sản phẩm chính hãng</h4>
                  <p className="mt-1 text-sm text-gray-500">Cam kết 100% hàng chính hãng, bảo hành đầy đủ</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="mt-3 font-medium text-gray-900">Giá cả cạnh tranh</h4>
                  <p className="mt-1 text-sm text-gray-500">Giá tốt nhất thị trường, nhiều chương trình khuyến mãi</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="mt-3 font-medium text-gray-900">Hỗ trợ 24/7</h4>
                  <p className="mt-1 text-sm text-gray-500">Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmptyCart;
