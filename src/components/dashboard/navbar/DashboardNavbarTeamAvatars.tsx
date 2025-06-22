import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TeamMember {
  name: string;
  src?: string | null;
}
interface DashboardNavbarTeamAvatarsProps {
  maxAvatars?: number;
  size?: number;
  teamMembers: TeamMember[];
}

export function DashboardNavbarTeamAvatars({
  maxAvatars = 4,
  size = 30,
  teamMembers,
}: DashboardNavbarTeamAvatarsProps) {

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part?.[0] || "")
      .join("")
      .toUpperCase();
  };

  const visibleMembers = teamMembers.slice(0, maxAvatars);
  const remainingCount = teamMembers.length - maxAvatars;

  return (
    <TooltipProvider>
      <div className="flex -space-x-3">
        {visibleMembers.map((member, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div className="inline-block">
                <Avatar
                  className="border-foreground size-[30px] border-2"
                  style={{
                    width: size,
                    height: size,
                  }}
                >
                  {member.src&&<AvatarImage src={member.src} alt={member.name} />}
                  <AvatarFallback
                    style={{
                      backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
                      color: "white",
                      fontSize: `${size * 0.4}px`,
                    }}
                  >
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              <div className="text-sm font-semibold">{member?.name}</div>
            </TooltipContent>
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="border-foreground inline-flex items-center justify-center rounded-full border-2 bg-slate-300 text-slate-600"
                style={{
                  width: size,
                  height: size,
                  fontSize: `${size * 0.4}px`,
                }}
              >
                +{remainingCount}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              <p className="text-xs">{remainingCount} more team members</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
