import TicketForm from "@/components/ticket/TicketForm";
import TicketList from "@/components/ticket/TicketList";
import React from "react";

export default function Ticket() {
  return (
    <div className={"grid gap-4 md:flex"}>
      <div>
        <div className={"md:sticky top-24"}>
          <TicketForm />
        </div>
      </div>
      <TicketList />
    </div>
  );
}
