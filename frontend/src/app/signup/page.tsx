"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import instance from "../../../services/axios";

interface ISignUp {
    email: string;
    username: string;
    password: string;
  }

const SignUpPage = () => {
    const router = useRouter();
  const [signUpData, setSignUpData] = useState<ISignUp>({
    email: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<ISignUp>({
    email: "",
    username: "",
    password: "",
  });
  const [isloading, setIsloading] = useState(false);

  const handleLoginFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors:ISignUp = {email: "", username: "", password: ""};

    // Validation logic for each field
    if (!signUpData.email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      isValid = false;
      errors.email = "Please enter a valid email address";
    }

    if (!signUpData.username) {
      isValid = false;
      errors.username = "Username is required";
    }

    if (!signUpData.password) {
      isValid = false;
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return isValid;
  };

  const SignUp = async () => {
    const isValid = validateForm();
    if (isValid) {
      setIsloading(true);
      try {
        const res = await instance.post(`/create_user`, signUpData);

        if (res.status === 201) {
          toast.success("Sign In successful", {
            position: toast.POSITION.BOTTOM_CENTER,
          });

          router.push("/login");
        } else {
          toast.error("Invalid email or password", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(
          `${
            e?.response.data?.message
              ? e?.response.data?.message
              : "Something went wrong try again later!"
          }`,
          {
            position: toast.POSITION.BOTTOM_CENTER,
          }
        );
      } finally {
        setIsloading(false);
        setSignUpData({
          email: "",
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
                  Email Address
                </label>
                <input
                  className="bg-[#F8F8F8] rounded-[5px] py-[14px] px-[8px] placeholder-text-[#A4AAB2] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#4285F4] focus:border-transparent"
                  type="text"
                  name="email"
                  placeholder="enter email here"
                  onChange={handleLoginFormChange}
                  required
                />
                <p className="text-[11px] font-Inter text-[red]">
                  {formErrors.email}
                </p>
              </div>
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
                onClick={SignUp}
              >
                Sign Up
              </button>
            </div>
            <p className="text-center text-black mt-6">
                Already have an Account?{" "}
                <span
                  className="text-[#3772D4] cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </span>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
