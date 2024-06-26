import { IProduct } from "@/interface/product-model";
import React, {useState} from "react";
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import instance from "../../services/axios";
import { toast } from "react-toastify";

const SavedCard = ({ product, setReload, reload }: { product: IProduct, setReload: any, reload: any }) => {

  const handleUnsave = async (each: any) => {
    try{
        const res = await instance.delete(`/saved_item/${each.id}`, each);
        toast.success("Item unsaved successfully");
        setReload(!reload);
    }catch(err){
        console.log(err)
        toast.error("Something went wrong, try again later")
    }
  };

  return (
    <>
      <div className="w-full bg-[#EBEBEB] h-[auto] min-h-[27rem] rounded-lg p-4">
        <div className="h-[60%] w-full rounded-lg relative">
          <Image
            src={product.image}
            alt=""
            layout="fill"
            className="rounded-lg"
          />
          <div>
            <FcLike
              className="text-[2rem] absolute top-4 right-4 cursor-pointer"
              onClick={() => handleUnsave(product)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <p>{product.title}</p>

          <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-bold">{product.price}</p>
            <button
              onClick={() => window.open(product?.link, "_blank")}
              className="rounded-81xl outline-none bg-primary-300-base w-[9.88rem] h-[2.4rem] flex flex-row py-[0.75rem] px-[1rem] box-border items-center justify-center gap-[0.63rem] hover:opacity-[90%] text-white cursor-pointer"
            >
              Buy Now
            </button>
          </div>
          {product?.store === "247foods NG" && (
            <div className="flex justify-start items-center gap-1">
              <div className="relative w-[25px] h-[25px]">
                <Image
                  src="/images/ngmart-tag.svg"
                  alt="NG Mart Tag"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>from {product?.store}</p>
            </div>
          )}
          {product?.store === "Super Mart" && (
            <div className="flex justify-start items-center gap-1">
              <div className="relative w-[25px] h-[25px]">
                <Image
                  src="/images/super-mart-tag.svg"
                  alt="SuperMart Tag"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>from {product?.store}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedCard;
