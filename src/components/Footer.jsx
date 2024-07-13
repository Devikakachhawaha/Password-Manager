import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full  ">
      <div className="logo font-bold text-white text-xl ">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">Safe/&gt;</span>
      </div>
      <div className="flex justify-evenly items-center gap-1 my-1 ">
        Created with
        <lord-icon 
          src="https://cdn.lordicon.com/etgnxeer.json"
          trigger="hover"
        ></lord-icon>
        by Devika
      </div>
    </div>
  );
};

export default Footer;

