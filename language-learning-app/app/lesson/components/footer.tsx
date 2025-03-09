import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  disabled?: boolean;
  status: "correct" | "wrong" | "none" | "completed";
  onCheck: () => void;
  lessonId?: number;
};
const Footer = ({ disabled, status, onCheck, lessonId }: Props) => {
  return <footer></footer>;
};

export default Footer;
