import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImportLeadsDialogProps {}

export function ImportLeadsDialog({}: ImportLeadsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-7 px-2" variant="outline" size="sm">
          Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import leads</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file containing leads to import them into the system.
            Ensure the file is formatted correctly with the required fields.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full min-h-md  items-center gap-4 p-4">
          <Label htmlFor="file">Upload a file</Label>
          <Input className="w-full" id="file" type="file" accept=".csv, .xlsx, .xls" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
