import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ToolbarProvider } from "@/components/editor/toolbars/toolbar-provider";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BoldToolbar } from "./toolbars/bold";
import { ItalicToolbar } from "./toolbars/italic";
import { StrikeThroughToolbar } from "./toolbars/strikethrough";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { MdClose } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { UnderlineToolbar } from "./toolbars/underline";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { FontFamilyToolbar } from "./toolbars/font-family";
import { TextColorToolbar } from "./toolbars/text-color";
import { useMutation } from "@apollo/client";
import { SEND_EMAIL } from "@/graphql/mutations/shared-actions";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: { class: "list-decimal" },
    },
    bulletList: {
      HTMLAttributes: { class: "list-disc" },
    },
    code: {
      HTMLAttributes: { class: "bg-slate-100 rounded-md p-1" },
    },
    horizontalRule: {
      HTMLAttributes: { class: "my-2" },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-slate-800 text-slate-100 p-2 text-sm rounded-md",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: { class: "tiptap-heading" },
    },
  }),
  Underline,
  TextStyle,
  Color,
  FontFamily,
];

export interface Recipient {
  name: string;
  email: string;
}

interface EmailEditorProps {
  initialRecipients?: Recipient[];
  initialSubject?: string;
  initialBody?: string;
  onSend?: (data: EmailData) => void;
  handleClose: () => void;
  className?: string;
}

export interface EmailData {
  recipients: Recipient[];
  subject: string;
  body: string;
}

export function EmailEditor({
  initialRecipients = [],
  initialSubject = "",
  initialBody = "",
  handleClose,
  onSend,
  className = "",
}: EmailEditorProps) {
  const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients);
  const [subject, setSubject] = useState(initialSubject);
  const [currentInput, setCurrentInput] = useState("");

  const [sendEmail, { loading }] = useMutation(SEND_EMAIL, {
    onCompleted: (data) => {
      if (data?.sendMail?.status === "Success") {
        console.log("Email sent successfully", data);
        toast.success("Email sent successfully");
      } else {
        console.error("Error sending email", data?.sendMail?.message);
        toast.error(data?.sendMail?.message || "Error sending email", {
          duration: 50000,dismissible: true,
        });
      }
    },
    onError: (error) => {
      console.error("Error sending email", error);
      toast.error("Error sending email", {
        duration: 50000,dismissible: true,
      });
    },
  });

  const editor = useEditor({
    extensions: extensions as Extension[],
    content: `<p>Subject: ${subject}</p>
      <p>${initialBody}</p>
    `,
  });

  useEffect(() => {
    if (editor && initialBody) {
      editor.commands.setContent(initialBody);
    }
  }, [editor, initialBody]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim() !== "") {
      // Check if input contains an email format
      const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
      const extractedEmail = currentInput.match(emailRegex)?.[0] || "";

      if (extractedEmail) {
        // Check if this email is already in recipients
        if (!recipients.some((r) => r.email === extractedEmail)) {
          // Extract name from input (everything before the email)
          const nameMatch = currentInput.split(extractedEmail)[0].trim();
          const name = nameMatch || extractedEmail.split("@")[0];

          setRecipients([
            ...recipients,
            {
              name: name.replace(/[<>]/g, "").trim(),
              email: extractedEmail,
            },
          ]);
          setCurrentInput("");
        }
      }
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r.email !== email));
  };

  const handleSend = async () => {
    if (!editor) return;
    if (!recipients.length) return;
    const seendEmailPromises = recipients.map((recipient) => {
      const singleEmailpormise = sendEmail({
        variables: {
          email: recipient.email,
          message: editor.getHTML(),
        },
      });
      toast.promise(singleEmailpormise, {
        loading: `Sending email to ${recipient.email}`,
        success: `Email sent to ${recipient.email}`,
        error: `Error sending email to ${recipient.email}`,
      });
      return singleEmailpormise;
    });
    await Promise.allSettled(seendEmailPromises);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={`bg-muted rounded-lg shadow-sm ${className}`}>
      <div className="space-y-4 p-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Label htmlFor="from" className="text-foreground/80 min-w-[60px]">
              From:
            </Label>
            <div className="flex-1">
              <Input
                id="from"
                value="Add sender"
                className="bg-background"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Label htmlFor="to" className="text-foreground/80 min-w-[60px]">
              To:
            </Label>
            <div className="bg-background flex flex-1 flex-wrap items-center gap-1.5 rounded-md border p-1.5">
              {recipients.map((recipient) => (
                <Badge
                  key={recipient.email}
                  variant="secondary"
                  className="bg-muted text-foreground/80 flex items-center gap-1"
                >
                  {recipient.name !== recipient.email.split("@")[0]
                    ? `${recipient.name} <${recipient.email}>`
                    : recipient.email}
                  <button
                    type="button"
                    onClick={() => removeRecipient(recipient.email)}
                    className="hover:text-slate-900"
                  >
                    <MdClose size={14} />
                  </button>
                </Badge>
              ))}
              <Input
                id="to"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-muted h-8 min-w-[180px] flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Name <email@example.com> or email@example.com"
              />
            </div>
          </div>
          <p className="pl-[68px] text-xs text-slate-500">
            Press Enter to add recipient
          </p>
        </div>

        <div className="bg-muted flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="subject"
              className="text-foreground/80 min-w-[60px]"
            >
              Subject:
            </Label>
            <div className="flex-1">
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-muted"
                placeholder="Enter message subject"
              />
            </div>
          </div>
        </div>

        <div className="bg-background overflow-hidden rounded-md border">
          <div className="bg-background sticky top-0 left-0 z-20 flex w-full items-center justify-between border-b px-2 py-2">
            <ToolbarProvider editor={editor}>
              <div className="flex flex-wrap items-center gap-2">
                <Separator orientation="vertical" className="h-7" />
                <BoldToolbar />
                <ItalicToolbar />
                <UnderlineToolbar />
                <StrikeThroughToolbar />
                <TextColorToolbar />
                <FontFamilyToolbar />
              </div>
            </ToolbarProvider>
          </div>
          <div
            onClick={() => {
              editor?.chain().focus().run();
            }}
            className="min-h-[18rem] cursor-text p-3"
          >
            <EditorContent className="prose-sm outline-none" editor={editor} />
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <Button onClick={handleSend} disabled={loading} className="">
            Send {loading && <Loader className="animate-spin" />}
          </Button>
          <Button
            onClick={() => {
              handleClose?.();
            }}
            variant={"outline"}
            className="border-red-400 text-red-400"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
