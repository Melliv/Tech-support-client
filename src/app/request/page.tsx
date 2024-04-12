import RequestForm from "@/components/request/RequestForm";
import RequestList from "@/components/request/RequestList";
import React from "react";

export default function Request() {
  return (
    <div className={"grid gap-4"}>
      <RequestForm />
      <RequestList />
    </div>
  );
}
