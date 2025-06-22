import { AuthPageBrief } from "@/components/branding/AuthPageBrief";
import { LoginForm } from "@/components/auth/LoginForm";

interface LoginPageProps {}

function LoginPage({}: LoginPageProps) {
  return (
    <div className="flex max-h-screen w-full flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col md:flex-row">
        <AuthPageBrief />
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
