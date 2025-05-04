"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './NavBar.module.css';
import { useRouter } from 'next/navigation';
import { User, Settings, LogOut, Pencil } from 'lucide-react';

const HomeBar = () => {
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current &&
                avatarRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !avatarRef.current.contains(event.target as Node)) {
                setDropdown(false);
            }
        };

        if (dropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdown]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    const handleWriteClick = () => {
        router.push("/write");
    };

    return (
        <>
            <div className="navbar bg-base-100 p-6 shadow-sm shadow-amber-50">
                <div className="flex-1">
                    <a className={`btn btn-ghost text-4xl ${styles.spiraxFont}`}>Mindly</a>
                </div>
                <div className={`flex-none ${styles.robotoFont}`}>
                    <ul className="menu menu-horizontal px-1 text-lg">
                        <li className="-mr-12 flex flex-row mt-2 cursor-pointer" onClick={handleWriteClick}>
                            <div className="flex items-center gap-1">
                                <Pencil className="h-5 w-5" />
                                <a>Write</a>
                            </div>
                        </li>
                        <li className="ml-15 cursor-pointer" onClick={() => {
                            setDropdown(prev => !prev)
                        }}>
                            <div ref={avatarRef} className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="User Avatar" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {dropdown && (
                <ul
                    ref={dropdownRef}
                    className="menu bg-base-100 rounded-box w-56 absolute top-20 right-6 z-50 shadow-lg transition-all duration-300"
                >
                    <li>
                        <a
                            onClick={() => {
                                setDropdown(false);
                                router.push("/profile");
                            }}
                        >
                            <User className="w-4 h-4 mr-2" /> Profile
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                setDropdown(false);
                                router.push("/settings");
                            }}
                        >
                            <Settings className="w-4 h-4 mr-2" /> Settings
                        </a>
                    </li>
                    <li className='text-red-300'>
                        <a
                            onClick={() => {
                                setDropdown(false);
                                handleLogout();
                            }}
                        >
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                        </a>
                    </li>
                </ul>
            )}

        </>
    );
};

export default HomeBar;
