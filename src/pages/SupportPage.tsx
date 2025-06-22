import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CiMail } from "react-icons/ci";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa6";
import { IoMdBusiness } from "react-icons/io";
import { IoMdHelpCircleOutline } from "react-icons/io";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking on 'Forgot Password' on the login page. We'll send you a link to create a new one.",
  },
  {
    question: "Where can I find my account settings?",
    answer:
      "Account settings are available in the top-right dropdown menu under your profile picture.",
  },
  {
    question: "How do I add team members?",
    answer:
      "Navigate to Settings > Team Management to invite new members to your organization.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "Flowbiz CRM works best on Chrome, Firefox, Safari, and Edge (latest versions).",
  },
  {
    question: "How do I export my data?",
    answer:
      "You can export your data from the Reports section in CSV, Excel, or PDF formats.",
  },
  {
    question: "Is there a mobile app?",
    answer: "Yes! Flowbiz CRM is available on both iOS and Android devices.",
  },
];

const supportTeam = [
  {
    name: "Dennis Waweru",
    role: "Customer Success",
    avatar:
      "https://lh3.googleusercontent.com/dg6vBORpiG1rRg0iODxRoxZmjM0dZfN7KhYktilBySiFFTtpONMgO21HAJkCbyLgtiFyCl4tq4UFKgEA-q-8NLZriQ=s137",
    expertise: ["Onboarding", "Account Setup"],
  },
  {
    name: "Hassan Munene",
    role: "Technical Support",
    avatar:
      "https://lh3.googleusercontent.com/becdfwHZSBU6sNrS4EtgmHOizI7bOb51feA2VS0ESy_4AUKabRzDPXGA0NXMFZuFzLL1cPnC-bbKUi-qU1xYhSs=s137",
    expertise: ["API", "Integrations"],
  },
  {
    name: "Adnan Gard",
    role: "Billing Specialist",
    avatar:
      "https://lh3.googleusercontent.com/ZU0jgiCbmTjA0N_9P0GSgsASVhH1ShLfRWxFLHwRCYe1swrFFAJQ35fT-mfD702GOZ998DvChHv9eMIejLraiGQEHw=s137",
    expertise: ["Subscriptions", "Payments"],
  },
];

export function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-32 pb-24">
      <div className="mx-auto max-w-screen-lg px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 text-center">
            <span className="bg-primary text-foreground mb-2 inline-block rounded-md px-4 py-1 text-xs font-semibold">
              Support Center
            </span>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              How can we help you today?
            </h1>
            <p className="text-muted mx-auto max-w-2xl text-lg">
              Get answers to your questions or contact our support team
              directly. We're here to help you succeed with Flowbiz CRM.
            </p>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-background mb-12 rounded-lg p-6 shadow-lg">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Contact Our Team</h2>
                <p className="text-muted">
                  Can't find what you're looking for? Send us a message and
                  we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <CiMail color="primary" className="text-primary" />
                <p>
                  <Link
                    to="mailto:support@flowbizcrm.com"
                    className="text-primary"
                  >
                    support@flowbizcrm.com
                  </Link>
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <FaPhone color="primary" className="text-primary" />
                <p>+254 758 492 438</p>
              </div>

              <div className="flex items-center space-x-4">
                <IoMdBusiness color="primary" className="text-primary" />
                <p>Goymarey ltd, Unga House, Muthithi Rd, Nairobi</p>
              </div>

              <div className="mt-6 space-x-4">
                <a href="#" className="text-primary">
                  <FaFacebook />
                </a>
                <a href="#" className="text-primary">
                  <FaTwitter />
                </a>
                <a href="#" className="text-primary">
                  <FaLinkedin />
                </a>
                <a href="#" className="text-primary">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg p-6 shadow-md"
                >
                  <div className="mb-4 flex items-center">
                    <IoMdHelpCircleOutline
                      color="primary"
                      className="text-primary mr-4"
                    />
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                  </div>
                  <p className="text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Support Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">
              Meet Our Support Team
            </h2>
            <div className="text-muted mb-4">
              Our dedicated support specialists are ready to assist you with any
              questions.
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {supportTeam.map((member, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg p-6 text-center shadow-md"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="mx-auto mb-4 h-28 w-28 rounded-full"
                  />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary mb-4 text-sm">{member.role}</p>
                  <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="border-primary text-primary rounded-full border px-3 py-1 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="bg-primary text-foreground inline-block rounded-md px-6 py-2 text-sm"
                  >
                    Contact {member.name.split(" ")[0]}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
