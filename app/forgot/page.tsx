'use client';
import React, { useState } from 'react';
import styles from './forgot.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleOTP = async () => {
        setMessage('');
        setError('');
        const res = await fetch('http://localhost:4200/forgot-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            setOtpSent(true);
            setMessage('OTP sent to your email.');
        } else {
            const data = await res.json();
            setError(data.message || 'Failed to send OTP.');
        }
    };

    const handleReset = async () => {
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const res = await fetch('http://localhost:4200/resetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, newPassword }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage('Password successfully reset!');
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
            setOtpSent(false);
            location.href = '/'
        } else {
            setError(data.message || 'Failed to reset password.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="mb-12">
                <a className={`btn btn-ghost text-5xl ${styles.spiraxFont}`}>Mindly</a>
            </div>
            <fieldset className="fieldset bg-base-200 border-base-300 items-center rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Forgot Password</legend>

                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}

                <label className="label">Email</label>
                <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                {otpSent && (
                    <>
                        <label className="label mt-2">OTP</label>
                        <input
                            type="text"
                            className="input"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                        />

                        <label className="label mt-2">New Password</label>
                        <input
                            type="password"
                            className="input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                        />

                        <label className="label mt-2">Confirm Password</label>
                        <input
                            type="password"
                            className="input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                    </>
                )}

                <button
                    className="btn btn-neutral mt-4"
                    onClick={otpSent ? handleReset : handleOTP}
                >
                    {otpSent ? 'Reset Password' : 'Send OTP'}
                </button>
            </fieldset>
        </div>
    );
};

export default ForgotPassword;
