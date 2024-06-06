"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import instance from "../../../services/axios";
import { toast } from "react-toastify";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/interface/product-model";
import SavedCard from "@/components/SavedCard";
import Loader from "@/components/Loader";

const page = () => {
  const [user, setUser] = useState<any>(null);
  const [savedItems, setSavedItems] = useState<any>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    const local_user = localStorage.getItem("user");
    if (local_user) {
      setUser(JSON.parse(local_user));
    }
  }, []);

  useEffect(() => {
    async function getSavedItems() {
      setIsloading(true);
      try {
        const res = await instance.get("/saved_items");
        if (res.status === 200 || res.status === 201) {
          const saved_items = res.data.data;
          const savedResults = saved_items.map((item: IProduct) => ({
            ...item,
            image: item.image.startsWith("https:")
              ? item.image
              : `https:${item.image}`,
          }));

          setSavedItems(savedResults);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    }
    getSavedItems();
  }, [reload]);

  return (
    <>
      <Navbar />

      <div className="relative [background:linear-gradient(180deg,_#1e3448_99.99%,_rgba(30,_52,_72,_0))] w-[100%] h-[15.69rem] overflow-hidden shrink-0 text-[0.88rem] text-primary-100 font-gilroy-medium flex flex-col items-center justify-center">
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
        <h2 className="text-[35px] leading-5 text-white mb-8">
          These are items you loved ! @{user?.username}
        </h2>
      </div>
      {isloading ? (
        <div className="flex w-full h-[50vh] items-center flex-col">
            <Loader text="Loading..."/>
        </div>
      ) : (
        <div className="grid p-8 grid-cols-4 gap-8">
          {savedItems?.map((each: IProduct, index: number) => {
            return (
              <SavedCard
                key={index}
                product={each}
                reload={reload}
                setReload={setReload}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default page;
