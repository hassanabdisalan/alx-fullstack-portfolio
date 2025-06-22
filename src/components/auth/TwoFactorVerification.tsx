import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

const otpSchema = z.object({
  otp: z.string().min(8, "OTP must be 8 digits").max(8),
});

type OtpFormData = z.infer<typeof otpSchema>;

interface TwoFactorVerificationProps {
  email: string;
  tokenId: string;
  onSuccess: (otpData: { otp: string }) => void | Promise<void>;
  onBack: () => void;
  onResend: () => Promise<void>;
  isResending: boolean;
}

export function TwoFactorVerification({
  email,
  tokenId,
  onSuccess,
  onBack,
  onResend,
  isResending,
}: TwoFactorVerificationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpFormData) => {
    try {
      // This will be handled by the parent component
      onSuccess({ otp: data.otp });
    } catch (error) {
      toast.error("Verification failed. Please try again.", {
        duration: 50000,dismissible: true,
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <h1 className="text-2xl font-bold">Verify Your Identity</h1>
        <p className="text-muted-foreground">
          Enter the 8-digit code sent to your email
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4 text-center">
            <p className="text-muted-foreground">Sent to:</p>
            <p className="font-medium">{email}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              autoComplete="one-time-code"
              placeholder="123456"
              maxLength={9}
              {...register("otp")}
            />
            {errors.otp && (
              <p className="text-destructive text-sm">{errors.otp.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2">
        <Button
          variant="link"
          onClick={onResend}
          disabled={isResending}
          className="text-sm"
        >
          {isResending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Didn't receive code? Resend"
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground text-sm"
        >
          Back to login
        </Button>
      </CardFooter>
    </Card>
  );
}
