import { USER_BUSINESS } from "@/graphql/current-user";
import { useViewer } from "@/hooks/use-viewr";
import { useQuery } from "@apollo/client";
import { DashboardNavbarTeamAvatars } from "./DashboardNavbarTeamAvatars";

interface DashboardNavbarBusinessTeamProps {}

export function DashboardNavbarBusinessTeam({}: DashboardNavbarBusinessTeamProps) {
  const { user } = useViewer();
  const businessId = parseInt(user?.business?.id ?? "-1");
  const { data, loading } = useQuery(USER_BUSINESS, {
    variables: {
      businessId,
    },
  });
  if (loading)
    return (
      <div className="flex items-center justify-center -space-x-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border-foreground inline-flex animate-spin items-center justify-center rounded-full border-2 bg-slate-300 text-slate-600"
            style={{ width: 40, height: 40, fontSize: "16px" }}
          />
        ))}
      </div>
    );
  const teamMembers = data?.business?.users;
  if (!teamMembers || teamMembers.length === 0)
    return (
      <div className="flex min-w-fit items-center justify-center text-sm">
        <p className="text-muted-foreground">No team members found</p>
      </div>
    );
  const teamMembersAvatar = teamMembers.map((member) => {
    return {
      name: member.Fname ?? "Unknown",
      src: member.image,
    };
  });
  return (
    <DashboardNavbarTeamAvatars
      teamMembers={teamMembersAvatar}
      size={40}
      maxAvatars={5}
    />
  );
}
