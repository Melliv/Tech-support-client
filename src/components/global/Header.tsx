import React from "react";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <div
      className={
        "bg-card border-b-2 w-full sticky top-0 p-4 flex justify-between"
      }
    >
      <p className={"text-4xl"}>Tech support</p>
      <div className="flex items-center space-x-2">
        <ModeToggle />
      </div>
    </div>
  );
}
