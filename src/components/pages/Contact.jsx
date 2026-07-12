import React, { useEffect } from "react";
import Navbar from "../Shared/Navbar";
import ContactHero from "../contact/ContactHero";
import InfoCards from "../contact/InfoCards";
import ContactFormSection from "../contact/ContactFormSection";
import MapSection from "../contact/MapSection";
import Newsletter from "../contact/Newsletter";
import Social from "../contact/Social";
import ContactCTA from "../contact/ContactCTA";
import WhatsAppFloat from "../Shared/Whatsappfloat";
import Footer from "../Shared/Footer";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us â€” Aruvi Tours";
  }, []);

  return (
    <>
      <Navbar />
      <ContactHero />
      <InfoCards />
      <ContactFormSection />
      <MapSection />
      <Newsletter />
      <Social />
      <ContactCTA />
      <WhatsAppFloat />
      <Footer />
    </>
  );
}
