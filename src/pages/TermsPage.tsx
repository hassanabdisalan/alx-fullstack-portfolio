import { Link as RouterLink } from "react-router-dom";
import { FlowbizIcon } from "@/components/branding/FlowbizIcon";

export function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-background/80 flex items-center justify-between px-4 py-3 shadow-sm backdrop-blur-md">
        <RouterLink to="/">
          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <div className="sm:hidden">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600">
                <div className="bg-background size-6 rounded-full" />
              </div>
            </div>
            <div className="hidden sm:block">
              <FlowbizIcon />
            </div>
          </div>
        </RouterLink>

        <RouterLink
          to="/signup"
          className="text-foreground rounded-lg border-2 border-blue-600 bg-blue-600 px-4 py-1.5 text-base font-medium transition-colors hover:border-blue-700 hover:bg-blue-700"
        >
          Sign Up
        </RouterLink>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <div className="mb-4 rounded-2xl p-6 md:p-12">
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Terms and Conditions
          </h1>

          <p className="mb-6 text-slate-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                1. Acceptance of Terms
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                By accessing and using Flowbiz CRM ("Service"), you accept and
                agree to be bound by the terms and provisions of this agreement.
                If you do not agree to abide by these terms, please do not use
                this Service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                2. Description of Service
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Flowbiz CRM provides customer relationship management tools
                including but not limited to contact management, sales pipeline
                tracking and customer interaction logging through our web
                application.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                3. User Responsibilities
              </h2>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                You agree not to use the Service to:
              </p>
              <ul className="text-foreground/80 list-disc space-y-2 pl-6">
                <li>
                  Upload or transmit any unlawful, harassing or harmful content
                </li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                4. Privacy Policy
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Your use of the Service is also governed by our Privacy Policy,
                which explains how we collect, use and protect your information.
                Please review our{" "}
                <RouterLink
                  to="/privacy"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Privacy Policy
                </RouterLink>{" "}
                to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                5. Modifications to Terms
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                We reserve the right to modify these terms at any time. When we
                make changes, we will revise the "last updated" date at the top
                of this page. Your continued use of the Service constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                6. Contact Information
              </h2>
              <p className="text-foreground/80 mb-2 leading-relaxed">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p className="text-foreground/80">
                Email:{" "}
                <a
                  href="mailto:info@goymarey.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  info@goymarey.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-background/80 border-t border-slate-200 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Flowbiz CRM. All rights reserved.
          </p>
          <div className="flex gap-6">
            <RouterLink
              to="/terms"
              className="text-sm text-slate-600 transition-colors hover:text-blue-600 hover:underline"
            >
              Terms
            </RouterLink>
            <RouterLink
              to="/privacy"
              className="text-sm text-slate-600 transition-colors hover:text-blue-600 hover:underline"
            >
              Privacy
            </RouterLink>
            <RouterLink
              to="/support"
              className="text-sm text-slate-600 transition-colors hover:text-blue-600 hover:underline"
            >
              Support
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
}
