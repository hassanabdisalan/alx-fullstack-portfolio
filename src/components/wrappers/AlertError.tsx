import { AlertCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { Button } from "../ui/button";

interface AlertError {
  title: string;
  description: string;
}

export function AlertError({ description, title }: AlertError) {
  const [show, setShow] = useState(description);
  if (!show || show === "") return null;
  return (
    <Alert variant="destructive" className="relative">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{show}</AlertDescription>
      <Button
        onClick={() => setShow("")}
        className="absolute top-2 right-2"
        variant="ghost"
      >
        <X className="" size-4 w-4 />
      </Button>
    </Alert>
  );
}
