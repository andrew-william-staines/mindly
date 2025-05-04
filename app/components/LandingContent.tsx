"use client";
import React from 'react'
import landing from '../assets/land.png'
import styles from './LandingContent.module.css'

const LandingContent = () => {
    return (
        <>
            <div className={`hero bg-base-300 ${styles.content}`}>
                <div className="hero-content ml-42 flex-col lg:flex-row">
                    <img
                        src={landing.src || landing}
                        alt="Landing graphic"
                        className="max-w-3xl -ml-56"
                    />
                    <div>
                        <h1 className='text-7xl mb-4 font-serif ml-24'>Unveil Thoughts</h1>
                        <h1 className='text-7xl font-serif ml-80 mb-12 underline decoration-current decoration-2 underline-offset-12'>
                            Voice Yours
                        </h1>
                        <p className='font-mono ml-28 text-xl mb-12 text-gray-300'>Place Where Your Stories Meet Others' Emotions.</p>
                        <label htmlFor="signup_modal" className="btn btn-neutral bg-amber-50 hover:bg-gray-400 ml-110 text-black text-2xl p-10 w-64 rounded-full">Get Started ➟</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingContent