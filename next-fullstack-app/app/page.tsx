import Image from "next/image";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import TopImage from "@/public/images/top.jpeg";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import _ from "lodash";
import { authOptions } from "./api/auth/authOptions";

const HeavyComponent = dynamic(() => import("./components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
  // ssr: false,
});
// import HeavyComponent from "./components/HeavyComponent";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <h1 className="font-poppins">
        Hello {session && <span>{session?.user?.name}</span>}
      </h1>
      {/* <Image
        src={
          "https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg"
        }
        fill
        alt="Top Image"
      /> */}
      <HeavyComponent />
      <ProductCard />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page",
};
