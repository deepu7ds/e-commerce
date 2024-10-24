import { getDiscountedPricePercentage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// todo types
const ProductCard = ({ p }: any) => {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image width={500} height={500} src={p.thumbnail.url} alt={p.name} />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-xl font-semibold">{p.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-sm font-bold">&#8377;{p.price}</p>

          {p.original_price && (
            <>
              {p.original_price != p.price && (
                <p className="text-sm font-semibold line-through">
                  &#8377;{p.original_price}
                </p>
              )}
              {getDiscountedPricePercentage(p.original_price, p.price) > 0 && (
                <p className="ml-auto text-base font-medium text-green-500">
                  {getDiscountedPricePercentage(p.original_price, p.price)}% off
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
