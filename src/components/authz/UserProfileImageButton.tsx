import { useViewer } from "@/hooks/use-viewr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UpdateuserImage } from "./UpdateuserImage";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface UserProfileImageButtonProps {
  showButton?: boolean;
  size?: "sm" | "md" | "lg";
}

export function UserProfileImageButton({ 
  showButton = true,
  size = "md" 
}: UserProfileImageButtonProps) {
  const { user } = useViewer();
  
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24"
  };
  
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl"
  };

  return (
    <div className="relative group">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage
          src={user?.image || undefined}
          alt={user?.Fname || "Profile"}
        />
        <AvatarFallback className={`bg-background text-foreground/80 ${textSizeClasses[size]}`}>
          {user?.Fname?.charAt(0)?.toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {showButton && (
        <UpdateuserImage
          triggerComponent={
            <div className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground cursor-pointer opacity-90 shadow-md group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-6 w-6 p-1">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          }
        />
      )}
    </div>
  );
}
