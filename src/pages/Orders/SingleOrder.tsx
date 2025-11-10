import { AiOutlineArrowRight } from "react-icons/ai";

import OrderItem from "./OrderItem";

type Props = {
  order: any;
};

const SingleOrder = ({ order }: Props) => {
  return (
    <div className="container mx-auto">
      <div className="mb-12 flex items-baseline justify-between font-bold">
        <div>
          <h1 className="inline-block text-4xl text-gray-800">
            Order #{order._id}
          </h1>
          <p className="ml-4 inline-block cursor-pointer text-blue-600">
            <span>View Invoice</span>
            <AiOutlineArrowRight className="ml-2 inline-block" />
          </p>
        </div>
        <p className="text-gray-700">
          <span className="font-extralight">Order Placed</span>{" "}
          {new Date(order.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {order.items.map((item: any, i: number) => (
          <OrderItem
            key={`Order${i}`}
            item={item}
            shippingDetails={{}}
            paymentDetails={{}}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleOrder;
