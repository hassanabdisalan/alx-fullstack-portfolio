import { cn } from "@/lib/utils";

interface LoadingProgressBarProps {
  isLoading: boolean;
  className?: string;
}

export function LoadingProgressBar({ isLoading, className }: LoadingProgressBarProps) {
  if (!isLoading) return null;

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50", className)}>
      <div className="h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent"
          style={{
            animation: "progressPulse 1.5s ease-in-out infinite",
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60"
          style={{
            animation: "progressSlide 2s linear infinite",
          }}
        />
      </div>
      <style>
        {`
          @keyframes progressPulse {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 1;
            }
          }
          
          @keyframes progressSlide {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
}
