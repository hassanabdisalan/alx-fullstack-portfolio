import React, { useState } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Base input props type
type InputProps<T extends FieldValues, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<{
    [key in K]: string;
  }>;
};

// Props for the standard input component
interface CustomShadcnInputProps<T extends FieldValues, K extends Path<T>>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: K;
  inputProps: InputProps<T, K>;
}

export function CustomShadcnInput<T extends FieldValues, K extends Path<T>>({
  label,
  inputProps,
  className,
  type,
  ...props
}: CustomShadcnInputProps<T, K>) {
  const errorMessage = inputProps.fieldState.error?.message;
  const hasError = !!errorMessage;

  return (
    <div className="w-full space-y-1.5">
      <Label
        htmlFor={`${inputProps.field.name}-input`}
        className={cn(
          "text-foreground/80 text-sm font-medium",
          hasError && "text-red-500",
        )}
      >
        {label}
      </Label>

      {type === "number" ? (
        <Input
          id={`${inputProps.field.name}-input`}
          className={cn(
            "focus-visible:ring-1 focus-visible:ring-muted",
            hasError && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          aria-describedby={
            hasError ? `${inputProps.field.name}-error` : undefined
          }
          {...props}
          {...inputProps.field}
          onChange={(event) => inputProps.field.onChange(+event.target.value)}
        />
      ) : (
        <Input
          id={`${inputProps.field.name}-input`}
          className={cn(
            "focus-visible:ring-1 focus-visible:ring-muted",
            hasError && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          aria-describedby={
            hasError ? `${inputProps.field.name}-error` : undefined
          }
          {...props}
          {...inputProps.field}
        />
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

// Password input specific props
type PasswordInputProps<T extends FieldValues, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
};

interface CustomShadcnPasswordInputProps<
  T extends FieldValues,
  K extends Path<T>,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: K;
  inputProps: PasswordInputProps<T, K>;
  placeholder?: string;
}

export function CustomShadcnPasswordInput<
  T extends FieldValues,
  K extends Path<T>,
>({
  label,
  inputProps,
  placeholder = "Enter your password",
  className,
  ...props
}: CustomShadcnPasswordInputProps<T, K>) {
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = inputProps.fieldState.error?.message;
  const hasError = !!errorMessage;

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full space-y-1.5">
      <Label
        htmlFor={`${inputProps.field.name}-input`}
        className={cn(
          "text-foreground/80 text-sm font-medium",
          hasError && "text-red-500",
        )}
      >
        {label}
      </Label>

      <div className="relative">
        <Input
          id={`${inputProps.field.name}-input`}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={cn(
            "pr-10 focus-visible:ring-1 focus-visible:ring-muted",
            hasError && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          aria-describedby={
            hasError ? `${inputProps.field.name}-error` : undefined
          }
          {...props}
          {...inputProps.field}
        />

        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className="hover:text-foreground/80 absolute top-1/2 right-3 -translate-y-1/2 text-muted focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <MdVisibilityOff className="h-4 w-4" />
          ) : (
            <MdVisibility className="h-4 w-4" />
          )}
        </button>
      </div>

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

// Select input props type
interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps<T extends FieldValues, K extends Path<T>> {
  label: string;
  name: K;
  options: SelectOption[];
  inputProps: InputProps<T, K>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CustomShadcnSelect<T extends FieldValues, K extends Path<T>>({
  label,
  inputProps,
  options,
  placeholder = "Select an option",
  className,
  disabled = false,
}: CustomSelectProps<T, K>) {
  const errorMessage = inputProps.fieldState.error?.message;
  const hasError = !!errorMessage;

  return (
    <div className="w-full space-y-1.5">
      <Label
        htmlFor={`${inputProps.field.name}-select`}
        className={cn(
          "text-foreground/80 text-sm font-medium",
          hasError && "text-red-500",
        )}
      >
        {label}
      </Label>

      <Select
        disabled={disabled}
        onValueChange={inputProps.field.onChange}
        defaultValue={inputProps.field.value}
        value={inputProps.field.value}
      >
        <SelectTrigger
          id={`${inputProps.field.name}-select`}
          className={cn(
            "w-full focus:ring-1 focus:ring-muted",
            hasError && "border-red-500 focus:ring-red-500",
            className,
          )}
          aria-describedby={
            hasError ? `${inputProps.field.name}-error` : undefined
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
