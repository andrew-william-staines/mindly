"use client";
import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";

const SignInModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errStat, setErrStat] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [errTrigger, setErrTrigger] = useState(0);

    useEffect(() => {
        if (errMsg) {
            setErrStat(true);
            const timer = setTimeout(() => {
                setErrStat(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errTrigger])

    const triggerError = (msg: string) => {
        setErrMsg(msg)
        setErrTrigger(prev => prev + 1)
    }

    const handleSignIn = async () => {
        try {
            const res = await fetch("http://localhost:4200/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json()

            if (res.ok) {
                setEmail('')
                setPassword('')
                localStorage.setItem("token", data.token)
                localStorage.setItem("expiry", data.expiry)
                location.href = '/home'
            } else {
                triggerError(data.message || "Signup failed. Try again.");
            }
        } catch(error) {
            triggerError("Something went wrong")
        }

    }

    return (
        <>
            {errStat && (
                <div className="alert alert-error fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-fit">
                    <span className="text-lg">{errMsg}</span>
                </div>
            )}
            <input type="checkbox" id="signin_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-3xl">
                    <div className="flex-1">
                        <a className={`btn btn-ghost text-5xl ${styles.spiraxFont}`}>Mindly</a>
                    </div>
                    <p className="py-4 ml-4 mb-8">Inspire Someone by your Stories and Writing.</p>

                    <div className="flex flex-col items-center font-sans">
                        <label htmlFor="emailBox" className="-ml-73 mb-4">Email Address</label>
                        <input type="email" id="emailBox" placeholder="abc@xyz.com" value={email}
                            onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-100 mb-7" />
                        <label htmlFor="passBox" className="-ml-81 mb-4">Password</label>
                        <input type="password" id="passBox" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-100 mb-3" />
                        <a className="text-xs ml-70 font-mono cursor-pointer" onClick={() => {
                            location.href = '/forgot'
                        }}>Forgot Password?</a>
                        <button className="btn btn-primary bg-amber-50 text-black mt-10 w-100" onClick={handleSignIn} >Sign In</button>
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
