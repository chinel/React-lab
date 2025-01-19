import React from "react";
import { Metadata } from "next";

// // Optional: Define metadata for the page
// export const metadata: Metadata = {
//   title: "Product Page",
//   description: "Details about the product",
// };
interface Props {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ sortBy?: string }>; // Include all expected query parameters as optional.
}

const ProductPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { sortBy } = await searchParams;

  return (
    <div>
      <h1>Product Page</h1>
      <p>Slug: {slug}</p>
      <p>Sort By: {sortBy ?? "none"}</p>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetch("someurl"); /// fetch from the api or from prisma if you are using prisma

  const product = await result.json();
  return {
    title: product.name,
    description: product.description,
  };
}
