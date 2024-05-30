import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const HomeNavbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // const userDetails = {
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "john.doe",
  //   role: {
  //     roleName: "admin",
  //   },
  // };

  useEffect(() => {
    const local_user = localStorage.getItem("user");
    if (local_user) {
      setUser(JSON.parse(local_user));
    }
  }, []);

  return (
    <>
      <nav className="flex flex-row items-center justify-between w-[80%] pt-[1rem] mx-auto gap-[8.75rem] text-[1.5rem] text-primary-300-base">
        <div className="flex flex-row p-[0.5rem] items-center justify-start gap-[0.5rem]">
          <div className="relative w-[120px] h-[90px]">
            <Image src="/images/logo.png" alt="" layout="fill" />
          </div>
          <h1 className=" leading-[2rem] flex items-center w-[auto] h-[1.5rem] shrink-0 font-bold">
            PRICE FALCON
          </h1>
        </div>

        <div className="flex flex-row items-center justify-start gap-[1.5rem] text-[1rem] font-gilroy-semibold cursor-pointer">
          <p onClick={() => router.push("/login")}>Log in</p>
          <button
            onClick={() => router.push("/signup")}
            className="rounded-81xl bg-primary-300-base w-[8.88rem] h-[2.75rem] flex flex-row py-[0.75rem] px-[1.5rem] box-border items-center justify-center gap-[0.63rem] text-neutral-white outline-none hover:opacity-[90%]"
          >
            <p className="leading-[0.75rem]">Try for free</p>
          </button>
        </div>
      </nav>
    </>
  );
};

export default HomeNavbar;
