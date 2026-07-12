import React, { useEffect } from "react";

import Navbar from "../Shared/Navbar";
import AboutHero from "../about/AboutHero";
import WhoWeAre from "../about/WhoWeAre";
import OurStory from "../about/OurStory";
import Founder from "../about/Founder";
import Services from "../about/Services";
import WhyAruvi from "../about/WhyAruvi";
import MissionVision from "../about/MissionVision";
import TrustCertifications from "../about/TrustCertifications";
import AboutCTA from "../about/AboutCTA";
import WhatsAppFloat from "../Shared/Whatsappfloat";
import Footer from "../Shared/Footer";

export default function About() {
  useEffect(() => {
    document.title = "About Us — Aruvi Tours";
  }, []);

  return (
    <>
      <Navbar />
      <AboutHero />
      <WhoWeAre />
      <OurStory />
      <Founder />
      <Services />
      <WhyAruvi />
      <MissionVision />
      <TrustCertifications />
      <AboutCTA />
      <WhatsAppFloat />
      <Footer />
    </>
  );
}