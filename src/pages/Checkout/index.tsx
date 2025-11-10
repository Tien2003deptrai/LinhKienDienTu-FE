// Design Inspiration: https://tailwindui.com/img/components/checkout-pages.01-with-order-summary-sidebar-xl.png
// https://bbbootstrap.com/snippets/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";

import CheckoutItems from "./CheckoutItems";
import ShippingForm from "./ShippingForm";
import Card from "./Card";
import { ErrorModal, SuccessModal, InfoModal } from "../../components/Modals";

type Props = {};

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

    // For frontend demo, we'll just show a success message
    setShowSuccessModal(true);
  };

  return (
    <div className="-mb-52 bg-gray-300">
      <InfoModal
        isOpen={showInfoModal}
        onClose={setShowInfoModal}
        text="Please fill all the required fields"
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={setShowSuccessModal}
        text="Order placed successfully"
      />
      <ErrorModal
        isOpen={showErrorModal}
        onClose={setShowErrorModal}
        text="Something went wrong, please try again."
      />
      <div className="sm:py-1 md:py-12">
        <div className="container mx-auto rounded-lg bg-gray-100 shadow-lg">
          {/* <!-- Checkout header --> */}
          <div className="flex items-center justify-center border-b-2 border-gray-200 py-4">
            <HiBars3BottomLeft className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-bold">Checkout</h1>
          </div>
          <div className="flex flex-col gap-10 p-5 md:flex-row">
            {/* <!-- Left side --> */}
            <div className="w-full md:w-2/3">
              <CheckoutItems />
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
            {/* <!-- Right side --> */}
            <div className="w-full md:w-1/3">
              <Card onCheckout={onCheckout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
