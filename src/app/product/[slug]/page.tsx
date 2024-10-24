import ProductDetailsCarousel from "@/component/ProductDetailsCarousal";
import RelatedProducts from "@/component/RelatedProduct";
import Wrapper from "@/component/Wrapper";
import { fetchDataFromApi } from "@/lib/api";
import { getDiscountedPricePercentage } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import "react-toastify/dist/ReactToastify.css";
import AddToCart from "@/component/AddToCart";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const ProductDetails = async ({ params }) => {
  // const [product, setProduct] = useState(null);
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [selectedSize, setSelectedSize] = useState();
  // const [showError, setShowError] = useState(false);

  const { slug } = params;

  const productResponse = await fetchDataFromApi(
    `/api/products?filters[slug][$eq]=${slug}&populate=*`
  );

  const productsResponse = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$ne]=${slug}`
  );

  const p = productResponse.data[0];
  const products = productsResponse.data;

  const combinedDescription = p.description
    .map((item) => item.children.map((child) => child.text).join(""))
    .join("\n\n");

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p.image} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p.name}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5">{p.subtitle}</div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8377;{p.price}
              </p>
              {p.original_price && (
                <>
                  {p.original_price != p.price && (
                    <p className="text-base text-gray font-medium line-through">
                      &#8377;{p.original_price}
                    </p>
                  )}
                  {getDiscountedPricePercentage(p.original_price, p.price) >
                    0 && (
                    <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscountedPricePercentage(p.original_price, p.price)}%
                      off
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* PRODUCT SIZE RANGE START */}
            {/* <div className="mb-10"> */}
            {/* HEADING START */}
            {/* <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div> */}
            {/* HEADING END */}

            {/* SIZE START */}
            {/* <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p.size.data.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div> */}
            {/* SIZE END */}

            {/* SHOW ERROR START */}
            {/* {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )} */}
            {/* SHOW ERROR END */}
            {/* </div> */}
            {/* PRODUCT SIZE RANGE END */}

            {/* ADD TO CART BUTTON START */}
            <AddToCart product={p} />
            {/* ADD TO CART BUTTON END */}

            {/* WHISHLIST BUTTON START */}
            <Link href={"/checkout"}>
              <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Buy Now
              </button>
            </Link>
            {/* WHISHLIST BUTTON END */}

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                {/* todo */}
                {combinedDescription}
                {/* <ReactMarkdown>{p.description}</ReactMarkdown> */}
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>

        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function generateStaticParams({ params }) {
  const { slug } = params;
  const productsResponse = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$ne]=${slug}`
  );

  const slugs = productsResponse?.data?.map((product) => ({
    slug: product.slug,
  }));

  return slugs;
}
