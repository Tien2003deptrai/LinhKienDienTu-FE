import React, { useState } from "react";

type Props = {
  product: any;
};

const ItemVar2 = ({ product }: Props) => {
  const [amount, setAmount] = useState(1);

  const onDelete = (_: React.MouseEvent<HTMLButtonElement>): void => {
    // For frontend only, we'll just show an alert
    alert("This is a frontend demo. No actual cart functionality.");
  };

  const onDecrement = (_: React.MouseEvent<HTMLButtonElement>): void => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const onIncrement = (_: React.MouseEvent<HTMLButtonElement>): void => {
    // Increment the amount related to id
    // Guard against overflowing max-in-stock value
    setAmount((prev) => prev + 1);
  };

  if (!product)
    return (
      <div className="flex items-center justify-center">
        <span className="text-xs font-medium">Product not found</span>
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row">
      <div className="flex-shrink-0">
        <img
          src={product.imgLink}
          alt={product.name}
          className="h-32 w-32 rounded-lg object-cover"
        />
      </div>

      <div className="flex w-full flex-col justify-between md:w-2/3">
        <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">
              <em className="not-italic text-gray-700">
                Sold by {product.seller}
              </em>
            </p>
          </div>
          <div className="text-lg font-bold text-indigo-600">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Số lượng:</span>
            <div className="flex items-center">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-l-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                onClick={onDecrement}
              >
                -
              </button>
              <span className="flex h-8 w-12 items-center justify-center border-y border-gray-300 bg-white text-sm">
                {amount}
              </span>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-r-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                onClick={onIncrement}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-600 hover:text-white"
              onClick={onDelete}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemVar2;
