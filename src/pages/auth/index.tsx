import { LoadingComponent } from '@/components/routing/LoadingComponent';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import auth components dynamically when needed
const LoginPage = React.lazy(() => import('./LoginPage'));
// For components with named exports, we need to transform them
const ForgotPasswordPage = React.lazy(() => import('./ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = React.lazy(() => import('./ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const SignupPage = React.lazy(() => import('./SignupPage').then(m => ({ default: m.SignupPage })));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={
        <Suspense fallback={<LoadingComponent />}>
          <LoginPage />
        </Suspense>
      } />
      <Route path="/forgot-password" element={
        <Suspense fallback={<LoadingComponent />}>
          <ForgotPasswordPage />
        </Suspense>
      } />
      <Route path="/reset-password" element={
        <Suspense fallback={<LoadingComponent />}>
          <ResetPasswordPage />
        </Suspense>
      } />
      <Route path="/signup" element={
        <Suspense fallback={<LoadingComponent />}>
          <SignupPage />
        </Suspense>
      } />
      {/* Redirect unknown auth routes to signin */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
