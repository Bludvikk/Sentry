import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsEnvelopeAt, BsInfoSquare } from "react-icons/bs";
import { FaRedhat, FaTshirt } from "react-icons/fa";
import { MdOutlineMoreHoriz, MdOutlineSpaceDashboard, MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import { SlHome } from "react-icons/sl";

type Props = {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ show, setter }: Props) => {
  const router = useRouter();

  // Define our base class
  const className =
    "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visibility
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  type MenuItemProps = {
    icon: JSX.Element;
    name: string;
    route: string;
  };
  const MenuItem = ({ icon, name, route }: MenuItemProps) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      router.pathname === route
        ? "text-white"
        : 'text-white/50 hover:shadow-lg m-auto"';

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer ${colorClass}`}
      >
        <div className="text-2xl text-gray-600 group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
          {name}
        </h3>
      </Link>
    );
  };

  // Overlay to prevent clicks in the background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-30 flex bg-black/50 md:hidden"
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="flex p-2">
          <Link href="/">{/*eslint-disable-next-line*/}</Link>
        </div>
        <div className="peer:transition fixed -left-96 top-0 z-20 h-screen w-1/2 bg-white p-6 delay-150  duration-200 ease-out peer-focus:left-0 lg:left-0 lg:w-60">
          <div className="item-center flex flex-col justify-start">
            <h1 className="w-full cursor-pointer border-b border-gray-100 pb-4 text-center text-base font-bold text-blue-900">
              Sentry
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
            <MenuItem
              name="Dashboard"
              route="/"
              icon={<MdOutlineSpaceDashboard />}
            />
            </div>
            <div className=" my-4 border-b border-gray-100 pb-4">
            <MenuItem
              name="Settings"
              route="/settings"
              icon={<MdOutlineSettings />}
            />
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  More
                </h3>
              </div>
            </div>
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
};

export default Sidebar;
