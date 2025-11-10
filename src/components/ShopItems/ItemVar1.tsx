import React from "react";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import shoppingBag from "../../assets/shopping_bag.png";

type Props = {
  product: any;
};

const ItemVar1 = ({ product }: Props) => {
  const [amount, setAmount] = React.useState(0);
  const [readMore, setReadMore] = React.useState(false);
  const description = readMore
    ? product.desc
    : product.desc.slice(0, 80) + "...";

  if (!product)
    return (
      <div className="flex items-center justify-center">
        <span className="text-xs font-medium">Product not found</span>
      </div>
    );

  const onDecrement = (_: React.MouseEvent<HTMLDivElement>): void => {
    setAmount((amount: number) => (amount <= 0 ? 0 : amount - 1));
  };

  const onIncrement = (_: React.MouseEvent<HTMLDivElement>): void => {
    // Increment the amount related to id
    // Guard against overflowing max-in-stock value
    setAmount((amount: number) => amount + 1);
  };

  const onAddToCart = (): void => {
    // For frontend only, we'll just show an alert
    alert("This is a frontend demo. No actual cart functionality.");
  };

  return (
    <div className="mb-6 lg:mb-0">
      <div className="relative block h-full rounded-lg bg-white shadow-lg">
        <div className="flex">
          <div
            className="mx-4 -mt-4 h-52 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg xl:h-56"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            style={{
              backgroundImage: `url(${product.imgLink})`,
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="p-6">
          <h5 className="text-lg font-bold">{product.name}</h5>
          <p className="pb-4 text-gray-500">
            <small>
              <em className="block italic text-gray-900">
                Sold by {product.seller}
              </em>
              Price
              <span className="ml-2 inline-block pt-1 text-lg">
                <u>${product.price}</u>
              </span>
            </small>
          </p>
          <p className="pb-6">
            {description}
            <span
              className="block cursor-pointer text-sm italic text-blue-800 underline"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? (
                <span>
                  Hide
                  <BiHide className="ml-1 inline" />
                </span>
              ) : (
                <span>
                  Read More
                  <BiShowAlt className="ml-1 inline" />
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="relative pt-10 xl:pt-20">
        <div className="absolute inset-x-0 bottom-12 flex flex-col gap-3 px-5 xl:bottom-24 xl:gap-5">
          <div className="flex justify-center gap-8 xl:justify-between">
            <img src={shoppingBag} className="w-8 xl:w-10" />
            <div className="flex items-center gap-8 rounded-xl border-2 xl:px-5">
              <div className="cursor-pointer" onClick={onDecrement}>
                <AiOutlineMinus />
              </div>
              <span>{amount}</span>
              <div className="cursor-pointer" onClick={onIncrement}>
                <AiOutlinePlus />
              </div>
            </div>
          </div>
          <button
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="mx-auto inline-block w-72 rounded-xl border-2 px-2 py-2.5 text-xs font-medium uppercase leading-tight text-gray-800 shadow-md transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg md:w-full lg:px-3"
            onClick={onAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemVar1;
