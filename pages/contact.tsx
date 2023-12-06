// pages/contact.js
import React, { useState } from 'react';
import Navbar from "@/components/navbar/NavBar";
import Image from "next/image";
import Logo from "../public/logo-svg.svg";
import ModalWindow from "@/components/DemoPage/ModalWindow";
import ContactForm from "@/components/DemoPage/ContactForm";

const ContactPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleFormSuccess = () => {
        setIsModalVisible(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-linear-gradient-start to-linear-gradient-end flex flex-col">
            <Navbar/>
            <ModalWindow isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}/>
            <div className="flex flex-grow flex-col items-center justify-center pt-16 pb-6">
                <Image src={Logo} alt="Logo" width={50} height={50}/>
                <div className="mt-10 w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center">Contact Us</h2>
                    <ContactForm onSuccessfulSubmit={handleFormSuccess} />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
