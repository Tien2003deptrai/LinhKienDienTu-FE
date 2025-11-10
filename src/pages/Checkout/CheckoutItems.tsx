import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import ItemCheckoutVar from "../../components/ShopItems/ItemCheckoutVar";
import electronicsData from "../../data/electronicsData.json";

type Props = {};

const CheckoutItems = (props: Props) => {
  const navigate = useNavigate();

  // For frontend demo, we'll just use the first few products
  const items = electronicsData.slice(0, 3);
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shippingCost = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="max-w-4xl p-5">
      {/* Cart Items Here */}
      {items.map((product) => (
        <ItemCheckoutVar key={product._id} product={product} />
      ))}
      <div className="mt-6 flex items-center justify-between border-t pt-6">
        <div
          className="group flex cursor-pointer items-center duration-200 hover:scale-110"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="mr-2 text-blue-700 group-hover:text-blue-900" />
          <span className="text-md font-bold text-blue-500">
            Continue Shopping
          </span>
        </div>
        <div className="flex items-end justify-center">
          <span className="mr-1 text-lg font-thin text-gray-500">
            Subtotal:
          </span>
          <span className="px-1 text-lg font-bold text-gray-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>
      <small className="float-right text-red-900 opacity-80">
        + ${(tax + shippingCost).toFixed(2)} charges.
      </small>
    </div>
  );
};

export default CheckoutItems;
