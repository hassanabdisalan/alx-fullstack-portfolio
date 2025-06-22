import { JSX } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";

interface SocialMediaRow {
  id: number;
  source: string;
  icon: JSX.Element;
  likes: number | string;
  comments: number | string;
  views: number | string;
  reposts: number | string;
  retweets: number | string;
  link: string;
}

export const dummyData: SocialMediaRow[] = [
  {
    id: 1,
    source: "LinkedIn",
    icon: <FaLinkedin className="text-[#0077B5]" size={20} />,
    likes: 10,
    comments: 10,
    views: "--",
    reposts: 20,
    retweets: "--",
    link: "https://linkedin.com",
  },
  {
    id: 2,
    source: "Facebook",
    icon: <FaFacebook className="text-[#1877F2]" size={20} />,
    likes: 20,
    comments: 20,
    views: "--",
    reposts: "--",
    retweets: "--",
    link: "https://facebook.com",
  },
  {
    id: 3,
    source: "Instagram",
    icon: <FaInstagram className="text-[#E4405F]" size={20} />,
    likes: 30,
    comments: 30,
    views: "--",
    reposts: "--",
    retweets: "--",
    link: "https://instagram.com",
  },
  {
    id: 4,
    source: "X (Twitter)",
    icon: <FaTwitter className="text-foreground" size={20} />,
    likes: 40,
    comments: 40,
    views: 20,
    reposts: 20,
    retweets: 10,
    link: "https://twitter.com",
  },
];

export const columns: ColumnDef<SocialMediaRow>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const checked = table.getIsAllPageRowsSelected();
      return (
        <Checkbox
          className="size-5 cursor-pointer"
          checked={checked}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      const checked = row.getIsSelected();
      return (
        <Checkbox
          className="size-5 cursor-pointer"
          checked={row.getIsSelected() || checked}
          onCheckedChange={row.getToggleSelectedHandler()}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    size: 14,
  },
  {
    accessorKey: "source",
    header: "Source",
    size: 14,
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2">
        {row.original.icon}
        <span>{row.original.source}</span>
      </div>
    ),
  },
  {
    accessorKey: "likes",
    header: "Likes",
    size: 14,
    cell: ({ getValue }) => (
      <div style={{ textAlign: "start" }}>{String(getValue())}</div>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comments",
    size: 14,
    cell: ({ getValue }) => (
      <div style={{ textAlign: "start" }}>{String(getValue())}</div>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    size: 14,
    cell: ({ getValue }) => (
      <div style={{ textAlign: "start" }}>{String(getValue())}</div>
    ),
  },
  {
    accessorKey: "reposts",
    header: "Reposts",
    size: 14,
    cell: ({ getValue }) => (
      <div style={{ textAlign: "start" }}>{String(getValue())}</div>
    ),
  },
  {
    accessorKey: "retweets",
    header: "Retweets",
    size: 14,
    cell: ({ getValue }) => (
      <div style={{ textAlign: "start" }}>{String(getValue())}</div>
    ),
  },
];
