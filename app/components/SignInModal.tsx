"use client";
import React from "react";
import styles from "./NavBar.module.css";

const SignInModal = () => {
    return (
        <>
            <input type="checkbox" id="signin_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-3xl">
                    <div className="flex-1">
                        <a className={`btn btn-ghost text-5xl ${styles.spiraxFont}`}>Mindly</a>
                    </div>
                    <p className="py-4 ml-4 mb-8">Inspire Someone by your Stories and Writing.</p>

                    <div className="flex flex-col items-center font-sans">
                        <label htmlFor="emailBox" className="-ml-73 mb-4">Email Address</label>
                        <input type="email" id="emailBox" placeholder="abc@xyz.com" className="input input-bordered w-100 mb-7" />
                        <label htmlFor="passBox" className="-ml-81 mb-4">Password</label>
                        <input type="password" id="passBox" placeholder="Password" className="input input-bordered w-100 mb-3" />
                        <a className="text-xs ml-70 font-mono cursor-pointer">Forgot Password?</a>
                        <button className="btn btn-primary bg-amber-50 text-black mt-10 w-100">Sign In</button>
                        <p className="my-6">
                            Don't have an account?{" "}
                            <label
                                htmlFor="signup_modal"
                                className="underline cursor-pointer"
                                onClick={() => {
                                    const signinCheckbox = document.getElementById("signin_modal") as HTMLInputElement;
                                    if (signinCheckbox) signinCheckbox.checked = false;
                                }}
                            >
                                Sign up
                            </label>
                        </p>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="signin_modal"></label>
            </div>
        </>
    );
};

export default SignInModal;
