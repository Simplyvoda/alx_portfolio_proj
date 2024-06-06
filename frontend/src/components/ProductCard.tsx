import { IProduct } from "@/interface/product-model";
import React, {useEffect, useState } from "react";
import Image from "next/image";
// import instance from "../../services/axios";
import { BASE_API_URL } from "@/utils/config";
import { toast } from "react-toastify";
import axios from "axios";

const ProductCard = ({ product }: { product: IProduct }) => {
  const [token, setToken] = useState<any>();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const instance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSaveItem = async (each: any) => {
    console.log(each)
    const data = {
      ...each,
      store: each.source
    }
    try {
      const res = await instance.post(`/save_item`, data);
      console.log(res, "save response");
      toast.success("Item saved successfully");
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
      toast.error("Try again later");
    }
  };
  return (
    <>
      <div
        className="w-full bg-[#EBEBEB] h-[auto] min-h-[27rem] rounded-lg p-4"
  
      >
        <div className="h-[60%] w-full rounded-lg relative">
          <Image
            src={product.image}
            alt=""
            layout="fill"
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <p>{product.title}</p>

          <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-bold">{product.price}</p>
            <div className="w-full flex flex-row justify-end gap-3">
              <button
                onClick={() => window.open(product?.link, "_blank")}
                className="rounded-81xl outline-none bg-primary-300-base w-[6.4rem] h-[2.4rem] flex flex-row py-[0.75rem] px-[1rem] box-border items-center justify-center gap-[0.63rem] hover:opacity-[90%] text-white cursor-pointer"
              >
                Buy Now
              </button>
              <button
                onClick={() => handleSaveItem(product)}
                className="rounded-81xl outline-none bg-[#F7F8FA] w-[5.4rem] h-[2.4rem] flex flex-row py-[0.75rem] px-[1rem] box-border items-center justify-center gap-[0.63rem] hover:opacity-[90%] text-[#555758] border-[1px] border-[#555758] cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
          {product.source === "247foods NG" && (
            <div className="flex justify-start items-center gap-1">
              <div className="relative w-[25px] h-[25px]">
                <Image
                  src="/images/ngmart-tag.svg"
                  alt="NG Mart Tag"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>from {product.source}</p>
            </div>
          )}
          {product.source === "Super Mart" && (
            <div className="flex justify-start items-center gap-1">
              <div className="relative w-[25px] h-[25px]">
                <Image
                  src="/images/super-mart-tag.svg"
                  alt="SuperMart Tag"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>from {product.source}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
