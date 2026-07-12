import React, { useEffect, useState } from "react";

import Navbar from "../Shared/Navbar";
import Hero from "../home/hero.jsx";
import Stats from "../home/stats.jsx";
import Story from "../home/story.jsx";
import HowItWorks from "../home/Howitworks.jsx";
import ExperienceGrid from "../home/Experiencegrid.jsx";
import Packages from "../home/Packages.jsx";
import WhyChooseUs from "../home/Whychooseus.jsx";
import FeaturedDestinations from "../home/Featureddestinations.jsx";
import TravelerGallery from "../home/Travelergallery.jsx";
import Testimonials from "../home/Testimonials.jsx";
import ProofStrip from "../home/Proofstrip.jsx";
import TravelJournal from "../home/Traveljournal.jsx";
import FAQ from "../home/Faq.jsx";
import FinalCTA from "../home/Finalcta.jsx";
import Footer from "../Shared/Footer";
import WhatsAppFloat from "../Shared/Whatsappfloat";
import BookingModal from "../home/BookingModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDest, setModalDest] = useState("");
  const [pkgFilter, setPkgFilter] = useState("all");

  const openBooking = (dest) => {
    setModalDest(dest || "");
    setModalOpen(true);
  };

  const handleFilterFromExperience = (filter) => {
    setPkgFilter(filter);
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar onBookNow={() => openBooking("")} />
      <Hero onFindPackages={({ dest }) => openBooking(dest)} />
      <Stats />
      <Story />
      <HowItWorks />
      <ExperienceGrid onFilter={handleFilterFromExperience} />
      <Packages activeFilter={pkgFilter} onFilterChange={setPkgFilter} />
      <WhyChooseUs />
      <FeaturedDestinations />
      <TravelerGallery />
      <Testimonials />
      <ProofStrip />
      <TravelJournal />
      <FAQ />
      <FinalCTA onBookNow={openBooking} />
      <Footer />
      <WhatsAppFloat />
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} initialDest={modalDest} />
    </>
  );
}