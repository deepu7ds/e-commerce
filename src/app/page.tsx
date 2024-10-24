import HeroBanner from "@/component/HeroBanner";
import Wrapper from "@/component/Wrapper";
import ProductCard from "@/component/ProductCard";
import { fetchDataFromApi } from "@/lib/api";
import CategoriesDetailCarousal from "@/component/CategoriesCarousel";

export default async function Home() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const categories = await fetchDataFromApi("/api/categories?populate=*");

  return (
    <main>
      <HeroBanner />
      <Wrapper>
        {/* categories */}
        <div className="flex flex-col gap-10">
          <div>
            {/* heading for categories */}
            <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
              <div className="text-lg md:text-2xl mb-3 md:mb-5 font-semibold leading-tight">
                O U R <span className="mx-2"></span>C A T E G O R I E S
              </div>
              <div className="text-sm md:text-xl">
                Discover the Latest Trends and Timeless Classics in Fashion
              </div>
            </div>
            {/* heading and paragraph end */}

            {/* categories grid */}
            <CategoriesDetailCarousal categories={categories} />
          </div>

          {/* trendy Porducts */}

          <div>
            {/* heading for products */}

            <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
              <div className="text-lg md:text-2xl mb-3 md:mb-5 font-semibold leading-tight">
                T R E N D Y <span className="mx-2"></span>P R O D U C T
              </div>
              <div className="text-md md:text-xl">
                Discover the Latest Trends and Timeless Classics in Fashion
              </div>
            </div>

            {/* products grid start */}

            {/* todo  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {/* todo add types */}
              {products?.data?.map((product) => (
                <ProductCard key={product?.id} p={product} />
              ))}
            </div>
            {/* products grid end */}
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
