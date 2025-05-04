"use client";
import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import CountdownTimer from "./Countdown";

const SignUpModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfmPass, setCnfmPass] = useState("");
    const [errStat, setErrStat] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [errTrigger, setErrTrigger] = useState(0);
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [resendEnabled, setResendEnabled] = useState(false);

    useEffect(() => {
        if (errMsg) {
            setErrStat(true);
            const timer = setTimeout(() => {
                setErrStat(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errTrigger]);

    const triggerError = (msg: string) => {
        setErrMsg(msg);
        setErrTrigger(prev => prev + 1);
    };
    const handleOtp = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (email.trim() === "") {
            triggerError("Please enter an email address");
            return;
        }

        if (!emailRegex.test(email)) {
            triggerError("Invalid email format");
            return;
        }

        if (!passwordRegex.test(password)) {
            triggerError(
                "Password must be 8+ chars, include uppercase, lowercase, number & special char"
            );
            return;
        }

        if (password !== cnfmPass) {
            triggerError("Passwords do not match");
            return;
        }

        await fetch("http://localhost:4200/sign-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        setOtpSent(true)
    };

    const handleSignUp = async () => {
        try {
            const otpRes = await fetch("http://localhost:4200/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
    
            const otpData = await otpRes.json();
    
            if (!otpRes.ok) {
                triggerError(otpData.message || "OTP verification failed");
                return;
            }

            const res = await fetch("http://localhost:4200/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                setEmail('');
                setPassword('');
                setCnfmPass('');
                setOtp('');
                setOtpSent(false)
                const modalCheckbox = document.getElementById("signup_modal") as HTMLInputElement;
                if (modalCheckbox) modalCheckbox.checked = false;
                const signModal = document.getElementById("signin_modal") as HTMLInputElement;
                if (signModal) signModal.checked = true;
            } else {
                triggerError(data.message || "Signup failed. Try again.");
            }
        } catch (error) {
            triggerError("Network error. Please try again.");
        }
    };
    


    return (
        <>
            {errStat && (
                <div className="alert alert-error fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-fit">
                    <span className="text-lg">{errMsg}</span>
                </div>
            )}
            <input type="checkbox" id="signup_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-3xl">
                    <div className="flex-1">
                        <a className={`btn btn-ghost text-5xl ${styles.spiraxFont}`}>Mindly</a>
                    </div>
                    <p className="py-4 ml-4 mb-8">Show the world your emotions in words.</p>

                    <div className="flex flex-col items-center font-sans">
                        {otpSent ? <>
                            <label htmlFor="otpBox" className="-ml-45 mb-4">Verification Code</label>
                            <input
                                type="text"
                                id="otpBox"
                                placeholder="Confirm Password"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="input input-bordered w-80 mb-3"
                            />
                            <div className="flex">
                                <CountdownTimer initialSeconds={600} onExpire={() => setResendEnabled(true)} />
                                <a
                                    className={`text-xs ml-42 font-mono cursor-pointer ${!resendEnabled && 'pointer-events-none opacity-50'}`}
                                    onClick={() => {
                                        if (!resendEnabled) return;
                                        handleOtp();
                                        setResendEnabled(false);
                                    }}
                                >
                                    Resend Code
                                </a>

                            </div>
                            <button className="btn btn-primary bg-amber-50 text-black mt-10 w-80" onClick={handleSignUp}>
                                Sign Up
                            </button></> : <>
                            <label htmlFor="emailBox" className="-ml-52 mb-4">Email Address</label>
                            <input
                                type="email"
                                id="emailBox"
                                placeholder="abc@xyz.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-80 mb-7"
                            />
                            <label htmlFor="passBox" className="-ml-60 mb-4">Password</label>
                            <input
                                type="password"
                                id="passBox"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-80 mb-7"
                            />
                            <label htmlFor="cnfmPassBox" className="-ml-45 mb-4">Confirm Password</label>
                            <input
                                type="password"
                                id="cnfmPassBox"
                                placeholder="Confirm Password"
                                value={cnfmPass}
                                onChange={(e) => setCnfmPass(e.target.value)}
                                className="input input-bordered w-80 mb-3"
                            />
                            <button className="btn btn-primary bg-amber-50 text-black mt-10 w-80" onClick={handleOtp}>
                                Send OTP
                            </button></>}
                        <p className="my-6">
                            Already have an account?{" "}
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
