"use client";
import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = ({ text }: { text?: string }) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <Oval
        visible={true}
        height="100"
        width="100"
        color="#000068"
        secondaryColor="grey"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className="text-grey">
        {text ? text : "Searching sites ... this may take a while"}
      </p>
    </div>
  );
};

export default Loader;
