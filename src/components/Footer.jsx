import React from "react";
import { BiCopyright } from "react-icons/bi";
import { TfiTwitter } from "react-icons/tfi";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsGlobe, BsInstagram, BsFacebook, BsFillTelephoneFill } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
function Footer() {
    const year = new Date().getFullYear();
    return (
        <section id="footer">
            <div id="contact">
                <div className="section-p1">
                    <h4>Contact Us</h4>
                    <p><strong><GrMapLocation /> </strong> ABC Building, Kanpur, Uttar Pradesh 2080XX</p>
                    <p><strong><BsFillTelephoneFill /> </strong> +91 XXXXXXXXXX</p>
                    <p><strong><MdEmail /> </strong>helpline@tradehub.in</p>
                </div>
                <div className="section-p1 follow">
                    <h4>Follow Us</h4>
                    <div className="icon">
                        <a href="https://github.com/dhruv-g04/TradeHub-frontend"><BsGlobe /></a>
                        <a href="https://www.youtube.com/"><AiOutlineYoutube /></a>
                        <a href="https://www.instagram.com/"><BsInstagram /></a>
                        <a href="https://www.facebook.com/"><BsFacebook /></a>
                        <a href="https://twitter.com/"><TfiTwitter /></a>
                    </div>
                </div>
            </div>
            <div id="copyright">
                <span className="type"><BiCopyright /> {year} TradeHub</span>
            </div>
        </section>
    )
}

export default Footer;