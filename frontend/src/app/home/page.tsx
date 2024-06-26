"use client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "@/utils/config";
import response from "@/utils/data";
import { IProduct, NgMart, SuperMart } from "@/interface/product-model";
import Image from "next/image";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [tempResults, setTempResults] = useState<any>([]);
  const [criteria, setCriteria] = useState("");
  const [isloading, setIsloading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
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

  const handleSearch = async () => {
    if (searchTerm !== "") {
      try {
        setIsloading(true);
        const res = await instance.get(`/search?value=${searchTerm}`);

        const searchData = res.data.data;

        const ngMartResults = searchData.ngMart.map((item: NgMart) => ({
          ...item,
          source: "247foods NG",
        }));

        const superMartResults = searchData.superMart.map(
          (item: SuperMart) => ({
            ...item,
            source: "Super Mart",
            image: item.image.startsWith("https:")
              ? item.image
              : `https:${item.image}`,
          })
        );

        setSearchResult([...ngMartResults, ...superMartResults]);
        setTempResults([...ngMartResults, ...superMartResults]);
      } catch (err) {
        console.log(err);
      } finally {
        setSearchTerm("");
        setIsloading(false);
      }
    } else {
      toast.error("Please enter a product before searching");
    }
  };

  useEffect(() => {
    console.log(searchTerm, "search term");
  }, [searchTerm]);

  useEffect(() => {
    const local_user = localStorage.getItem("user");
    if (local_user) {
      setUser(JSON.parse(local_user));
    }
  }, []);

  const sortResults = (criteria: string) => {
    let sortedResults = [...tempResults];
    if (criteria === "Highest to Lowest") {
      sortedResults.sort((a, b) =>
        parseFloat(b.price.replace("₦", "").replace(",", "")) -
        parseFloat(a.price.replace("₦", "").replace(",", ""))
      );
    } else if (criteria === "Lowest to Highest") {
      sortedResults.sort((a, b) =>
        parseFloat(a.price.replace("₦", "").replace(",", "")) -
        parseFloat(b.price.replace("₦", "").replace(",", ""))
      );
    }else{
      // return default values
      sortedResults = [...tempResults];
    }
    setSearchResult(sortedResults);
  };

  const filterOptions = [
    { name: "Default", id: "Default" },
    { name: "Highest to Lowest", id: "Highest to Lowest" },
    { name: "Lowest to Highest", id: "Lowest to Highest" },
  ];

  const sitems = filterOptions.map((status) => ({
    label: status.name,
    key: status.name,
    value: status.id,
    onClick: () => {
      sortResults(status.name);
      setCriteria(status.name);
    },
  }));

  return (
    <>
      <div className="h-full bg-white p-0">
        <Navbar />
        <div className="relative [background:linear-gradient(180deg,_#1e3448_99.99%,_rgba(30,_52,_72,_0))] w-[100%] h-[26.69rem] overflow-hidden shrink-0 text-[0.88rem] text-primary-100 font-gilroy-medium flex flex-col items-center justify-center">
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
            Welcome to Price Falcon @{user?.username}
          </h2>
          <h3 className="text-[20px] leading-5 text-white mb-8">
            Search for food items, groceries etc.{" "}
          </h3>
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

        {
          searchResult.length > 0 && (
            <div className="w-full justify-end flex px-10 py-8 items-center gap-2">
            <p>Sort products by Price(N):</p>
            <Dropdown menu={{ items: sitems }}>
              <Button>
                <Space className="text-[xl]">
                  {criteria || "Sort"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          )
        }

        {!isloading && searchResult.length == 0 && (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <p className="text-[24px] text-[#0599F5]">
              Please search for an item to display results !
            </p>
          </div>
        )}

        {isloading ? (
          <div className="flex w-full h-[50vh] items-center flex-col">
            <Loader />
          </div>
        ) : (
          <div className="grid p-8 grid-cols-4 gap-8">
            {searchResult?.map((each: IProduct, index: number) => {
              return <ProductCard product={each} key={index} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
