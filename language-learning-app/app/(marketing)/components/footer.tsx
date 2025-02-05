import { Button } from "@/components/ui/button";
import Image from "next/image";

const countryMap = [
  {
    name: "Croatian",
    flag: "/hr.svg",
    code: "hr",
  },

  {
    name: "French",
    flag: "/fr.svg",
    code: "fr",
  },

  {
    name: "Italian",
    flag: "/it.svg",
    code: "it",
  },
  {
    name: "Spanish",
    flag: "/es.svg",
    code: "es",
  },
  {
    name: "Japan",
    flag: "/jp.svg",
    code: "jp",
  },
];

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        {countryMap.map((country) => (
          <Button
            size={"lg"}
            key={country.code}
            variant={"ghost"}
            className="w-full"
          >
            <Image
              src={country.flag}
              alt={country.name}
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            {country.name}
          </Button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
