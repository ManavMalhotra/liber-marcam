import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";

import Table from "@/components/Table";
export default function Home() {
  return (
    <main className="flex">
      <div className="flex-[2] bg-black w-full h-screen">
        <Navbar />
      </div>
      <div className="flex-[8] w-full h-screen bg-gray-400">
        <Table />
      </div>
    </main>
  );
}
