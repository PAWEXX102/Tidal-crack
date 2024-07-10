interface listboxwrapperProps {
    children: React.ReactNode;
    className?: string;
}


import React from "react";
export const ListboxWrapper = ({children}:listboxwrapperProps) => (
  <div className="w-full max-w-[260px] border-small left-[20rem] px-1 py-2 rounded-small border-default-200 dark:border-default-100 absolute ">
    {children}
  </div>
);
