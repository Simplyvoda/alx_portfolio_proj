"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import instance from "../../../services/axios";
// this should be changed to be for client sign in

interface ISignIn {
  username: string;
  password: string;
}

const SignInPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<ISignIn>({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<ISignIn>({
    username: "",
    password: "",
  });
  const [isloading, setIsloading] = useState(false);

  const handleLoginFormChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors: ISignIn = { username: "", password: "" };

    // Validation logic for each field

    if (!loginData.username) {
      isValid = false;
      errors.username = "Username is required";
    }

    if (!loginData.password) {
      isValid = false;
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return isValid;
  };

  const Login = async () => {
    const isValid = validateForm();
    if (isValid) {
      setIsloading(true);
      try {
        const res = await instance.post(`/login`, loginData);

        if (res.status === 200) {
          toast.success("Sign In successful");

          console.log("Login data", res.data.data);
          const user = res.data.data;

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", user.token);

          // push user to search page
          router.push("/home");
        } else {
          toast.error("Invalid email or password");
        }
      } catch (e: any) {
        toast.error("Something went wrong try again later!");
      } finally {
        setIsloading(false);
        setLoginData({
          username: "",
          password: "",
        });
      }
    }
  };

  return (
    <div className="bg-white h-[100vh] w-full flex items-center p-[28px]">
      <div className="w-[50%] h-[100%]">
        <div className="relative w-[100%] h-[100%]">
          <Image
            alt=""
            src="/images/logo.png"
            layout="fill"
            objectFit="contain"
            className="rounded-[10px]"
          />
        </div>
      </div>
      <div className="w-[50%] h-[100%] ">
        <div className="flex flex-col min-h-[498px] min-w-[440px] items-center">
          <div className="w-[100%] h-[100%] flex flex-col  items-center mt-6">
            <div className="flex flex-row items-center w-auto mt-14">
              <div className="relative w-[100px] h-[64px] ">
                <Image
                  alt=""
                  src="/images/logo.png"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h2 className="relative font-semibold text-[#333333] text-[32px] font-[Inter]">
                Price Falcon
              </h2>
            </div>
            <form className="w-[440px] flex flex-col gap-[24px] mt-[36px]">
              <div className="flex flex-col gap-[6px] w-full">
                <label className="text-[#6C7480] font-[Inter] font-medium text-[14px]">
                  Username
                </label>
                <input
                  className="bg-[#F8F8F8] rounded-[5px] py-[14px] px-[8px] placeholder-text-[#A4AAB2] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#4285F4] focus:border-transparent"
                  type="text"
                  name="username"
                  placeholder="enter username here"
                  onChange={handleLoginFormChange}
                  required
                />
                <p className="text-[11px] font-Inter text-[red]">
                  {formErrors.username}
                </p>
              </div>
              <div className="flex flex-col gap-[6px] w-full">
                <label className="text-[#6C7480] font-[Inter] font-medium text-[14px]">
                  Password
                </label>
                <input
                  className="bg-[#F8F8F8] rounded-[5px] py-[14px] px-[8px] placeholder-text-[#A4AAB2] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#4285F4] focus:border-transparent"
                  type="password"
                  name="password"
                  placeholder="enter password here"
                  onChange={handleLoginFormChange}
                  required
                />
                <p className="text-[11px] font-Inter text-[red]">
                  {formErrors.password}
                </p>
              </div>
            </form>
            <div className="w-[440px] mt-[36px] gap-[17px] flex flex-col">
              <button
                className="w-full py-3.5 px-[46px] border-solid border-[1.5px] border-[#4285F4] text-[#4285F4] rounded-[9px]"
                onClick={Login}
              >
                Sign In
              </button>
              {/* <button className="cursor-pointer border-none py-3.5 px-[46px] bg-[#E9F1FF] rounded-[9px] flex flex-row items-center justify-center gap-[12px] w-full">
                <Image
                  className="relative w-[26px] h-[26px]"
                  alt=""
                  src="/images/logosmicrosofticon.svg"
                  width={26}
                  height={26}
                />
                <div className="relative text-[16px] font-poppins text-dodgerblue text-left text-[#4285F4]">
                  Sign in with Microsoft
                </div>
              </button> */}
              <p className="text-center text-black">
                Don&#8217;t have an Account?{" "}
                <span
                  className="text-[#3772D4] cursor-pointer"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
