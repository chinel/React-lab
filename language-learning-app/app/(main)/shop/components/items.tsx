"use client";

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFIL } from "@/lib/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hasActiveSubscription, hearts, points }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefilHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFIL) return;

    startTransition(() => {
      refillHearts().catch(() => {
        toast.error("Something went wrong. Please try again later.");
      });
    });
  };

  return (
    <ul className="w-full">
      <li className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill Hearts
          </p>
        </div>
        <Button
          disabled={pending || hearts === 5 || points < POINTS_TO_REFIL}
          onClick={onRefilHearts}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="./points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFIL}</p>
            </div>
          )}
        </Button>
      </li>
    </ul>
  );
};

export default Items;
