import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-100 text-neutral-content -mt-14 items-center p-4">
            <aside className="grid-flow-col items-center">
            <a className={`btn btn-ghost text-4xl ${styles.spiraxFont}`}>Mindly</a>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <div className={`flex-none ${styles.robotoFont}`}>
                <ul className="menu menu-horizontal text-base">
                    <li className='ml-15'><a>Team Mindly</a></li>
                    <li className='ml-15'><a>Contact</a></li>
                    <li className='ml-15'><a>About</a></li>
                    <li className='ml-15'><a>Terms</a></li>
                    <li className='ml-15'><a>About</a></li>
                </ul>
            </div>
            </nav>
        </footer>
    )
}

export default Footer