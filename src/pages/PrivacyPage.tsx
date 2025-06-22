import { Link as RouterLink } from "react-router-dom";
import { FlowbizIcon } from "@/components/branding/FlowbizIcon";

export function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-background/80 flex items-center justify-between px-4 py-3 shadow-sm backdrop-blur-md">
        <RouterLink to="/">
          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <div className="sm:hidden">
              <div className="bg-primary flex size-10 items-center justify-center rounded-lg">
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
          className="bg-primary text-foreground border-primary rounded-lg border-2 px-4 py-1.5 text-base font-medium transition-colors hover:border-blue-700 hover:bg-blue-700"
        >
          Sign Up
        </RouterLink>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <div className="mb-4 rounded-2xl p-6 md:p-12">
          <h1 className="from-primary mb-2 bg-gradient-to-r to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Privacy Policy
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
                1. Information We Collect
              </h2>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                We collect information to provide better services to all our
                users. The types of information we collect include:
              </p>
              <ul className="text-foreground/80 list-disc space-y-2 pl-6">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  phone number, and other contact details
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with our
                  services, including log data and device information
                </li>
                <li>
                  <strong>Content:</strong> Information you create or upload
                  while using our services
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                2. How We Use Information
              </h2>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="text-foreground/80 list-disc space-y-2 pl-6">
                <li>Provide, maintain, and improve our services</li>
                <li>Develop new features and functionality</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                3. Information Sharing
              </h2>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                We do not share personal information with companies,
                organizations, or individuals outside of Flowbiz CRM except in
                the following cases:
              </p>
              <ul className="text-foreground/80 list-disc space-y-2 pl-6">
                <li>
                  <strong>With your consent:</strong> We'll share information
                  when you direct us to
                </li>
                <li>
                  <strong>For legal reasons:</strong> When required by law or to
                  respond to legal process
                </li>
                <li>
                  <strong>For external processing:</strong> With trusted service
                  providers under confidentiality agreements
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                4. Data Security
              </h2>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                We implement appropriate security measures to protect against
                unauthorized access, alteration, disclosure, or destruction of
                your personal information. These include:
              </p>
              <ul className="text-foreground/80 list-disc space-y-2 pl-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and testing</li>
                <li>Restricted access to personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                5. Your Rights
              </h2>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                You have the right to:
              </p>
              <ul className="text-foreground/80 list-disc space-y-2 pl-6">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction or deletion of your information</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Withdraw consent at any time where applicable</li>
              </ul>
              <p className="text-foreground/80 mt-3 leading-relaxed">
                To exercise these rights, please contact us at the information
                below.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                6. Changes to This Policy
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                7. Contact Us
              </h2>
              <p className="text-foreground/80 mb-2 leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <p className="text-foreground/80">
                Email:{" "}
                <a
                  href="mailto:info@goymarey.com"
                  className="text-primary underline hover:text-blue-800"
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
              className="hover:text-primary text-sm text-slate-600 transition-colors hover:underline"
            >
              Terms
            </RouterLink>
            <RouterLink
              to="/privacy"
              className="hover:text-primary text-sm text-slate-600 transition-colors hover:underline"
            >
              Privacy
            </RouterLink>
            <RouterLink
              to="/support"
              className="hover:text-primary text-sm text-slate-600 transition-colors hover:underline"
            >
              Support
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
}
