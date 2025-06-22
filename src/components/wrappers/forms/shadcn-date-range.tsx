import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

// Date picker props type
type DatePickerProps<T extends FieldValues, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<{
    [key in K]: Date;
  }>;
};

interface CustomShadcnDatePickerProps<
  T extends FieldValues,
  K extends Path<T>,
> {
  label: string;
  name: K;
  inputProps: DatePickerProps<T, K>;
  placeholder?: string;
  className?: string;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
  description?: string;
  closeOnSelect?: boolean;
}

export function CustomShadcnDatePicker<
  T extends FieldValues,
  K extends Path<T>,
>({
  label,
  inputProps,
  placeholder = "Select date",
  className,
  fromDate = new Date("1900-01-01"),
  toDate = new Date("2100-01-01"),
  disabled = false,
  description,
  closeOnSelect = true,
}: CustomShadcnDatePickerProps<T, K>) {
  const errorMessage = inputProps.fieldState.error?.message;
  const hasError = !!errorMessage;
  const [open,setOpen] = useState(false);
  return (
    <div className="w-full space-y-1.5">
      <Label
        htmlFor={`${inputProps.field.name}-date`}
        className={cn(
          "text-foreground/80 text-sm font-medium",
          hasError && "text-red-500",
        )}
      >
        {label}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={`${inputProps.field.name}-date`}
            disabled={disabled}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !inputProps.field.value && "text-muted",
              hasError &&
                "border-error-foreground focus:ring-error-foreborder-error-foreground",
              className,
            )}
            aria-describedby={
              hasError
                ? `${inputProps.field.name}-error`
                : description
                  ? `${inputProps.field.name}-description`
                  : undefined
            }
          >
            {inputProps.field.value ? (
              format(inputProps.field.value, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            key={fromDate?.toISOString()}
            selected={inputProps.field.value}
            onSelect={(val) => {
              inputProps.field.onChange(val);
              if (closeOnSelect) {
                setOpen(false);
              }
            }}
            disabled={(date) => date < fromDate || date > toDate}
          />
        </PopoverContent>
      </Popover>

      {description && !hasError && (
        <p
          id={`${inputProps.field.name}-description`}
          className="text-xs text-slate-500"
        >
          {description}
        </p>
      )}

      {hasError && (
        <p
          data-test="input-error-message"
          id={`${inputProps.field.name}-error`}
          className="text-xs text-red-500"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
