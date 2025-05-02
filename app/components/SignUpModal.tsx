"use client";
import React from "react";
import styles from "./NavBar.module.css";

const SignUpModal = () => {
    return (
        <>
            <input type="checkbox" id="signup_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-3xl">
                    <div className="flex-1">
                        <a className={`btn btn-ghost text-5xl ${styles.spiraxFont}`}>Mindly</a>
                    </div>
                    <p className="py-4 ml-4 mb-8">Show the world your emotions in words.</p>

                    <div className="flex flex-col items-center font-sans">
                        <label htmlFor="emailBox" className="-ml-73 mb-4">Email Address</label>
                        <input type="email" id="emailBox" placeholder="abc@xyz.com" className="input input-bordered w-100 mb-7" />
                        <label htmlFor="passBox" className="-ml-81 mb-4">Password</label>
                        <input type="password" id="passBox" placeholder="Password" className="input input-bordered w-100 mb-7" />
                        <label htmlFor="cnfmPassBox" className="-ml-65 mb-4">Confirm Password</label>
                        <input type="password" id="cnfmPassBox" placeholder="Password" className="input input-bordered w-100 mb-3" />
                        <button className="btn btn-primary bg-amber-50 text-black  mt-10 w-100">Sign up</button>
                        <p className="my-6">
                            Already Have An Account?{" "}
                            <label
                                htmlFor="signin_modal"
                                className="underline cursor-pointer"
                                onClick={() => {
                                    const signupCheckbox = document.getElementById("signup_modal") as HTMLInputElement;
                                    if (signupCheckbox) signupCheckbox.checked = false;
                                }}
                            >
                                Sign in
                            </label>
                        </p>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="signup_modal"></label>
            </div>
        </>
    );
};

export default SignUpModal;
