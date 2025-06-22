import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@apollo/client";
import { CREATE_SOCIAL_POST } from "@/graphql/mutations/marketing";
import { toast } from "sonner";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { CustomFileInput } from "@/components/wrappers/forms/file-inputs";

interface Campaign {
  id: string;
  title: string;
}

export function CreatePostModal({
  open,
  onClose,
  campaigns = [],
}: {
  open: boolean;
  onClose: () => void;
  campaigns: Campaign[];
}) {
  const [title, setTitle] = useState("");
  const [campaignId, setCampaignId] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [channels, setChannels] = useState<string[]>([]);

  const [createPost, { loading }] = useMutation(CREATE_SOCIAL_POST);

  // Capitalized names to match backend expectations
  const channelIcons = [
    { name: "Facebook", icon: <FaFacebookF />, label: "Facebook" },
    { name: "Instagram", icon: <FaInstagram />, label: "Instagram" },
    { name: "Twitter", icon: <BsTwitterX />, label: "X" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, label: "LinkedIn" },
  ];

  const toggleChannel = (channel: string) => {
    setChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((ch) => ch !== channel)
        : [...prev, channel],
    );
  };

  const handleSubmit = async () => {
    try {
      if (campaignId === null) {
        toast.error("Please select a campaign.", {
          duration: 50000,
          dismissible: true,
        });
        return;
      }
      const variables = {
        title,
        campaignId,
        content,
        channels,
        media: [image, video].filter(Boolean),
      };
      const { data } = await createPost({ variables });
      if (data?.createSocialPost?.status === "Sucess") {
        toast.success("Post created successfully");
        onClose();
      } else {
        console.log("data from server", data);
        toast.error(data?.createSocialPost?.message, {
          position: "top-center",
          duration: 50000,
          dismissible: true,
        });
      }
    } catch (error) {
      console.log("Error creating post", error);
      const isFormValid = title && campaignId !== null && channels.length > 0;
    }
  };

  const isFormValid = title && campaignId && channels.length > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="text-sm">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="col-span-1 flex items-end">
            <Select onValueChange={(value) => setCampaignId(Number(value))}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Select Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Campaigns</SelectLabel>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <label className="text-sm">Post Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>

          {/* <div className="col-span-1">
            <label className="mb-1 block text-sm">Add Media</label>
            <div className="border-muted-foreground flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed text-sm">
              <label className="flex cursor-pointer flex-col items-center">
                <span className="text-2xl">⬆</span>
                <span>upload image</span>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
            </div>
          </div> */}
            <CustomFileInput
              hideLabel={true}
              label="Upload Image"
              fileType="image"
              onChange={(file) => setImage(file)}
              className=""
              required={false}
            
            />

          {/* <div className="col-span-1">
            <label className="invisible mb-1 block text-sm">Spacer</label>
            <div className="border-muted-foreground text-gmuted-foreground flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed text-sm">
              <label className="flex cursor-pointer flex-col items-center">
                <span className="text-2xl">⬆</span>
                <span>upload clip</span>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
            </div>
          </div> */}
          <CustomFileInput
            hideLabel={true}
            label="Upload Video"
            fileType="video"
            onChange={(file) => setVideo(file)}
            className=""
            required={false}/>
          <div className="col-span-2">
            <label className="text-sm">Channels</label>
            <div className="mt-2 flex gap-4">
              {channelIcons.map(({ name, icon }, idx) => {
                const selected = channels.includes(name);
                return (
                  <button
                    key={name + idx}
                    type="button"
                    onClick={() => toggleChannel(name)}
                    className={`flex h-10 w-10 items-center justify-center rounded-md border-2 text-xl transition ${
                      selected
                        ? "border-muted-foreground bg-primary/80 text-background hover:bg-primary/60"
                        : "text-muted-foreground border-muted-foreground bg-muted"
                    }`}
                  >
                    {icon}
                    <span className="sr-only">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-4">
          <Button
            variant="destructive"
            onClick={onClose}
            className=""
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
            className="text-background bg-primary hover:bg-primary/80 cursor-pointer"
          >
            {loading ? "Creating..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
