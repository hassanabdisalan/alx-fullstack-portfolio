import { USER_ROLES } from "@/helpers/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface RolesSelectProps {
  value: string;
  setValue: (value: string) => void;
  hasError?: boolean;
}

export function RolesSelect({ value, setValue, hasError }: RolesSelectProps) {
  return (
    <div className="w-full space-y-1.5">
      <Label
        htmlFor={`role-select`}
        className={cn(
          "text-foreground/80 text-sm font-medium",
          hasError && "text-red-500",
        )}
      >
        User Role
      </Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Admin" />
        </SelectTrigger>
        <SelectContent>
          {USER_ROLES.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
