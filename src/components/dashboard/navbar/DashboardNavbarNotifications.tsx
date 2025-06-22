import { USER_NOTIFICATIONS, USER_NOTIFICATIOSN_SUBSCRIPTION } from "@/graphql/current-user";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { motion } from "framer-motion";
import { MdNotifications } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, X } from "lucide-react";
import {
  DELETE_NOTIFICATION,
  MARK_NOTIFICATION_AS_READ,
} from "@/graphql/queries/user";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface DashboardNavbarNotificationsProps {}

// createdAt?: any | null;
// id?: string | null;
// message?: string | null;
// readStatus?: boolean | null;
// title?: string | null;
// type?: string | null;
// userId?: number | null;

export function DashboardNavbarNotifications({}: DashboardNavbarNotificationsProps) {
  const { data, refetch } = useQuery(USER_NOTIFICATIONS);
  const [notificationsCount,setNotificationsCount] = useState(data?.userNotifications?.length ?? 0);
  const [notifications,setNotifications] = useState(data?.userNotifications ?? []);
   useSubscription(USER_NOTIFICATIOSN_SUBSCRIPTION,{
    onData: ({ data }) => {
      console.log("New notification data:", data);
      const newNotification = data?.data?.notification;
      if (newNotification) {
        setNotifications((prev) => [...prev, newNotification]);
        setNotificationsCount((prev) => prev + 1);
      }
    }
  });

  // useEffect(() => {
  //   if (notifdata) {
  //     setNotifications(notifdata.userNotifications);
  //     setNotificationsCount(notifdata.userNotifications.length);
  //   }
  // }, [notifdata]);

  return (
    <Popover>
      <PopoverTrigger>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <MdNotifications className="size-6" />
          <span className="bg-primary text-primary-foreground absolute top-0 right-0 flex size-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs">
            {notificationsCount}
          </span>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="mr-2">
        <div className="max-h-[60vh] w-fit overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-muted-foreground p-4 text-center text-sm">
              No notifications
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between border-b p-2">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="relative border-b p-4 last:border-b-0"
                >
                  {notification.id && (
                    <DismissNotificationButton
                      notificationId={notification.id}
                      refetch={refetch}
                    />
                  )}
                  <h3 className="pr-6 text-sm font-semibold">
                    {notification.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {notification.message}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                    {!notification.readStatus && notification.id && (
                      <MarkNotificationAsRead
                        notificationId={notification.id}
                        refetch={refetch}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DismissNotificationButton({
  notificationId,
  refetch,
}: {
  notificationId: string;
  refetch: () => any;
}) {
  const [deleteNotification, { loading }] = useMutation(DELETE_NOTIFICATION, {
    variables: { notificationIds: [notificationId] },
    onCompleted: (data) => {
      if (data.deleteNotification?.status === "Success") {
        refetch();
        toast.success("Notification dismissed");
        // Optionally, you can refetch notifications or update the UI
      } else {
        toast.error("Failed to dismiss notification", {
          duration: 50000,dismissible: true,
        });
      }
    },
    onError: (error) => {
      console.error("Error dismissing notification:", error);
      toast.error("Error dismissing notification", {
        duration: 50000,dismissible: true,
      });
    },
  });
  return (
    <button
      disabled={loading}
      className="text-muted-foreground hover:text-muted-foreground/90 absolute top-2 right-2 cursor-pointer transition-colors hover:underline"
      onClick={() => {
        deleteNotification();
      }}
      aria-label="Dismiss notification"
    >
      {loading ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <X className="size-4" />
      )}
    </button>
  );
}

function MarkNotificationAsRead({
  notificationId,
  refetch,
}: {
  notificationId: string;
  refetch: () => any;
}) {
  const [markNotificationAsRead, { loading }] = useMutation(
    MARK_NOTIFICATION_AS_READ,
    {
      variables: { notificationIds: [notificationId] },
      onCompleted: (data) => {
        if (data.markNotificationAsRead?.status === "Success") {
          refetch();
          toast.success("Notification marked as read");
        } else {
          toast.error("Failed to mark notification as read", {
            duration: 50000,dismissible: true,
          });
        }
      },
      onError: (error) => {
        console.error("Error marking notification as read:", error);
        toast.error("Error marking notification as read", {
          duration: 50000,dismissible: true,
        });
      },
    },
  );
  return (
    <button
      className="text-primary text-xs transition-colors hover:underline"
      disabled={loading}
      onClick={() => {
        markNotificationAsRead();
      }}
    >
      {loading ? "Mark as read" : "Marking as read..."}
    </button>
  );
}
