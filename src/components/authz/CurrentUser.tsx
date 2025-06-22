import { useViewer } from "@/hooks/use-viewr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import {
  MoonIcon,
  SunIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DarkModeToggle } from "../wrappers/theme";
import { LogoutButton } from "../auth/LogoutButton";
import { appropriateDashboardPath } from "@/helpers/appropriate-dashboard";
import { getUserInitials } from "@/utils/string";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CurrentUserProps {}

export function CurrentUser({}: CurrentUserProps) {
  const { user } = useViewer()!;
  const relativeSuffix = appropriateDashboardPath(user);
  const initials = getUserInitials({ Fname: user?.Fname, Sname: user?.Sname });
  const [open, setOpen] = useState(false);
  const avatarImage = user?.image
  const settingsLink = `${relativeSuffix}/settings`;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
          <Avatar className="size-8">
            {avatarImage&&<AvatarImage src={avatarImage} alt={user?.Fname ?? "user pfp"} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="end">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <Avatar className="size-10">
              {avatarImage&&<AvatarImage src={avatarImage} alt={user?.Fname ?? "user pfp"} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">
                {user?.Fname} {user?.Sname}
              </h4>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
              <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium">
                {user?.role}
              </span>
            </div>
          </div>
          <Separator />
          <Link to={settingsLink} onClick={() => setOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm"
              size="sm"
            >
              <SettingsIcon className="mr-2 size-4" />
              Account Settings
            </Button>
          </Link>
          <Separator />
          <DarkModeToggle open={true} />

          <Separator />
          <LogoutButton open={true} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
