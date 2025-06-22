import { useViewer } from "@/hooks/use-viewr";
import { MdLogout } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { USER_LOGOUT } from "@/graphql/mutations/auth";
import { useState } from "react";
import { toast } from "sonner";

interface LogoutButtonProps {
  open?: boolean;
}

export function LogoutButton({ open }: LogoutButtonProps) {
  const { setUser } = useViewer();
  const [logoutUser, { loading, data }] = useMutation(USER_LOGOUT, {
    onCompleted: (data) => {
      if (data.userLogout?.status === "Success") {
        setUser(undefined);
        toast.success("Logged out successfully");
      } else {
        toast.error(
          "Something went wrong, please try again later or contact support if the problem persists",
          {
            duration: 50000,dismissible: true,
          },
        );
      }
    },
    onError: (error) => {
      toast.error(
        "Something went wrong, please try again later or contact support if the problem persists", {
          duration: 50000,dismissible: true,
        }
      );
    },
  });

  return (
    <button
      disabled={loading}
      className="text-foreground hover:text-error-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg p-2"
      onClick={() => {
        logoutUser();
      }}
    >
      {loading ? (
        <FaSpinner className="animate-spin" size={24} />
      ) : (
        <MdLogout className="" size={24} />
      )}
      {open && <span className="text-sm">Logout</span>}
    </button>
  );
}
