import { Skeleton } from "@/components/ui/skeleton";

export const CardFallback = () => {
  const projectArray = Array(10).fill(0);
  return (
    <>
      {projectArray.map((_, i) => (
        <Skeleton key={i} className="w-48 h-48 shrink-0 overflow-hidden snap-start flex-col flex justify-between" />
      ))}
    </>
  );
};
CardFallback.displayName = "CardFallback";
