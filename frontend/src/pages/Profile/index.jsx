import React from "react";
import Sidebar from "../../components/sidebar/sidebar";

const Profile = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
         <h1>Work Ongoing!!</h1>
        </main>
      </div>
    </>
  );
};

export default Profile;
