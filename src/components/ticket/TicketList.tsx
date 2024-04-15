"use client";

import { Ticket } from "@/types/ticket";
import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import Loader from "../ui/loader";
import Connector from "../../app/singalr-connection";
import api from "@/lib/axios-config";

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const { events } = Connector();
  useEffect(() => {
    getData();
    events((message) => {
      if (message === "TicketListUpdated") getData();
    });
  }, []);

  async function getData() {
    const res = await api.get<Ticket[]>("/Ticket/unsolved");
    setTickets(res.data);
  }

  const Content = () => {
    if (tickets === null) {
      return <Loader />;
    } else if (tickets.length === 0) {
      return <p>There are 0 tickets</p>;
    } else {
      return tickets.map((ticket) => (
        <TicketCard ticket={ticket} key={ticket.id} />
      ));
    }
  };

  return (
    <div>
      <div className={"text-2xl"}>Tickets</div>
      <div className={"sm:min-w-96"}>{Content()}</div>
    </div>
  );
}
