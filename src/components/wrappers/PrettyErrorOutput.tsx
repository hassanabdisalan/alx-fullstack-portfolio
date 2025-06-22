import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { ClipboardButton } from "./ClipboardButton";
import { Link } from "react-router-dom";

interface RouterErrorComponentProps {
  error: Error;
  refreshPage?: () => void;
}

export function RouterErrorComponent({
  error,
  refreshPage,
}: RouterErrorComponentProps) {
  const handleRefresh = () => {
    if (refreshPage) {
      refreshPage();
      return;
    }
    window.location.reload();
  };

  // Format just the error message and name for a quick copy
  const getErrorSummary = () => {
    return `Error: ${error.name}\nMessage: ${error.message}`;
  };

  // Format the complete error information for copying
  const getFullErrorText = () => {
    return `Error: ${error.name}
Message: ${error.message}
Stack Trace:
${error.stack || "No stack trace available"}
URL: ${window.location.href}
Time: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}`;
  };

  // In production, show a user-friendly error
  if (import.meta.env.PROD) {
    return (
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="bg-base-200/70 flex w-full max-w-md flex-col items-center space-y-6 rounded-lg p-10 text-center">
          <div className="bg-destructive/10 rounded-full p-4">
            <AlertTriangle className="text-error-content h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="text-muted-foreground">
              We're sorry, but we encountered an unexpected error. Our team has
              been notified.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 pt-4 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleRefresh}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Button asChild className="flex-1">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="border-border mt-2 w-full border-t pt-4">
            <p className="text-muted-foreground mb-3 text-xs">
              If this issue persists, please contact support with the error
              details:
            </p>
            <div className="flex min-w-fit gap-2">
              <ClipboardButton
                text={getErrorSummary()}
                displayText="Copy Summary"
                className="min-w-fit"
              />

              <ClipboardButton
                displayText="Copy Full Details"
                text={getFullErrorText()}
                className="min-w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // In development, show the actual error details
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="border-destructive bg-muted w-full max-w-3xl space-y-4 rounded-xl border p-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <h2 className="text-error-content text-xl font-semibold">
            {error.name}
          </h2>
        </div>

        <p className="font-medium">{error.message}</p>

        {error.stack && (
          <div className="mt-4">
            <h3 className="mb-2 text-sm font-medium">Stack Trace:</h3>
            <pre className="bg-background/70 o max-h-[400px] rounded-md p-4 text-xs">
              {error.stack}
            </pre>
          </div>
        )}

        <div className="mt-4 flex flex-wrap justify-between gap-2">
          <div className="flex min-w-fit gap-2">
            <ClipboardButton
              text={getErrorSummary()}
              displayText="Copy Summary"
              className="min-w-fit"
            />

            <ClipboardButton
              displayText="Copy Full Details"
              text={getFullErrorText()}
              className="min-w-fit"
            />
          </div>

          <Button variant="default" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
}
