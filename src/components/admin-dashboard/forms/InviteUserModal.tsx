import { InviteUsersForm } from "./InviteUsersForm";
import { RiUserAddLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useViewer } from "@/hooks/use-viewr";

interface InviteUserModalProps {}

export function InviteUserModal({}: InviteUserModalProps) {
  const { user } = useViewer();
  if (user?.role !== "Admin") {
    return null; // Only admins can invite users
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant={`outline`}
          className="text-foreground border-foreground/30 gap-3 border"
        >
          <RiUserAddLine className="text-foreground size-6" /> Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Employee</DialogTitle>
          <DialogDescription className="sr-only">
            Invite an employee to join the team by entering their email address
            and selecting a role.
          </DialogDescription>
        </DialogHeader>
        <InviteUsersForm />
      </DialogContent>
    </Dialog>
  );
}
