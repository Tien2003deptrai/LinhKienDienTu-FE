import SingleOrder from "./SingleOrder";
import EmptyOrders from "./EmptyOrders";

type Props = {};

const Orders = (props: Props) => {
  // For frontend demo, we'll use sample data
  const orders = [
    {
      _id: "order1",
      items: [
        { name: "ASUS Prime B550M-A", price: 129.99, quantity: 1 },
        { name: "Adapter Sạc Nhanh 65W", price: 19.99, quantity: 2 }
      ],
      total: 169.97,
      date: "2023-05-15",
      status: "Delivered"
    },
    {
      _id: "order2",
      items: [
        { name: "Hub USB-C 7-in-1", price: 39.99, quantity: 1 }
      ],
      total: 39.99,
      date: "2023-05-10",
      status: "Shipped"
    }
  ];

  return orders.length === 0 ? (
    <EmptyOrders />
  ) : (
    <section className="-mb-52 min-h-screen space-y-20 divide-y-2 bg-gray-100 p-10">
      {orders.map((order) => (
        <div className="pt-20" key={order._id}>
          <SingleOrder order={order} />
        </div>
      ))}
    </section>
  );
};

export default Orders;
