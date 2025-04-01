import { Button } from "@/components/ui/button";
import { quests } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "../ui/progress";

type Props = {
  points: number;
};

const Quests = ({ points }: Props) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>

        <Button asChild variant={"primaryOutline"} size={"sm"}>
          <Link href="/quests">View All</Link>
        </Button>
      </div>
      <ul className="w-full space-y-2">
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100;
          return (
            <li
              key={quest.title}
              className="flex items-center gap-x-3 py-4 last:py-0 last:border-none last:mb-0"
            >
              <Image src="/points.svg" alt="Points" height={40} width={40} />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="font-bold text-neutral-700 text-sm">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2"></Progress>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Quests;
