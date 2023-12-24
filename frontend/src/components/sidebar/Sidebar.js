import React, { useState } from 'react'
import './Sidebar.scss'
import menu from '../../data/sideBar'
import { SiShutterstock } from "react-icons/si";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaAffiliatetheme } from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')
    }

    return (
        <div className='layout'>
            <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>

                <div className='top_section'>
                    <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
                        <SiShutterstock size={50} style={{ cursor: "pointer" }} onClick={goHome} />
                    </div>

                    <div className="bars" style={{ marginLeft: isOpen ? "100px" : "0px" }} onClick={toggle}>
                        <HiMenuAlt3 style={{ cursor: "pointer" }} />
                    </div>
                </div>
                {menu.map((item, index) => {
                    return <SidebarItem key={index} item={item} isOpen={isOpen} />
                })}
            </div>
            <main style={{ paddingLeft: isOpen ? "230px" : "60px", transition: "all .5s" }}>
                {children}
            </main>
        </div>
    )
}

export default Sidebar