import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { EmailEditor } from "@/components/editor/EmailEditor";
import { IoMdMail } from "react-icons/io";
import { X } from "lucide-react";
import { useState } from "react";

interface EmailLeadDialogProps {
  email: string;
  name: string;
  trigger?: React.ReactNode;
}

export function EmailLeadDialog({
  email,
  name,
  trigger,
}: EmailLeadDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer modal direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="m-0 cursor-pointer p-0">
        {trigger ? trigger : <IoMdMail className="h-4 w-4 cursor-pointer" />}
      </DrawerTrigger>
      <DrawerContent className="min-w-4xl">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-10 text-2xl">
            <div className="flex w-full items-center gap-10">
              <img
                className="h-[53px] w-[74px]"
                src="/icons/send-lead-mail.png"
              />
              Send Message
            </div>
            <DrawerClose>
              <X className="size-6" />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Dialog for sending a message to the lead {name} via email {email}.
          </DrawerDescription>
        </DrawerHeader>
        <EmailEditor
          initialRecipients={[{ name, email }]}
          handleClose={() => setOpen(false)}
        />
        {/* <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
