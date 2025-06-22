import { Link, useLocation } from "react-router-dom";

interface DevCrossPagesLinksProps {}

const mainPages = ["admin", "customer-rep", "marketing-rep", "sales-rep"];
export function DevCrossPagesLinks({}: DevCrossPagesLinksProps) {
  const { pathname } = useLocation();
  if (!import.meta.env.DEV) return null;
  return (
    <div className="flex w-full items-center justify-center gap-2 p-2">
      {mainPages.map((page) => {
        const isCurrent = pathname.startsWith(`/${page}`);
        return (
          <Link
            style={{
              textDecoration: isCurrent ? "underline" : "none",
              fontWeight: isCurrent ? "bold" : "normal",
              color: isCurrent ? "var(--primary)" : "",
            }}
            key={page}
            to={`/${page}`}
            className="rounded-2xl border p-2 shadow"
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
