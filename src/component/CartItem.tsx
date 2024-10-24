import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const CartItem = ({ data }) => {
  const p = data;

  const dispatch = useDispatch();

  const updateCartItem = (key, value) => {
    let payload = {
      key,
      val: value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };

  const decrementQuantity = () => {
    if (data.quantity > 1) {
      console.log("hi");
      updateCartItem("quantity", data.quantity - 1);
    } else {
      dispatch(removeFromCart({ id: data.id }));
    }
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <Link href={`/product/${p.slug}`}>
        <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
          <Image src={p.thumbnail.url} alt={p.name} width={120} height={120} />
        </div>
      </Link>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <Link href={`/product/${p.slug}`}>
            <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
              {p.name}
            </div>
          </Link>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {p.subtitle}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377;{p.price}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {p.subtitle}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-bold">Quantity:</div>
              <button
                className="hover:text-black text-lg md:text-xl px-2 border"
                onClick={decrementQuantity}
              >
                -
              </button>
              <span className="text-lg font-semibold px-2">
                {data.quantity}
              </span>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => dispatch(removeFromCart({ id: data.id }))}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
