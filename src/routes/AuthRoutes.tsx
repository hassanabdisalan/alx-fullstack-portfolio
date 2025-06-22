import { Route } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { TermsPage } from "@/pages/TermsPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPage";
import { SupportPage } from "@/pages/SupportPage";
import { AcceptInvitePage } from "@/pages/invite/AcceptInvitePage";
import { ProtectedRoute } from "@/components/authz/ProtectedRoute";
import { AppUser } from "@/contexts/AppContext";
// Use a more flexible type for the user
type User = AppUser | null | undefined;

interface AuthRoutesProps {
  user: User | null | undefined;
  isLoading: boolean | undefined;
}

function AuthRoutes({ user, isLoading }: AuthRoutesProps) {
  return (
    <>
      <Route
        path="/signin"
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <ForgotPasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <ResetPasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <SignupPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/terms"
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <TermsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/privacy"
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <PrivacyPolicyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <SupportPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accept-invite"
        element={<AcceptInvitePage />}
      />
    </>  );
}

export default AuthRoutes;
