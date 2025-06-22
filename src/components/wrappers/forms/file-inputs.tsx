import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CustomFileInputProps = {
  label?: string;
  acceptTypes?: string;
  onChange?: (file: File | null) => void;
  fileType?: "image" | "video" | "audio" | "document" | "any";
  uploadText?: string;
  className?: string;
  labelClassName?: string;
  previewClassName?: string;
  hideLabel?: boolean;
  required?: boolean;
  defaultValue?: File | null;
  disabled?: boolean;
};

export const CustomFileInput = ({
  label = "Upload File",
  acceptTypes,
  onChange,
  fileType = "image",
  uploadText,
  className,
  labelClassName,
  previewClassName,
  hideLabel = false,
  required = false,
  defaultValue = null,
  disabled = false,
}: CustomFileInputProps) => {
  const [file, setFile] = useState<File | null>(defaultValue);
  const [preview, setPreview] = useState<string | null>(null);

  // Determine accept types based on fileType or use custom acceptTypes
  const getAcceptTypes = () => {
    if (acceptTypes) return acceptTypes;

    switch (fileType) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "audio":
        return "audio/*";
      case "document":
        return ".pdf,.doc,.docx,.xls,.xlsx,.txt";
      default:
        return "*/*";
    }
  };

  // Get upload text based on fileType or use custom text
  const getUploadText = () => {
    if (uploadText) return uploadText;

    switch (fileType) {
      case "image":
        return "Upload image";
      case "video":
        return "Upload video";
      case "audio":
        return "Upload audio";
      case "document":
        return "Upload document";
      default:
        return "Upload file";
    }
  };

  // Handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      // Create preview for the file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    // Call parent onChange handler
    onChange?.(selectedFile);
  };

  // Clear selected file
  const clearFile = () => {
    setFile(null);
    setPreview(null);
    onChange?.(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!hideLabel && (
        <label className={cn("mb-1 block text-sm", labelClassName)}>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      {!file && (
        <div className="border-muted-foreground flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed text-sm">
          <label className="flex cursor-pointer flex-col items-center">
            <span className="text-2xl">⬆</span>
            <span>{getUploadText()}</span>
            <Input
              type="file"
              accept={getAcceptTypes()}
              onChange={handleFileChange}
              className="hidden"
              disabled={disabled}
              required={required}
            />
          </label>
        </div>
      )}

      {file && preview && (
        <div
          className={cn(
            "relative h-32 w-full overflow-hidden rounded-md",
            previewClassName,
          )}
        >
          {fileType === "image" && (
            <img
              src={preview}
              alt="File preview"
              className="h-full w-full object-cover"
            />
          )}
          {fileType === "video" && (
            <video
              src={preview}
              className="h-full w-full object-cover"
              controls
            />
          )}
          {!["image", "video"].includes(fileType) && (
            <div className="bg-muted flex h-full w-full items-center justify-center">
              <p className="text-muted-foreground text-sm">
                {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            </div>
          )}

          {!disabled && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearFile}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};


