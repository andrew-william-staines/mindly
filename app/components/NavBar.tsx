import React from "react";
import styles from "./NavBar.module.css";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

const NavBar = () => {
  return (
    <>
      <div className="navbar bg-base-100 p-12 shadow-sm shadow-amber-50">
        <div className="flex-1">
          <a className={`btn btn-ghost text-5xl ${styles.spiraxFont}`}>Mindly</a>
        </div>
        <div className={`flex-none ${styles.robotoFont}`}>
          <ul className="menu menu-horizontal px-1 text-xl">
            <li className="ml-15 mt-1"><a>Features</a></li>
            <li className="ml-15 mt-1"><a>Contact Team</a></li>
            <li className="ml-15 mt-1"><a>Write</a></li>
            <li className="ml-15">
              <label htmlFor="signin_modal" className="btn btn-neutral bg-amber-50 hover:bg-gray-400 text-black text-xl p-6 w-52 rounded-full">
                Sign In
              </label>
            </li>
          </ul>
        </div>
      </div>
      <SignInModal />
      <SignUpModal />
    </>
  );
};

export default NavBar;
