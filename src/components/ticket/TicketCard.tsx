import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Ticket } from "@/types/ticket";
import { addHours, format, isBefore } from "date-fns";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOURS_BEFORE_DEADLINE_EXPIRE_WARNING } from "@/app/variables";
import api from "@/lib/axios-config";

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [deatlineWarning, setDeatlineWarning] = useState(false);

  useEffect(() => {
    deadlineCalculation();
  }, []);

  function deadlineCalculation() {
    const deadline = addHours(
      new Date(ticket.deadline!),
      -HOURS_BEFORE_DEADLINE_EXPIRE_WARNING
    );
    if (isBefore(deadline, new Date())) {
      setDeatlineWarning(true);
    } else {
      const timeoutTime = deadline.getTime() - Date.now();
      setTimeout(() => setDeatlineWarning(true), timeoutTime);
    }
  }

  async function markAsSolvedOnClick() {
    setButtonDisabled(true);
    ticket.solved = true;
    const res = await api.put(`Ticket/${ticket.id}`, ticket);
    if (res.status === 204) {
      closeCard();
    } else {
      setButtonDisabled(false);
    }
  }

  async function closeCard() {
    const growDiv = document.getElementById(`ticket-card-${ticket.id}`);
    if (!growDiv) return;
    growDiv.style.height = `${growDiv.clientHeight}px`;
    setTimeout(() => {
      growDiv.style.height = "0";
      growDiv.style.overflow = "hidden";
    }, 100);
  }

  const cardClass = deatlineWarning ? "bg-destructive" : "";

  return (
    <div
      className="max-w-md overflow-hidden transition-[height] duration-500 ease-in-out"
      id={`ticket-card-${ticket.id}`}
    >
      <Card className={cn("mt-4", cardClass)}>
        <CardContent className={"mt-6"}>
          <div>{ticket.description}</div>
          <Separator className={"my-2"} />
          <div className={"flex justify-between items-center gap-4"}>
            <div className={"flex flex-wrap gap-2"}>
              <p>Deadline:</p>
              <p className={"text-nowrap"}>
                {format(ticket.deadline!, "dd-MM-yyyy HH:mm")}
              </p>
            </div>
            <Button
              className={"flex gap-2"}
              variant={"secondary"}
              onClick={markAsSolvedOnClick}
              disabled={buttonDisabled}
            >
              <Check className={"size-5"} />
              <p className={"hidden sm:flex"}>Mark as Solved</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
