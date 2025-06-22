import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdHome,
  MdArrowBack,
  MdOutlineSentimentDissatisfied,
} from "react-icons/md";
import { Button } from "../ui/button";

interface NotFoundProps {}

export function NotFound({}: NotFoundProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto-countdown to redirect
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-muted w-full max-w-md rounded-xl p-8 text-center shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-6 flex justify-center"
        >
          <MdOutlineSentimentDissatisfied size={120} className="text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-foreground mb-2 text-4xl font-bold"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-foreground mb-4 text-2xl font-semibold"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-foreground/80 mb-6"
        >
          Sorry, the page you're looking for doesn't exist or has been moved.
        </motion.p>

        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link to="/">
              <Button className="w-full">
                <MdHome />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.history.back()}
            >
              <MdArrowBack />
              Go Back
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-foreground/50 mt-8 text-sm"
        >
          Redirecting to home in {countdown} seconds...
          {countdown === 0 && <meta httpEquiv="refresh" content="0;url=/" />}
        </motion.div>
      </motion.div>
    </div>
  );
}
