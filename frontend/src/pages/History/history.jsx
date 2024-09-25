import React from "react";
import Table from "../../components/Table/table";
import Sidebar from "../../components/sidebar/sidebar";

const History = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Table />
        </main>
      </div>
    </>
  );
};

export default History;
