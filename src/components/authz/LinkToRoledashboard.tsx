import { appropriateDashboardPath } from "@/helpers/appropriate-dashboard";
import { useViewer } from "@/hooks/use-viewr";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LinkToRoledashboardProps {}

export function LinkToRoledashboard({}: LinkToRoledashboardProps) {
  const { user } = useViewer();
  return (
    <Link to={appropriateDashboardPath(user)} className="">
      <Button>
        Go to dashboard <FaArrowRight className="ml-2" />
      </Button>
    </Link>
  );
}
