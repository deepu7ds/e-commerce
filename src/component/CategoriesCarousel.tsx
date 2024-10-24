"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Image from "next/image";

const CategoriesDetailCarousal = ({ categories }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="">
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
      >
        {categories?.data?.map((category) => (
          <>
            <Link
              href={`/category/${category.slug}`}
              className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
            >
              <Image
                width={500}
                height={500}
                src={category.thumbnail.url}
                alt={category.name}
              />
              <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg font-bold text-center">
                  {category.name}
                </h2>
                <div className="flex items-center text-black/[0.5]"></div>
              </div>
            </Link>
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoriesDetailCarousal;
