"use client";

import { Bolt, FileText, Pickaxe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    id: 1,
    name: "WorkSpace",
    path: "/workspace",
    icon: <Pickaxe className="h-4 w-4" />,
  },
  {
    id: 2,
    name: "Review Config",
    path: "/review-config",
    icon: <Bolt className="h-4 w-4" />,
  },
  {
    id: 3,
    name: "Data",
    path: "/data",
    icon: <FileText className="h-4 w-4" />,
    disabled: true,
  },
];

export const Nav = () => {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navLinks.map((link) => (
        <Link
          href={link.disabled ? "#" : link.path}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive(link.path)
              ? "text-primary bg-muted"
              : "text-muted-foreground"
          }`}
        >
          {link.icon}
          {link.name}
        </Link>
      ))}
    </nav>
  );
};
