import { CirclePlus, EllipsisVertical, Search } from "lucide-react";
import React from "react";

const Chatlist = () => {
  return (
    <>
      <div className="h-screen p-4 flex flex-col">
        <div className=" flex justify-between mb-4">
          <h1 className="font-body text-xl tracking-wider">Chats</h1>
          <div className="flex gap-5 justify-center">
            <CirclePlus />
            <EllipsisVertical />
          </div>
        </div>

        <div className="flex mb-3 items-center border pl-4 gap-2 border-[var(--border-light)] h-[40px] rounded-full overflow-hidden max-w-md w-full">
          <Search className="text-[var(--text-secondary)] " />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full outline-none text-[var(--text-secondary)] placeholder-gray-500 text-sm"
          />
        </div>

        <div className="badges flex gap-2">
          <button className="py-1 px-4 rounded-full text-[var(--text-main)] bg-[var(--accent-primary)]/50 text-xs font-medium border border-[var(--border-light)] " >All</button>

          <button className="py-1 px-4 rounded-full text-[var(--text-main)] bg-[var(--bg-secondary)]/50 text-xs font-medium border border-[var(--border-light)] " >Unread</button>

          <button className="py-1 px-4 rounded-full text-[var(--text-main)] bg-[var(--bg-secondary)]/50 text-xs font-medium border border-[var(--border-light)] " >Group</button>
        </div>
      </div>
    </>
  );
};

export default Chatlist;
