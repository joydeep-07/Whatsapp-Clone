import { CirclePlus, EllipsisVertical, Search } from "lucide-react";
import React from "react";

const Chatlist = () => {
  return (
    <>
      <div className="h-screen p-4 flex flex-col">
        <div className=" flex justify-between pb-4">
          <h1 className="font-body text-xl tracking-wider">Chats</h1>
          <div className="flex gap-5 justify-center">
            <CirclePlus />
            <EllipsisVertical />
          </div>
        </div>

        <div className="flex items-center border pl-4 gap-2 border-[var(--border-light)] h-[40px] rounded-full overflow-hidden max-w-md w-full">
          <Search className="text-[var(--text-secondary)] " />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full outline-none text-[var(--text-secondary)] placeholder-gray-500 text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default Chatlist;
