"use client";
import ExecutedOrdersTable from '@/components/order/ExecutedOrdersTable';
import React from 'react';



const Home = () => {
  return (
    <div className="bg-white w-full">
      <ExecutedOrdersTable />
    </div>
  );
};

export default Home;