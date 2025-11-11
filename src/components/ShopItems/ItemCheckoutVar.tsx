import React from "react";

type Props = {
  product: any;
  quantity?: number;
};

const ItemCheckoutVar = ({ product, quantity = 1 }: Props) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="flex items-center">
        <img
          src={product.imgLink}
          alt={product.name}
          className="h-16 w-16 rounded-lg object-cover"
        />
        <div className="ml-4">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">#{product._id.slice(-5)}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Số lượng:</span>
          <span className="font-medium text-gray-900">{quantity}</span>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
          </p>
          {quantity > 1 && (
            <p className="text-xs text-gray-500">
              Tổng: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price * quantity)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCheckoutVar;
