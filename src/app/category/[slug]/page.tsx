import Wrapper from "@/component/Wrapper";
import ProductCard from "@/component/ProductCard";
import { fetchDataFromApi } from "@/lib/api";
import Link from "next/link";
import { replaceHyphensWithSpaces } from "@/lib/utils";

const maxResult = 3;

const Category = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string; sort?: string };
}) => {
  const { slug } = params;

  const category = replaceHyphensWithSpaces(slug);

  // Determine the current page from the search parameters, default to 1
  const pageIndex = searchParams.page ? parseInt(searchParams.page) : 1;

  // Determine the sorting order from the search parameters, default to ascending
  const sortOrder = searchParams.sort === "desc" ? "desc" : "asc";

  // Fetch data for the current page with sorting
  const data = await fetchDataFromApi(
    `/api/products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}&sort[price]=${sortOrder}`
  );

  return (
    <div className="w-full md:pt-10 md:pb-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold uppercase leading-tight">
            {category}
          </div>
          <div>
            <Link
              href={`/category/${slug}?page=${pageIndex}&sort=asc`}
              className={`border p-2 rounded ${
                sortOrder === "asc" ? "bg-gray-200" : ""
              }`}
            >
              Price: Low to High
            </Link>
            <Link
              href={`/category/${slug}?page=${pageIndex}&sort=desc`}
              className={`border p-2 rounded ${
                sortOrder === "desc" ? "bg-gray-200" : ""
              }`}
            >
              Price: High to Low
            </Link>
          </div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {data?.data?.map((product: any) => (
            <ProductCard key={product?.id} p={product} />
          ))}
        </div>
        {/* products grid end */}

        {/* PAGINATION BUTTONS START */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            {pageIndex > 1 && (
              <Link
                href={`/category/${slug}?page=${
                  pageIndex - 1
                }&sort=${sortOrder}`}
                className="rounded py-2 px-4 bg-black text-white"
              >
                Previous
              </Link>
            )}

            <span className="font-bold">{`${pageIndex} of ${data.meta.pagination.pageCount}`}</span>

            {pageIndex < data.meta.pagination.pageCount && (
              <Link
                href={`/category/${slug}?page=${
                  pageIndex + 1
                }&sort=${sortOrder}`}
                className="rounded py-2 px-4 bg-black text-white"
              >
                Next
              </Link>
            )}
          </div>
        )}
        {/* PAGINATION BUTTONS END */}
      </Wrapper>
    </div>
  );
};

export default Category;

export async function generateStaticParams() {
  const categoriesResponse = await fetchDataFromApi(
    `/api/categories?populate=*`
  );

  const slugs = categoriesResponse.data.map((category: any) => ({
    slug: category.slug,
  }));

  return slugs;
}
