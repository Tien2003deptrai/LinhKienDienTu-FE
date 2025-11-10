type Props = {
  item: any;
  shippingDetails: any;
  paymentDetails: any;
};

const OrderItem = ({ item }: Props) => {
  return (
    <div className="rounded-lg bg-white p-7 tracking-wide outline-8 drop-shadow">
      <div className="flex gap-5">
        {/* Product Image */}
        <div className="my-auto w-1/2 lg:mr-8 lg:w-1/4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
        </div>
        {/* Product Details */}
        <div className="w-3/4 space-y-3">
          <h3 className="text-lg font-bold text-gray-700">{item.name}</h3>
          <p className="tracking-wider text-gray-700">${item.price}</p>
          <p className="text-gray-500">Quantity: {item.quantity}</p>
        </div>
        {/* Delivery Address */}
        <div className="w-1/2 text-gray-500 lg:w-1/3">
          <h3 className="mb-2 text-lg font-bold text-gray-700">
            Delivery Address
          </h3>
          <p>123 Example Street</p>
          <p>Ho Chi Minh City, Vietnam</p>
        </div>
        {/* Shipping Updates */}
        <div className="w-1/2 space-y-2 text-gray-500 lg:w-1/3">
          <h3 className="mb-2 text-lg font-bold text-gray-700">
            Shipping Updates
          </h3>
          <p>Nguyễn Văn A</p>
          <p>+84 123 456 789</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
