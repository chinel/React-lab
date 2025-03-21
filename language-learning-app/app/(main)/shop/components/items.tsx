"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hasActiveSubscription, hearts, points }: Props) => {
  return (
    <ul className="w-full">
      <li className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill Hearts
          </p>
        </div>
        <Button disabled={hearts === 5}>
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="./points.svg" alt="Points" height={20} width={20} />
              <p>50</p>
            </div>
          )}
        </Button>
      </li>
    </ul>
  );
};

export default Items;
