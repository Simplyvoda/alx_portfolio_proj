"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import HomeNavbar from "@/components/HomeNavbar";
// import { BASE_API_URL } from "../../utils/config";
// this should be changed to be for client sign in

const HomePage = () => {
  const router = useRouter();

  return (
    <>
      <div className="heroContainer">
        <HomeNavbar />
        <div className="relative bg-neutral-white w-[100%] h-[60rem] text-center text-[3rem]">
          <div className="absolute top-[10.13rem] left-[calc(50%_-_474px)] flex flex-col items-center justify-start gap-[2rem]">
            <div className="flex flex-col items-center justify-start gap-[0.5rem]">
              <div className="relative w-[59.25rem] h-[12.5rem]">
                <div className="absolute top-[0rem] left-[calc(50%_-_474px)] leading-[6rem] inline-block w-[60.25rem] h-[14.5rem] font-bold">
                  <span>
                    {" "}
                    Optimize Your Shopping Experience with Our Advanced
                  </span>
                  <span className="text-primary-400"> Price Checker</span>
                  <span> Solution</span>
                </div>
              </div>
              <div className="relative text-[1.13rem] leading-[2.75rem] font-gilroy-medium inline-block w-[48.81rem] h-[6.56rem] shrink-0">
                Get the best prices and deals for your pocket, browse for
                products and deals on price falcon.
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[3.5rem] text-left text-[1rem] text-neutral-white font-gilroy-semibold">
              <button className="rounded-81xl outline-none bg-primary-300-base w-[10.88rem] h-[3.75rem] flex flex-row py-[0.75rem] px-[1.5rem] box-border items-center justify-center gap-[0.63rem] hover:opacity-[90%] ">
                <p
                  className="leading-[0.75rem]"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </p>
              </button>
              <p className="text-primary-300-base cursor-pointer">Learn more</p>
            </div>
          </div>
          <div className="absolute top-[37.94rem] left-[23.06rem] w-[43.81rem] h-[21.04rem] text-[1rem] font-gilroy-medium">
          </div>
        </div>
        <div className="absolute h-[63.81%] w-[37.71%] top-[36.19%] right-[0%] bottom-[0%] left-[62.29%] max-w-full overflow-hidden max-h-full opacity-[0.7]">
          <Image src="/images/blob_2.svg" layout="fill" alt=""/>
        </div>
        <div className="absolute h-[96.43%] w-[35.24%] top-[3.57%] right-[64.76%]
          bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full
          opacity-[0.8]">
            <Image src="/images/blob_3.svg" layout="fill" alt=""/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
