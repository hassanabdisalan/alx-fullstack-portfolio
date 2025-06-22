import { Button } from "@/components/ui/button";
import { FiLock, FiCheck, FiX } from "react-icons/fi";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ENABLE_TWO_FACTOR } from "@/graphql/mutations/auth";
import { DISABLE_TWO_FACTOR } from "@/graphql/mutations/auth";
import { toast } from "sonner";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TwoFactorSettingsProps {
  initialStatus?: boolean;
}

export function TwoFactorSettings({
  initialStatus = false,
}: TwoFactorSettingsProps) {
  const [isEnabled, setIsEnabled] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const [enable2FA] = useMutation(ENABLE_TWO_FACTOR);
  const [disable2FA] = useMutation(DISABLE_TWO_FACTOR);

  const handleToggle2FA = async () => {
    setIsLoading(true);

    try {
      if (isEnabled) {
        // Disable 2FA
        const { data } = await disable2FA();
        if (data?.disabletwoFA?.status === "Success") {
          setIsEnabled(false);
          toast.success("Two-factor authentication has been disabled");
        } else {
          throw new Error(
            data?.disabletwoFA?.message || "Failed to disable 2FA",
          );
        }
      } else {
        // Enable 2FA
        const { data } = await enable2FA();
        if (data?.enableTwoFA?.status === "Success") {
          setIsEnabled(true);
          toast.success("Two-factor authentication has been enabled");
        } else {
          throw new Error(data?.enableTwoFA?.message || "Failed to enable 2FA");
        }
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-muted-foreground text-sm">
          Add an extra layer of security to your account
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 flex items-center gap-4 rounded-lg p-4">
          <div
            className={`rounded-full p-3 ${isEnabled ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}
          >
            {isEnabled ? (
              <FiCheck
                className="text-green-600 dark:text-green-400"
                size={20}
              />
            ) : (
              <FiLock className="text-blue-600 dark:text-blue-400" size={20} />
            )}
          </div>

          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">
              {isEnabled ? "2FA is enabled" : "2FA is disabled"}
            </p>
            <p className="text-muted-foreground text-sm">
              {isEnabled
                ? "Your account is protected with two-factor authentication"
                : "Enable to add an extra layer of security"}
            </p>
          </div>

          {isLoading ? (
            <Button className="cursor-pointer">
              {isEnabled ? "Disabling..." : "Enabling..."}
            </Button>
          ) : (
            <Button
              onClick={handleToggle2FA}
              disabled={isLoading}
              variant={isEnabled ? "destructive" : "default"}
              className="min-w-[100px] cursor-pointer"
            >
              {isEnabled ? "Disable" : "Enable"}
            </Button>
          )}
        </div>

        {/* Additional setup steps when enabling */}
        {!isEnabled && (
          <Alert className="mt-4" variant="default">
            <AlertDescription className="text-sm">
              When enabled, you'll need to enter an OTP code sent to the email
              you are registred with.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
