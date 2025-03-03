"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExitModal } from "@/store/use-exit-modal";
import { useRouter } from "next/navigation";

const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, onClose } = useExitModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  //This will prevent hydration error, This code is checking if the code is running on the client side (in the browser)
  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/mascot_sad.svg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, don&apos;t go
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4 ">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              className="w-full"
              size={"lg"}
              onClick={onClose}
            >
              Keep Learning
            </Button>
            <Button
              variant={"dangerOutline"}
              className="w-full"
              size={"lg"}
              onClick={() => {
                onClose();
                router.push("/learn");
              }}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
