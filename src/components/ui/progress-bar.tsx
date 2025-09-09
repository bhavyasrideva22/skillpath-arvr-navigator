import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export const ProgressBar = ({ value, max, className }: ProgressBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className={cn("w-full bg-secondary rounded-full h-2", className)}>
      <div
        className="h-2 rounded-full gradient-primary transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};