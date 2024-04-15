import RequestForm from "@/components/request/RequestForm";
import RequestList from "@/components/request/RequestList";
import React from "react";

export default function Request() {
  return (
    <div className={"grid gap-4 md:flex"}>
      <div>
        <div className={"md:sticky top-24"}>
          <RequestForm />
        </div>
      </div>
      <RequestList />
    </div>
  );
}
