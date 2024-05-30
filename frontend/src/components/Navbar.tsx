import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Navbar = () => {
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

  }, [])

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


        <div className="flex items-center gap-2 h-auto">
          <Avatar size={50} shape="square" icon={<UserOutlined />}></Avatar>
          <div className="text-sm flex flex-col h-full items-start">
            <p>@{user?.username}</p>
            <p className="text-xs">Shopper</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
