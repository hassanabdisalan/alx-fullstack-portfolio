import { useQuery } from "@apollo/client";
import { GET_SPECIFIC_CAMPAIGN } from "@/graphql/queries/admin";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Calendar,
  Info,
  X,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ViewCampaignModalProps {
  campaignId: number | null;
  onClose: () => void;
}

export function ViewCampaignModal({
  campaignId,
  onClose,
}: ViewCampaignModalProps) {
  const { data, loading, error } = useQuery(GET_SPECIFIC_CAMPAIGN, {
    variables: campaignId ? { campaignId } : undefined,
    skip: !campaignId,
  });

  const campaign = data?.campaign;

  const getStatusBadge = () => {
    const now = new Date();
    const start = campaign?.start ? new Date(campaign.start) : null;
    const end = campaign?.end ? new Date(campaign.end) : null;

    if (!start || !end) return null;

    if (now < start) {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Clock className="mr-1 h-3 w-3" /> Upcoming
        </Badge>
      );
    } else if (now >= start && now <= end) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Active
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
          Completed
        </Badge>
      );
    }
  };

  return (
    <Dialog open={!!campaignId} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-lg p-0 sm:max-w-3xl">
        {loading && (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-50 p-4 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Failed to load campaign details. Please try again.
          </div>
        )}

        {!loading && campaign && (
          <>
            <DialogHeader className="border-b px-6 pt-6 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    {campaign.title || "Untitled Campaign"}
                    {getStatusBadge()}
                  </DialogTitle>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Created:{" "}
                    {campaign.createdAt
                      ? format(
                          new Date(campaign.createdAt),
                          "MMM dd, yyyy h:mm a",
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 p-6">
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">
                  Description
                </h3>
                <p className="text-sm">
                  {campaign.description || "No description provided."}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <Info className="text-muted-foreground h-4 w-4" />
                      Campaign Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Campaign ID</span>
                      <span className="font-medium">{campaign.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Business ID</span>
                      <span className="font-medium">{campaign.businessId}</span>
                    </div>
                    {Array.isArray(campaign.channels) &&
                      campaign.channels.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Channels
                          </span>
                          <div className="flex gap-1">
                            {campaign.channels.map((channel) => (
                              <Badge
                                key={channel}
                                variant="outline"
                                className="capitalize"
                              >
                                {channel.toLowerCase()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start Date</span>
                      <span className="font-medium">
                        {campaign.start
                          ? format(
                              new Date(campaign.start),
                              "MMM dd, yyyy h:mm a",
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">End Date</span>
                      <span className="font-medium">
                        {campaign.end
                          ? format(
                              new Date(campaign.end),
                              "MMM dd, yyyy h:mm a",
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">
                        {campaign.start && campaign.end ? (
                          <>
                            {Math.ceil(
                              (new Date(campaign.end).getTime() -
                                new Date(campaign.start).getTime()) /
                                (1000 * 60 * 60 * 24),
                            )}{" "}
                            days
                          </>
                        ) : (
                          "N/A"
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end border-t px-6 py-4">
              <Button onClick={onClose} variant="outline" className="mr-3">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
