import React from "react";
import { useNavigate } from "react-router-dom";

import { BsFillQuestionCircleFill } from "react-icons/bs";

import Tooltip from "../../components/Tooltip";

type Props = {};

const Summary = (props: Props) => {
  const navigate = useNavigate();

  // For frontend demo, we'll use fixed values
  const subtotal = 129.97;
  const shippingCost = 5.99;
  const tax = 13.00;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="mx-auto flex min-w-fit flex-col rounded-xl bg-gray-100 p-8 lg:w-3/4">
      <h3 className="text-2xl font-bold text-gray-700">Order Summary</h3>
      <div className="mt-4 flex flex-col">
        <div className="divide-y">
          <div className="flex justify-between py-4">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold text-gray-600">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-500">
              Shipping estimate
              <Tooltip text="Calculated based on your shipping address.">
                <BsFillQuestionCircleFill className="ml-2 inline align-text-top" />
              </Tooltip>
            </span>
            <span className="font-bold text-gray-600">
              ${shippingCost.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-500">Tax</span>
            <span className="font-bold text-gray-600">${tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-between border-t-2 pt-4">
          <span className="text-xl">Total</span>
          <span className="text-xl font-bold text-gray-800">
            ${total.toFixed(2)}
          </span>
        </div>
        <button
          className="mt-8 rounded-xl bg-blue-600 py-3 text-lg font-bold text-white hover:bg-blue-700"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Summary;
