"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { ChevronsRight, ChevronsLeft, Home, Files, Trash, Upload } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { id: 1, label: "Home", icon: Home, link: "/dashboard" },
  { id: 2, label: "Upload", icon: Upload, link: "/upload" },
  { id: 3, label: "Shared Files", icon: Files, link: "/shared" },
  { id: 4, label: "Trash", icon: Trash, link: "/trash" },
];

const SideNav = () => {
  const storedCollapseState = localStorage.getItem("sidebarCollapseState");
  const [toggleCollapse, setToggleCollapse] = useState(
    storedCollapseState ? JSON.parse(storedCollapseState) : false
  );
  const [isCollapsible, setIsCollapsible] = useState(true);

  useEffect(() => {
    localStorage.setItem("sidebarCollapseState", JSON.stringify(toggleCollapse));
  }, [toggleCollapse]);

  const wrapperClasses = cn(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col border border-r-2",
    {
      "w-80": !toggleCollapse,
      "w-20": toggleCollapse,
    }
  );

  const collapseIconClasses = cn(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      // onMouseEnter={onMouseOver}
      // onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ChevronsLeft />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }, idx) => (
            <div key={idx}>
              <Link href={menu.link} className="flex py-6 px-3 items-center w-full h-full">
                <div style={{ width: "2.5rem" }}>
                  <Icon />
                </div>
                {!toggleCollapse && (
                  <span className={cn("text-md font-medium text-text-light")}>
                    {menu.label}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
