"use client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "@/utils/config";
import response from "@/utils/data";
import { IProduct } from "@/models/product-model";
import Image from "next/image";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<any>([]);

  const handleSearch = async () => {
    try {
      console.log("This rannnnn");
      const res = await axios.get(`${BASE_API_URL}/search?value=${searchTerm}`);
      console.log(res, "response heree");
    } catch (err) {
    } finally {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const searchData = response.data;

    const ngMartResults = searchData.ngMart.map((item) => ({
      ...item,
      source: "247foods NG",
    }));

    const superMartResults = searchData.superMart.map((item) => ({
      ...item,
      source: "Super Mart",
      image: item.image.startsWith("https:")
        ? item.image
        : `https:${item.image}`,
    }));

    setSearchResult([...ngMartResults, ...superMartResults]);
  }, []);

  useEffect(() => {
    console.log(searchResult, "result to use");
  }, [searchResult]);

  return (
    <>
      <div className="h-full bg-white p-0">
        <Navbar />
        <div className="relative [background:linear-gradient(180deg,_#1e3448_99.99%,_rgba(30,_52,_72,_0))] w-[100%] h-[26.69rem] overflow-hidden shrink-0 text-[0.88rem] text-primary-100 font-gilroy-medium flex items-center justify-center">
          <Image
            className="absolute h-full w-[64.25%] top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full opacity-[0.7]"
            alt=""
            src="/images/blob_2.svg"
            layout="fill"
          />
          <Image
            className="absolute h-full w-[67.96%] top-[0%] right-[0%] bottom-[0%] max-w-full overflow-hidden max-h-full opacity-[0.5]"
            alt=""
            src="/images/blob_4.svg"
            layout="fill"
          />
          <div className="w-[55rem] rounded-xl bg-neutral-white shadow-[0px_4px_8px_rgba(100,_162,_255,_0.18)] [backdrop-filter:blur(12px)] overflow-hidden flex flex-col p-[2.63rem] items-center justify-center border-[1px] border-solid border-stroke-glass">
            <form
              className="flex flex-row gap-[1.5rem] w-[100%]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                placeholder="Enter search text here e.g milk, fish"
                className="rounded-xl outline-none focus:border-2 box-border w-[100%] h-[3.44rem] py-[0.5rem] px-[0.75rem] flex flex-col items-start justify-center text-[0.75rem] border-[1px] border-solid border-primary-100"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="flex flex-col items-start justify-start w-[40%] gap-[0.75rem] text-neutral-white font-gilroy-semibold">
                <button
                  className="rounded-81xl outline-none bg-primary-400 w-[100%] h-[3rem] overflow-hidden flex flex-row py-[0.75rem] px-[1.5rem] box-border items-center justify-center gap-[0.63rem] hover:opacity-[90%] cursor-pointer"
                  onClick={() => handleSearch()}
                >
                  <p className="relative leading-[0.75rem]">Search</p>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="grid p-8 grid-cols-4 gap-8">
          {searchResult?.map((each: IProduct, index: number) => {
            return <ProductCard product={each} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
