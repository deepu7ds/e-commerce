"use client";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { addToCart } from "@/store/cartSlice";
import { toast } from "react-toastify";
import { API_URL, STRAPI_API_TOKEN } from "@/lib/url";
import { useState } from "react";

const AddToCart = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const notify = () => {
    toast.success("Added. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notifyOutOfStock = () => {
    toast.error("Product is out of stock!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + STRAPI_API_TOKEN,
      },
    };

    const res = await fetch(
      `${API_URL}${`/api/products?filters[slug][$eq]=${product.slug}&populate=*`}`,
      {
        ...options,
        cache: "no-store",
      }
    );
    const data = await res.json();

    if (data.data[0].original_price == "20000") {
      setLoading(false);
      notifyOutOfStock();
    } else {
      dispatch(
        addToCart({
          ...product,
          oneQuantityPrice: product.price,
        })
      );

      notify();
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleAddToCart} loading={loading}>
      Add to Cart
    </Button>
  );
};

export default AddToCart;
