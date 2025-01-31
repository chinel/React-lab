import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <p className="text-green-500 font-bold text-xs">Hello Lingo</p>
      <Button variant="destructive" size="lg">
        Click Me
      </Button>
    </div>
  );
}
