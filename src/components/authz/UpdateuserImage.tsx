import { useState } from "react";
import { useMutation } from "@apollo/client";
import { USER_PROFILE_UPDATE } from "@/graphql/mutations/auth";
import { useViewer } from "@/hooks/use-viewr";
import { CURRENT_USER_QUERY } from "@/graphql/queries/user";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UpdateuserImageProps {
  triggerComponent?: React.ReactNode;
}

export function UpdateuserImage({ triggerComponent }: UpdateuserImageProps) {
  const { user } = useViewer();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.image || null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [updateUserImage, { loading }] = useMutation(USER_PROFILE_UPDATE, {
    onCompleted: (data) => {
      console.log("Update user image response:", data);
      if (data?.updateUserProfile?.status === "Success") {
        toast.success(
          data.updateUserProfile.message ||
            "Profile image updated successfully",
        );
        setIsOpen(false);
        setFileSelected(false);
      } else {
        toast.error(
          data?.updateUserProfile?.message || "Failed to update profile image",
        );
      }
    },
    refetchQueries(response) {
      if (response.data?.updateUserProfile?.status === "Success") {
        return [CURRENT_USER_QUERY];
      }
      return [];
    },
    onError: (error) => {
      console.log("Error updating profile image:", error);
      toast.error(
        error.message || "An error occurred while updating your profile image",
      );
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setFileSelected(true);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = () => {
    if (avatarPreview !== user?.image) {
      updateUserImage({
        variables: {
          image: imageFile,
        },
      });
    } else {
      toast.info("No changes to update");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerComponent || <Button variant={"outline"}>Choose Image</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile Photo</DialogTitle>
          <DialogDescription>
            Upload or change your profile photo. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-6 py-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={avatarPreview || undefined}
                alt={user?.Fname || "Profile"}
              />
              <AvatarFallback className="bg-background text-foreground/80 text-xl">
                {user?.Fname?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex gap-4">
            <input
              accept="image/*"
              id="profile-image-upload-dialog"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="profile-image-upload-dialog"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none"
            >
              Choose image
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpdateImage}
            disabled={loading || !fileSelected}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
