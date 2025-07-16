"use client";
import React from "react";
import QueuedOrdersTable from "@/components/order/QueuedOrdersTable";

const Home = () => {
  return (
    <div className="bg-white w-full">
      <QueuedOrdersTable />
    </div>
  );
};

export default Home;
