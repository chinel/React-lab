import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  id?: number;
  text: string;
  imgSrc: string | undefined;
  audioSrc: string | undefined;
  shortcut: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  type: (typeof challenges.$inferSelect)["type"];
};
const Card = ({
  audioSrc,
  imageSrc,
  shortcut,
  text,
  type,
  disabled,
  id,
  onClick,
  selected,
  status,
}: Props) => {
  console.log(imageSrc);

  return (
    <div
      onClick={() => {}}
      className={cn(
        "h-full border-2 rounded-xl bg-white border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        selected &&
          status === "wrong" &&
          " border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150] w-full">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}
    </div>
  );
};

export default Card;
