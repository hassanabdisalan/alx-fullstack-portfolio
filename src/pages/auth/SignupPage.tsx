import { AuthPageBrief } from "@/components/branding/AuthPageBrief";
import { SignupForm } from "@/components/auth/SignupForm";

interface SignupPageProps {}

export function SignupPage({}: SignupPageProps) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col md:flex-row">
        <AuthPageBrief />
        <SignupForm />
      </div>
    </div>
  );
}
