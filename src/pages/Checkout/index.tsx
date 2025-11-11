// Design Inspiration: https://tailwindui.com/img/components/checkout-pages.01-with-order-summary-sidebar-xl.png
// https://bbbootstrap.com/snippets/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";

import CheckoutItems from "./CheckoutItems";
import ShippingForm from "./ShippingForm";
import Card from "./Card";
import { ErrorModal, SuccessModal, InfoModal } from "../../components/Modals";

import electronicsData from "../../data/electronicsData.json";

type Props = {};

// Cart item type
interface CartItem {
  product: any;
  quantity: number;
}

const Checkout = (props: Props) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState(0);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const cartItems: CartItem[] = electronicsData
    .slice(0, 3)
    .map(product => ({
      product,
      quantity: Math.floor(Math.random() * 3) + 1
    }));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  const shippingCost = subtotal > 1000000 ? 0 : 30000;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  const onCheckout = async () => {
    const shippingDetails = {
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      country,
      phone,
    };
    const formElem = document.getElementById(
      "shipping-form"
    ) as HTMLFormElement;
    if (!formElem?.reportValidity()) return setShowInfoModal(true);

    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 my-20">
      <InfoModal
        isOpen={showInfoModal}
        onClose={setShowInfoModal}
        text="Vui lòng điền đầy đủ thông tin bắt buộc"
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={setShowSuccessModal}
        text="Đặt hàng thành công! Cảm ơn bạn đã mua sắm."
      />
      <ErrorModal
        isOpen={showErrorModal}
        onClose={setShowErrorModal}
        text="Có lỗi xảy ra, vui lòng thử lại."
      />

      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <div className="mb-6">
          {/* <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Thanh toán</h1> */}
          <p className="text-gray-600 mt-1">Vui lòng kiểm tra lại thông tin đơn hàng và điền thông tin giao hàng</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left side - Shipping and Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
                  1
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Thông tin giao hàng</h2>
              </div>
              <ShippingForm
                setFirstName={setFirstName}
                setLastName={setLastName}
                setAddress={setAddress}
                setCity={setCity}
                setState={setState}
                setZip={setZip}
                setCountry={setCountry}
                setPhone={setPhone}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
                  2
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Đơn hàng của bạn</h2>
              </div>
              <CheckoutItems cartItems={cartItems} />
            </div>
          </div>

          {/* Right side - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-6">
              <Card
                onCheckout={onCheckout}
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                total={total}
              />

              <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chính sách mua hàng</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hoàn tiền 100% nếu sản phẩm lỗi</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Miễn phí đổi trả trong 30 ngày</span>
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
    </div>
  );
};

export default Checkout;
