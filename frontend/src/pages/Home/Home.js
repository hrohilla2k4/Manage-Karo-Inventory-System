import React from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom"
import "./Home.scss"
import heroImg from "../../assets/inv-img.png"
import { ShownOnLogout, ShowOnLogin } from "../../components/protect/hiddenLinks";

const Home = () => {
    return (
        <div className="home">
            <nav className="container --flex-between">
                <div className="logo">
                    <MdManageAccounts size={35} />
                </div>
                <ul className="home-links">
                    <ShownOnLogout>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ShownOnLogout>

                    <ShownOnLogout>
                        <li>
                            <button className="--btn --btn-primary">
                                <Link to="/login">Login</Link>
                            </button>
                        </li>
                    </ShownOnLogout>
                    <ShowOnLogin>
                        <li>
                            <button className="--btn --btn-primary">
                                <Link to="/dashboard">Dashboard</Link>
                            </button>
                        </li>
                    </ShowOnLogin>
                </ul>

            </nav>
            {/* Hero Section */}

            <section className="container hero">

                <div className="hero-text">

                    <h2>Inventory & Stock Management Solution</h2>
                    <p>Inventory system to control and manage products in the warehouse in real time</p>

                    <div className="hero-buttons">
                        <button className="--btn --btn-secondary">Free Trial 1 Week
                        </button>
                    </div>

                    <div className="--flex-start">
                        <NumberText num="20k" text="Brand Owners" />
                        <NumberText num="33k" text="Active Users" />
                        <NumberText num="500+" text="Partners" />
                    </div>
                </div>

                <div className="hero-image">
                    <img src={heroImg} alt="" />
                </div>
            </section>


        </div >
    )
};

const NumberText = ({ num, text }) => {
    return (
        <div className="--mr">
            <h3 className="--color-white">{num}</h3>
            <p className="--color-white">{text}</p>
        </div>
    )
}

export default Home