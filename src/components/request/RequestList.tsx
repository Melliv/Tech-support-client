"use client";

import { Request } from "@/types/request";
import React, { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import Loader from "../ui/loader";
import Connector from "../../app/singalr-connection";
import api from "@/lib/axios-config";

export default function RequestList() {
  const [requests, setRequests] = useState<Request[] | null>(null);
  const { events } = Connector();
  useEffect(() => {
    getData();
    events((message) => {
      if (message === "RequestListUpdated") getData();
    });
  }, []);

  async function getData() {
    const res = await api.get<Request[]>("/Request/unsolved");
    setRequests(res.data);
  }

  const Content = () => {
    if (requests === null) {
      return <Loader />;
    } else if (requests.length === 0) {
      return <p>There are 0 requests</p>;
    } else {
      return requests.map((request) => (
        <RequestCard request={request} key={request.id} />
      ));
    }
  };

  return (
    <div>
      <div className={"text-2xl"}>Requests</div>
      <div className={"sm:min-w-96"}>{Content()}</div>
    </div>
  );
}
