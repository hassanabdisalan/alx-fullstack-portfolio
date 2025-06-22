import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface PasswordResetSuccessProps {
  email: string;
  onReset?: () => void;
}

export function PasswordResetSuccess({ email }: PasswordResetSuccessProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="bg-background space-y-6 rounded-xl p-8 text-center shadow-lg">
          <div className="flex justify-center">
            <FiCheckCircle className="text-5xl text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Check your email
          </h2>

          <p className="text-slate-600">
            We've sent password reset instructions to{" "}
            <span className="font-medium text-blue-600">{email}</span>
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Didn't receive the email? Check your spam folder or{" "}
            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              try another email address
            </Link>
          </p>

          <div className="pt-4">
            <Button asChild variant="outline" className="w-full py-6">
              <Link to="/signin">Back to login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
