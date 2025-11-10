import ItemVar2 from "../../components/ShopItems/ItemVar2";
import Summary from "./Summary";
import EmptyCart from "./EmptyCart";

import electronicsData from "../../data/electronicsData.json";

type Props = {};

const Cart = (props: Props) => {
  // For frontend demo, we'll just use the first few products
  const cartItems = electronicsData.slice(0, 3);

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <section className="p-5">
      <h1 className="mt-24 mb-10 text-4xl font-thin">Your Cart</h1>
      {/* Contains cart items and order summary horizontally */}
      <div className="container mx-auto flex flex-col justify-between lg:flex-row">
        {/* Contains cart items */}
        <div className="mb-12 flex flex-col items-center gap-2 lg:w-2/3 lg:items-start lg:gap-9 ">
          {cartItems.map((product) => (
            <>
              <ItemVar2 key={product._id} product={product} />
              <hr className="lg:w-full" />
            </>
          ))}
        </div>
        {/* Contains order summary */}
        <div className="w-full xl:w-1/2">
          <Summary />
        </div>
      </div>
    </section>
  );
};

export default Cart;
