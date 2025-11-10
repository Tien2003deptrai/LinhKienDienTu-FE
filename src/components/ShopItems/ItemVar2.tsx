import React from "react";

type Props = {
  product: any;
};

const ItemVar2 = ({ product }: Props) => {
  const [amount, setAmount] = React.useState(1);

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
    <div className="flex w-full flex-col items-center gap-4 md:flex-row">
      <div
        className="h-48 w-64 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg"
        style={{
          backgroundImage: `url(${product.imgLink})`,
          backgroundPosition: "center",
        }}
      ></div>
      <div className="flex w-full flex-col justify-between md:w-2/3">
        <div className="mb-4 flex flex-col justify-between md:flex-row">
          <div>
            <h5 className="text-xl font-bold">{product.name}</h5>
            <p className="text-gray-500">
              <small>
                <em className="block italic text-gray-900">
                  Sold by {product.seller}
                </em>
              </small>
            </p>
          </div>
          <div className="mt-1 text-xl font-bold">${product.price}</div>
        </div>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                className="h-8 w-8 rounded-full bg-gray-200 text-xl"
                onClick={onDecrement}
              >
                -
              </button>
              <span>{amount}</span>
              <button
                className="h-8 w-8 rounded-full bg-gray-200 text-xl"
                onClick={onIncrement}
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-4 flex gap-4 md:mt-0">
            <button
              className="rounded-lg border-2 border-red-600 px-4 py-2 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
              onClick={onDelete}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemVar2;
