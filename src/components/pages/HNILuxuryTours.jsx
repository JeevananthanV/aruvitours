import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plane,
  Ship,
  Compass,
  MapPin,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  PhoneCall,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Gem,
  Camera,
  Heart,
  FileCheck,
  Activity,
  ArrowRight,
  Utensils,
  Gauge,
  Sparkles,
  Milestone
} from "lucide-react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

// Beautiful Unsplash luxury asset images
const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1600&auto=format&fit=crop",
    category: "PRIVATE JET CHARTERS",
    title: "Sovereign Sky Travel",
    desc: "Take off on your schedule with custom routes, elite gourmet dining, and absolute discretion."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1600&auto=format&fit=crop",
    category: "EXCLUSIVE OVERWATER VILLAS",
    title: "Maldivian Sanctuary",
    desc: "Plunge into absolute blue. Complete island buyout options with private butler and seaplane transfers."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1600&auto=format&fit=crop",
    category: "SUPERYACHT CHARTERS",
    title: "Mediterranean Bliss",
    desc: "Navigate remote archipelagos aboard full-crew mega yachts with onboard chefs and jet-ski fleets."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1508444072991-791154c120c5?q=80&w=1600&auto=format&fit=crop",
    category: "HELICOPTER LANDINGS",
    title: "Alpine Peaks & Valleys",
    desc: "Land directly on remote glaciers for private skiing or secluded mountainside champagne picnics."
  }
];

const LUXURY_EXPERIENCES = [
  {
    id: "private-jets",
    category: "air",
    title: "Private Jets",
    tagline: "Ultra-long range global aviation",
    desc: "Access over 5,000 private airfields worldwide. Complete privacy, zero terminal queues, and custom bespoke dining curation.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop",
    specs: ["Global Range", "Discreet Security", "Michelin In-Flight", "Pet-Friendly Cabin"]
  },
  {
    id: "luxury-cruises",
    category: "marine",
    title: "Luxury Cruises",
    tagline: "Ultra-luxury ocean & river voyages",
    desc: "Set sail on all-suite boutique cruises with 1:1 guest-to-staff ratios, private verandas, and custom destination excursions.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    specs: ["All-Suite Ships", "Private Balconies", "All-Inclusive Premium", "Expert Historians"]
  },
  {
    id: "yacht-charter",
    category: "marine",
    title: "Yacht Charter",
    tagline: "Custom bespoke seafaring",
    desc: "Charter pristine mega-yachts. Wake up in a new secluded bay each morning, completely customized by your private captain.",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop",
    specs: ["Dedicated Crew", "Water Toy Fleet", "Private Onboard Chef", "Tailored Routes"]
  },
  {
    id: "helicopter-tours",
    category: "air",
    title: "Helicopter Tours",
    tagline: "Aerial precision and access",
    desc: "Reach inaccessible crater rims, hidden glaciers, and private estates. Skip ground traffic entirely in twin-engine luxury helicopters.",
    image: "https://images.unsplash.com/photo-1508444072991-791154c120c5?q=80&w=800&auto=format&fit=crop",
    specs: ["Twin-Engine Safety", "Active Noise Control", "VIP Tarmac Pickup", "Aerial Photography"]
  },
  {
    id: "exclusive-villas",
    category: "villa",
    title: "Exclusive Villas",
    tagline: "Total private sanctuary buyouts",
    desc: "Unrivaled estates from clifftop Bali compounds to historic Tuscan castles. Fully staffed with private pool and estate security.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop",
    specs: ["Full-Time Household", "Infinite Edge Pool", "Secure Gated Compound", "Private Wellness Spa"]
  },
  {
    id: "safari-experiences",
    category: "villa",
    title: "Safari Experiences",
    tagline: "Immersive private reserves",
    desc: "Bespoke safaris in fenced concessions with private land-cruisers, dedicated master trackers, and ultra-luxe glamping pavilions.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    specs: ["Private Concession", "Photographic Vehicles", "Luxury Tented Lodges", "Sundowners by Heli"]
  }
];

const FLIGHT_ROUTES = {
  "Salem (SXV)": {
    "Maldives (MLE)": { distance: "1,750 km", duration: "2h 15m", routeName: "Laccadive Sea Corridor", desc: "A direct premium flight over the Laccadive Sea, landing straight at Velana International's private seaplane FBO terminal." },
    "Bali (DPS)": { distance: "4,500 km", duration: "5h 45m", routeName: "Equatorial Jetway", desc: "A smooth equatorial flight path over the southern bay of Bengal, landing in Denpasar with fast-track VIP customs." },
    "Dubai (DXB)": { distance: "2,900 km", duration: "4h 00m", routeName: "Arabian Gulf Skyway", desc: "Bypassing high-altitude jet streams for an ultra-smooth ride, descending directly to Al Maktoum Private Jet Terminal." },
    "Zermatt (GVA)": { distance: "7,400 km", duration: "9h 15m", routeName: "Sovereign Trans-continental", desc: "Trans-continental voyage equipped with active turbulence dampening, landing in Geneva with heli transfer to Zermatt ready on the tarmac." },
    "Kyoto (KIX)": { distance: "6,200 km", duration: "7h 45m", routeName: "Imperial Horizon", desc: "Pacific rim flight route featuring panoramic sunrise windows over the East China Sea." }
  },
  "Chennai (MAA)": {
    "Maldives (MLE)": { distance: "1,200 km", duration: "1h 40m", routeName: "Tropical Express", desc: "Immediate luxury sprint with light catering, descending above beautiful Maldives coral reef structures." },
    "Bali (DPS)": { distance: "4,200 km", duration: "5h 15m", routeName: "Sunda Strait Path", desc: "Scenic flight path over northern Sumatra and Java islands, complete with personalized cabin butler service." },
    "Dubai (DXB)": { distance: "2,950 km", duration: "4h 10m", routeName: "Westward Crest", desc: "A majestic westward journey. Perfect timing for a curated multi-course wine pairing dinner in the sky." },
    "Zermatt (GVA)": { distance: "7,600 km", duration: "9h 30m", routeName: "Eurasian Meridian", desc: "Deep intercontinental voyage with active flatbed cabin layout, landing in Geneva's signature executive terminal." },
    "Kyoto (KIX)": { distance: "5,900 km", duration: "7h 15m", routeName: "Rising Sun Direct", desc: "Optimal direct route over East Asian islands with elite sleeping pods and soundproof cabin environments." }
  },
  "Bangalore (BLR)": {
    "Maldives (MLE)": { distance: "1,100 km", duration: "1h 35m", routeName: "Deccan Southern Spur", desc: "The fastest direct escape to overwater bliss. Includes private seaplane gate-side check-in." },
    "Bali (DPS)": { distance: "4,300 km", duration: "5h 30m", routeName: "Andaman Sky-arch", desc: "Beautiful cruise altitude above the Andaman and Nicobar archipelagos, with customizable ambient sleep lighting." },
    "Dubai (DXB)": { distance: "2,850 km", duration: "3h 55m", routeName: "Sultans Jetstream", desc: "Breeze past commercial queues with a seamless tech-integrated pre-flight departure lounge experience." },
    "Zermatt (GVA)": { distance: "7,350 km", duration: "9h 05m", routeName: "Glacier Summit Route", desc: "Direct trans-continental long range flight featuring standard master bed configuration and walk-in dressing suite." },
    "Kyoto (KIX)": { distance: "6,050 km", duration: "7h 35m", routeName: "Pacific Silk Road", desc: "Overnight luxury flight designed for perfect sleep rest, waking up just as cherry blossom peaks appear below." }
  },
  "Mumbai (BOM)": {
    "Maldives (MLE)": { distance: "1,650 km", duration: "2h 05m", routeName: "Oceanic Meridian", desc: "A direct southward jet flight path over the Arabian sea, with personal lounge butler welcome upon arrival." },
    "Bali (DPS)": { distance: "4,800 km", duration: "6h 15m", routeName: "Java Sea Corridor", desc: "Long-haul regional cruise route fully serviced by your private chef's custom culinary preferences." },
    "Dubai (DXB)": { distance: "2,000 km", duration: "2h 50m", routeName: "Gulf Super-Express", desc: "Quick premium corridor across the Arabian Gulf, popular for private executive travel and shopping excursions." },
    "Zermatt (GVA)": { distance: "6,800 km", duration: "8h 15m", routeName: "Alpine Crossings", desc: "High-speed high-efficiency flight path over Eastern Europe, descending alongside Switzerland's finest glaciers." },
    "Kyoto (KIX)": { distance: "6,600 km", duration: "8h 10m", routeName: "Ryokan Skyway", desc: "Bespoke high-altitude flight across the Himalayas and East Asian ranges, completely noise-isolated." }
  }
};

const AIRCRAFT_FLEET = {
  "Bombardier Global 7500": {
    range: "14,260 km",
    speed: "Mach 0.925",
    capacity: "Up to 19 guests",
    desc: "The absolute benchmark of long-range business aviation. Features 4 living areas, fully equipped kitchen, crew rest, and master bedroom.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=400"
  },
  "Gulfstream G650ER": {
    range: "13,890 km",
    speed: "Mach 0.90",
    capacity: "Up to 16 guests",
    desc: "Renowned for its low cabin altitude (4,100 ft) and 100% fresh air replenishment. Features trademark large oval windows for gorgeous sunsets.",
    image: "https://images.unsplash.com/photo-1508444072991-791154c120c5?q=80&w=400"
  },
  "Dassault Falcon 8X": {
    range: "11,945 km",
    speed: "Mach 0.90",
    capacity: "Up to 14 guests",
    desc: "Outstanding short-field takeoff and landing capabilities, allowing access to smaller or restricted airfields closer to your ultimate estate.",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=400"
  }
};

const GASTRONOMY_OPTIONS = [
  { name: "Michelin Caviar & Dom Pérignon", desc: "Selected Imperial Beluga Caviar with traditional garnishes and perfectly chilled Dom Pérignon 2012 champagne." },
  { name: "Bespoke Wagyu Kaiseki & Yamazaki", desc: "Grade A5 Miyazaki Wagyu beef skewers, customized sushi roll platter, and vintage Yamazaki single-malt whisky." },
  { name: "Organic Mediterranean & Margaux", desc: "Premium organic charcuterie board, Greek olive selection, artisan truffle cheeses, and Chateau Margaux 2009." },
  { name: "Wellness Plant-Based & Elixirs", desc: "Superfood organic salad bowls, custom clean-pressed cold juices, and specialized herbal tea wellness matchas." }
];

const FEATURED_DESTINATIONS = [
  {
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    highlight: "Sayan Gorge Estates & Spiritual Retreats",
    tag: "Tropical Haven"
  },
  {
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop",
    highlight: "Private Island Hideaways & Aqua Dining",
    tag: "Ocean Paradise"
  },
  {
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    highlight: "Penthouse Penthouses & Private Desert Dunes",
    tag: "Modern Royalty"
  },
  {
    name: "Switzerland",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop",
    highlight: "Zermatt Mountain Chalets & Glacier Flights",
    tag: "Alpine Grandeur"
  },
  {
    name: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    highlight: "Bespoke Ryokans & Kyoto Tea Ceremony Masterclasses",
    tag: "Imperial Heritage"
  },
  {
    name: "Iceland",
    image: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?q=80&w=800&auto=format&fit=crop",
    highlight: "Northern Lights Glass Domes & Volcanic Spas",
    tag: "Elemental Rawness"
  },
  {
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    highlight: "Infinity Caldera Suites & Private Yacht Cruising",
    tag: "Aegean Elegance"
  },
  {
    name: "Africa Safari",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    highlight: "Singita Reserves & Private Luxury Flights",
    tag: "Wild Wilderness"
  }
];

const SIGNATURE_PACKAGES = [
  {
    id: "bali-escape",
    title: "7 Days Bali Sovereign Escape",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    duration: "7 Days / 6 Nights",
    rating: "5.0",
    luxuryLevel: "Imperial Estate",
    price: "From $14,200",
    highlights: ["Private Clifftop Mansion", "Personal Chauffeur with Maybach S-Class", "Helicopter Transfer to Nusa Penida", "Private Villa Chef & Spa Therapist"]
  },
  {
    id: "swiss-luxury",
    title: "10 Days Switzerland Royal Chalet Tour",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop",
    duration: "10 Days / 9 Nights",
    rating: "4.9",
    luxuryLevel: "Presidential Sovereign",
    price: "From $28,500",
    highlights: ["Private Alpine Chalet Buyout", "Glacier Helicopter Skiing & Picnic", "Scenic GoldenPass Yacht-Carriage", "24/7 Security & Chauffeur Fleet"]
  },
  {
    id: "maldives-retreat",
    title: "8 Days Maldives Aqua Overwater Retreat",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800&auto=format&fit=crop",
    duration: "8 Days / 7 Nights",
    rating: "5.0",
    luxuryLevel: "Elite Pavilion",
    price: "From $21,900",
    highlights: ["Ultra-Luxury Overwater Residence", "Bespoke Seaplane Transfer", "Private Sandbank Candlelit Dinner", "Personal 24-Hour Butler Support"]
  },
  {
    id: "european-grand",
    title: "14 Days European Grand Horizon Tour",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    duration: "14 Days / 13 Nights",
    rating: "5.0",
    luxuryLevel: "Monarch Sovereign",
    price: "From $42,000",
    highlights: ["London to Riviera Private Air Transit", "Historic Palace & Castle Bookings", "Private Gallery Viewings in Paris", "Superyacht Evening Cruise in Monaco"]
  },
  {
    id: "japan-cherry",
    title: "9 Days Private Japan Imperial Cherry Blossom",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    duration: "9 Days / 8 Nights",
    rating: "5.0",
    luxuryLevel: "Royal Ryokan",
    price: "From $19,800",
    highlights: ["Exclusive Historic Ryokan Buyout", "Elite Geisha Evening Curated", "Private Shinkansen Green Car Charter", "Michelin Guide Dining Portfolio"]
  }
];

const WHY_CHOOSE_US = [
  {
    title: "★★★★★ Rated",
    desc: "Consistently voted 'Best Elite Boutique Travel Agency' by luxury travel publications.",
    icon: Star
  },
  {
    title: "Personal Travel Advisor",
    desc: "A dedicated destination architect designs, plans, and monitors your journey.",
    icon: Compass
  },
  {
    title: "VIP Airport Assistance",
    desc: "Fast-track passport control, VIP tarmac transfers, and private lounge access globally.",
    icon: ShieldCheck
  },
  {
    title: "Luxury Chauffeur",
    desc: "An immaculate fleet of Rolls-Royce, Maybach, and Range Rovers with highly trained drivers.",
    icon: Award
  },
  {
    title: "5 Star Hotels Only",
    desc: "We work exclusively with Aman, Belmond, One&Only, Rosewood, and ultra-exclusive estates.",
    icon: Gem
  },
  {
    title: "24/7 Global Concierge",
    desc: "An instant-response concierge desk handles helicopter changes, spa bookings, or medical needs.",
    icon: Clock
  },
  {
    title: "Elite Private Guide",
    desc: "Highly connected local experts secure skip-the-line privileges and backroom museum access.",
    icon: Users
  },
  {
    title: "100% Custom Itineraries",
    desc: "Every second tailored to your personal preferences. No templates, completely unique.",
    icon: Briefcase
  }
];

const TESTIMONIALS = [
  {
    quote: "Aruvi Tours coordinated a flawless private jet and yacht expedition through the Maldives and Bali. The attention to detail, from security checkpoints to the specific vintage wines in our villa, was exemplary.",
    author: "Sir Richard H.",
    title: "Sovereign Club Member",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The Swiss Alps holiday was spectacular. Landing on a remote glacier for a private champagne lunch orchestrated by our guide was a memory our family will cherish forever. Uncompromising service.",
    author: "Eleanor & Charles P.",
    title: "Private Family Clients",
    location: "Geneva, Switzerland",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Our corporate retreat required absolute security and discretion. Aruvi Tours secured a spectacular estate buyout in Kyoto and managed a highly complex helicopter logistics chain with perfect execution.",
    author: "Kenji T.",
    title: "CEO, Venture Horizon Group",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
  }
];

const TIMELINE_STEPS = [
  {
    num: "01",
    title: "Curated Consultation",
    desc: "Connect virtually or in person with your personal luxury travel architect to map out core preferences, security needs, and dream landmarks."
  },
  {
    num: "02",
    title: "Bespoke Architectural Proposal",
    desc: "Receive three highly detailed routing variations matching your cadence, including private charter routes and custom luxury estate buyouts."
  },
  {
    num: "03",
    title: "Elite Asset Allocation",
    desc: "We secure exclusive private jet flight numbers, luxury yachts, premier Michelin chefs, and fast-track airport customs logistics."
  },
  {
    num: "04",
    title: "Seamless Tarmac Journey",
    desc: "Step directly from your private jet or lounge into your waiting chauffeur fleet. Experience your holiday backed by our active global command team."
  },
  {
    num: "05",
    title: "Post-Travel Concierge",
    desc: "We handle your luggage return, customs clearances, and store your travel profile preferences for future handcrafted voyages."
  }
];

const INSTAGRAM_PHOTOS = [
  "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508444072991-791154c120c5?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400&auto=format&fit=crop"
];

const CHECKLIST_ITEMS = [
  { id: "jet", label: "Private Jet Booking & FBO Fast-track", icon: Plane },
  { id: "yacht", label: "Mega Yacht Yacht Charter Custom Booking", icon: Ship },
  { id: "wedding", label: "Wedding & Ultra-luxe Honeymoon Coordination", icon: Heart },
  { id: "corp", label: "Corporate Luxury Retreats & Team Buyouts", icon: Briefcase },
  { id: "celeb", label: "Discreet Celebrity Tours & Security Detail", icon: ShieldCheck },
  { id: "visa", label: "Expedited High-Level Visa & Embassy Assistance", icon: FileCheck },
  { id: "chauffeur", label: "24/7 Bulletproof / Elite Chauffeur Fleet", icon: Award },
  { id: "butler", label: "Personal Luxury Butler & Lifestyle Concierge", icon: Users },
  { id: "photo", label: "Private Documentary Photographer & Videographer", icon: Camera }
];

export default function HNILuxuryTours() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [selectedProfile, setSelectedProfile] = useState([]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    duration: "1 Week",
    scale: "Ultra-Premium",
    notes: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Modern UI states
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDeparture, setSelectedDeparture] = useState("Salem (SXV)");
  const [selectedArrival, setSelectedArrival] = useState("Maldives (MLE)");
  const [selectedAircraft, setSelectedAircraft] = useState("Bombardier Global 7500");
  const [selectedGastronomy, setSelectedGastronomy] = useState("Michelin Caviar & Dom Pérignon");
  const [lockedFlight, setLockedFlight] = useState(false);
  const [activeSection, setActiveSection] = useState("experiences");

  const formSectionRef = useRef(null);

  // Hook for mouse movement cursor glow
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Autoplay hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Scroll section tracking for the premium floating nav-rail
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 320;
      const sections = ["experiences", "destinations", "route-simulator", "packages", "why-choose-us", "timeline", "profile-builder", "booking"];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme overrides for navbar and general styling
  useEffect(() => {
    document.body.classList.add("hni-luxury-theme");
    return () => {
      document.body.classList.remove("hni-luxury-theme");
    };
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const toggleProfileItem = (id) => {
    if (selectedProfile.includes(id)) {
      setSelectedProfile(selectedProfile.filter((x) => x !== id));
    } else {
      setSelectedProfile([...selectedProfile, id]);
    }
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openInquiryForPackage = (pkg) => {
    setSelectedPackage(pkg);
    setFormData((prev) => ({
      ...prev,
      destination: pkg.title,
      notes: `Curious about the signature package: ${pkg.title} (${pkg.luxuryLevel}).`
    }));
    setInquiryModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setInquiryModalOpen(false);
      setSelectedPackage(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        duration: "1 Week",
        scale: "Ultra-Premium",
        notes: ""
      });
      setSelectedProfile([]);
    }, 3000);
  };

  return (
    <div
      className="hni-container"
      onMouseMove={handleMouseMove}
      style={{
        "--mx": `${cursorPos.x}px`,
        "--my": `${cursorPos.y}px`
      }}
    >
      {/* Floating Vertical Section Navigator (Desktop Exclusive) */}
      {/* <div className="hni-nav-rail">
        {[
          { id: "experiences", label: "01 // MODES" },
          { id: "destinations", label: "02 // LOCATIONS" },
          { id: "route-simulator", label: "03 // SKY PLANNER" },
          { id: "packages", label: "04 // SIGNATURE" },
          { id: "why-choose-us", label: "05 // PHILOSOPHY" },
          { id: "timeline", label: "06 // TIMELINE" },
          { id: "profile-builder", label: "07 // BLUEPRINT" },
          { id: "booking", label: "08 // SECURE CALL" }
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => {
              document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
              setActiveSection(sec.id);
            }}
            className={`hni-nav-rail-btn ${activeSection === sec.id ? "active" : ""}`}
            id={`side-nav-${sec.id}`}
          >
            <span className="hni-nav-rail-tooltip">
              {sec.label}
            </span>
            <div className="hni-nav-rail-dot-wrapper">
              {activeSection === sec.id && <div className="hni-nav-rail-ping" />}
              <div className="hni-nav-rail-dot" />
            </div>
          </button>
        ))}
      </div> */}

      {/* Dynamic Cursor Glow Background Effect */}
      <div className="hni-cursor-glow md:block hidden"
        style={{
          background: "radial-gradient(600px circle at var(--mx) var(--my), rgba(201,168,76,0.12), transparent 80%)"
        }}
      />

      {/* Styled Override Block to transform navbar to deep Obsidian-Gold on scroll */}
      <style>{`
        body.hni-luxury-theme .nav {
          background: rgba(10, 10, 10, 0.15) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
        }
        body.hni-luxury-theme .nav.scrolled {
          background: rgba(10, 10, 10, 0.96) !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 1px solid rgba(201, 168, 76, 0.3) !important;
        }
        body.hni-luxury-theme .nav.scrolled .nav-logo-text {
          color: #ffffff !important;
        }
        body.hni-luxury-theme .nav.scrolled .nav-logo-tagline {
          color: #C9A84C !important;
        }
        body.hni-luxury-theme .nav.scrolled .nav-link {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        body.hni-luxury-theme .nav.scrolled .nav-link:hover,
        body.hni-luxury-theme .nav.scrolled .nav-link.active {
          color: #ffffff !important;
          background: rgba(201, 168, 76, 0.15) !important;
        }
        body.hni-luxury-theme .nav.scrolled .burger span {
          background: #ffffff !important;
        }
      `}</style>

      {/* Primary Navigation */}
      <Navbar />

      {/* ==================== 1. FULL SCREEN HERO ==================== */}
      <section className="hni-hero">
        {/* Animated Slide Backdrops */}
        <div className="hni-hero-bg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="hni-hero-bg-image"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(10,10,10,1)), url(${HERO_SLIDES[activeSlide].image})`
              }}
            />
          </AnimatePresence>
        </div>

        {/* Hero Copy Overlay */}
        <div className="hni-hero-content">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hni-gold-badge"
          >
            <Gem className="hni-icon-small" />
            {HERO_SLIDES[activeSlide].category}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="hni-hero-title-wrapper"
            >
              <h1 className="hni-hero-title">
                Crafting Extraordinary <br className="hni-hero-title-br" /> Journeys{" "}
                <span className="hni-hero-title-italic">
                  For Those Who Expect More.
                </span>
              </h1>
              <p className="hni-hero-subtitle">
                {HERO_SLIDES[activeSlide].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Subheading Bullet Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="hni-bullet-bar"
          >
            <span>Private Luxury Tours</span>
            <span className="hni-bullet-divider">•</span>
            <span>Bespoke Itineraries</span>
            <span className="hni-bullet-divider">•</span>
            <span>24/7 Dedicated Concierge</span>
          </motion.div>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hni-hero-ctas"
          >
            <button
              onClick={scrollToForm}
              className="hni-btn-gold"
            >
              <span>
                Plan My Journey <ArrowRight className="hni-icon-btn" />
              </span>
            </button>
            <button
              onClick={() => {
                setSelectedPackage(null);
                setFormData((prev) => ({ ...prev, destination: "General Custom Consultation", notes: "Interested in organizing a bespoke HNI luxury tour experience." }));
                setInquiryModalOpen(true);
              }}
              className="hni-btn-outline"
            >
              <PhoneCall className="hni-icon-btn hni-text-gold" />
              <span>Connect with Butler</span>
            </button>
          </motion.div>
        </div>

        {/* Carousel Slide Left/Right Controls */}
        <div className="hni-slider-nav">
          <button
            onClick={handlePrevSlide}
            aria-label="Previous luxury backdrop"
            className="hni-nav-arrow"
          >
            <ChevronLeft className="hni-nav-arrow-icon" />
          </button>
          <div className="hni-slider-nav-counter">
            {String(activeSlide + 1).padStart(2, "0")} <span className="hni-slider-nav-divider">/</span> {String(HERO_SLIDES.length).padStart(2, "0")}
          </div>
          <button
            onClick={handleNextSlide}
            aria-label="Next luxury backdrop"
            className="hni-nav-arrow"
          >
            <ChevronRight className="hni-nav-arrow-icon" />
          </button>
        </div>

        {/* Floating Indicator Dots */}
        <div className="hni-hero-indicators">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className={`hni-indicator-dot ${idx === activeSlide ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* ==================== 2. LUXURY EXPERIENCES ==================== */}
      <section className="hni-experiences-section" id="experiences">
        <div className="hni-section-header">
          <span className="hni-section-pretitle">Sovereign Modes of Travel</span>
          <h2 className="hni-section-title">
            Luxury Travel <span className="hni-hero-title-italic">Experiences</span>
          </h2>
          <div className="hni-section-line" />
          <p className="hni-section-desc">
            We operate at the heights of complete curation. Choose your desired travel assets for a bespoke itinerary.
          </p>
        </div>

        {/* Category Navigation Filter Tabs */}
        <div className="hni-filters-bar" id="experience-categories">
          {[
            { id: "all", label: "All Curations" },
            { id: "air", label: "Air Curation" },
            { id: "marine", label: "Seafaring" },
            { id: "villa", label: "Sanctuaries" }
          ].map((cat) => (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`hni-filter-btn ${activeCategory === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div 
          layout 
          className="hni-card-grid"
          id="experience-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {LUXURY_EXPERIENCES.filter(
              (exp) => activeCategory === "all" || exp.category === activeCategory
            ).map((exp) => (
              <motion.div
                key={exp.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, y: -40 }}
                className="hni-luxury-card"
                id={`card-${exp.id}`}
              >
                {/* Image Container with Zoom and Gold Border overlay on Hover */}
                <div className="hni-card-img-wrapper">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="hni-card-img"
                  />
                  <div className="hni-card-overlay" />

                  {/* Animated Gold border on hover */}
                  <div className="hni-card-border-glow" />

                  <div className="hni-card-header-badge">
                    <span className="hni-card-badge">
                      {exp.tagline}
                    </span>
                    <h3 className="hni-card-title">
                      {exp.title}
                    </h3>
                  </div>
                </div>

                {/* Text Body */}
                <div className="hni-card-body">
                  <p className="hni-card-desc">
                    {exp.desc}
                  </p>

                  {/* Premium Spec Pill Grid */}
                  <div className="hni-card-specs">
                    {exp.specs.map((spec, i) => (
                      <div key={i} className="hni-spec-pill">
                        <Check className="hni-spec-icon" />
                        <span className="hni-spec-text">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPackage(null);
                      setFormData((prev) => ({
                        ...prev,
                        destination: `Custom Charter: ${exp.title}`,
                        notes: `Interested in private logistics featuring: ${exp.title}.`
                      }));
                      setInquiryModalOpen(true);
                    }}
                    className="hni-card-btn"
                  >
                    Consult Concierge
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ==================== 3. FEATURED DESTINATIONS ==================== */}
      <section className="hni-destinations-section" id="destinations">
        <div className="hni-destinations-container">
          <div className="hni-destinations-header">
            <div>
              <span className="hni-section-pretitle">Globally Handcrafted Locations</span>
              <h2 className="hni-section-title">
                Featured <span className="hni-hero-title-italic">Destinations</span>
              </h2>
              <div className="hni-section-line left" />
            </div>
            <p className="hni-section-desc hni-destinations-desc-para">
              From the pristine coral networks of the Maldives to the highest heli-ski peaks of Zermatt, Switzerland.
            </p>
          </div>

          {/* Large Image Grid with Premium Hover Zoom Animations */}
          <div className="hni-destinations-grid">
            {FEATURED_DESTINATIONS.map((dest, idx) => (
              <div
                key={dest.name}
                className={`hni-dest-card ${
                  idx === 0 || idx === 5 ? "hni-dest-card-wide" : ""
                }`}
                onClick={() => {
                  setSelectedPackage(null);
                  setFormData((prev) => ({
                    ...prev,
                    destination: dest.name,
                    notes: `Inquiring about custom HNI logistics to: ${dest.name}.`
                  }));
                  setInquiryModalOpen(true);
                }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="hni-card-img"
                />
                {/* Overlay */}
                <div className="hni-card-overlay" style={{ opacity: 0.85 }} />

                {/* Content */}
                <div className="hni-dest-card-content">
                  <span className="hni-dest-card-tag">
                    {dest.tag}
                  </span>
                  <h3 className="hni-dest-card-title">
                    <MapPin className="hni-dest-card-icon" />
                    {dest.name}
                  </h3>
                  <p className="hni-dest-card-desc">
                    {dest.highlight}
                  </p>
                </div>
                {/* Thin gold corner glow */}
                <div className="hni-dest-card-glow-tr" />
                <div className="hni-dest-card-glow-bl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3.5 PRIVATE FLIGHT & ROUTE SIMULATOR ==================== */}
      <section className="hni-simulator-section" id="route-simulator">
        {/* Ambient absolute lights */}
        <div className="hni-simulator-light-1" />
        <div className="hni-simulator-light-2" />

        <div className="hni-simulator-container">
          <div className="hni-section-header">
            <span className="hni-section-pretitle">Real-time Private Flight Architect</span>
            <h2 className="hni-section-title">
              Aviation & <span className="hni-hero-title-italic">Route Simulator</span>
            </h2>
            <div className="hni-section-line" />
            <p className="hni-section-desc">
              Architect your own private departure path, choose from our royal long-range aviation fleet, and select gourmet catering. Lock the details straight into your consultation.
            </p>
          </div>

          <div className="hni-simulator-grid">
            {/* Control Panel (cols 5) */}
            <div className="hni-simulator-ctrl">
              <div className="hni-simulator-status">
                <Gauge className="hni-sim-icon animate-pulse" /> SIMULATOR ACTIVE
              </div>

              <div className="hni-simulator-control-steps">
                <div>
                  <h3 className="hni-sim-heading">
                    <Milestone className="hni-sim-icon-amber" /> 1. Select Sovereign Cities
                  </h3>
                  <div className="hni-sim-select-group">
                    <div className="hni-sim-select-wrapper">
                      <label>
                        Departure City
                      </label>
                      <select
                        id="route-departure-select"
                        value={selectedDeparture}
                        onChange={(e) => {
                          setSelectedDeparture(e.target.value);
                          setLockedFlight(false);
                        }}
                        className="hni-sim-select"
                      >
                        {Object.keys(FLIGHT_ROUTES).map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div className="hni-sim-select-wrapper">
                      <label>
                        Destination Point
                      </label>
                      <select
                        id="route-arrival-select"
                        value={selectedArrival}
                        onChange={(e) => {
                          setSelectedArrival(e.target.value);
                          setLockedFlight(false);
                        }}
                        className="hni-sim-select"
                      >
                        {Object.keys(FLIGHT_ROUTES[selectedDeparture]).map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="hni-sim-heading">
                    <Plane className="hni-sim-icon-amber" /> 2. Fleet Configuration
                  </h3>
                  <div className="hni-fleet-selector">
                    {Object.keys(AIRCRAFT_FLEET).map((jet) => (
                      <button
                        key={jet}
                        id={`btn-jet-${jet.replace(/\s+/g, '-')}`}
                        onClick={() => {
                          setSelectedAircraft(jet);
                          setLockedFlight(false);
                        }}
                        className={`hni-fleet-btn ${selectedAircraft === jet ? "active" : ""}`}
                      >
                        <span className="hni-fleet-title">{jet.split(" ")[0]}</span>
                        <span className="hni-fleet-sub">{jet.split(" ").slice(1).join(" ")}</span>
                      </button>
                    ))}
                  </div>
                  <p className="hni-simulator-fleet-desc">
                    {AIRCRAFT_FLEET[selectedAircraft].desc}
                  </p>
                </div>

                <div>
                  <h3 className="hni-sim-heading">
                    <Utensils className="hni-sim-icon-amber" /> 3. Gastronomic Curation
                  </h3>
                  <div className="hni-sim-gastro-list">
                    {GASTRONOMY_OPTIONS.map((opt) => (
                      <button
                        key={opt.name}
                        id={`btn-gastronomy-${opt.name.replace(/\s+/g, '-')}`}
                        onClick={() => {
                          setSelectedGastronomy(opt.name);
                          setLockedFlight(false);
                        }}
                        className={`hni-gastro-btn ${selectedGastronomy === opt.name ? "active" : ""}`}
                      >
                        <span className="hni-gastro-title">{opt.name}</span>
                        <span className="hni-gastro-desc">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hni-simulator-lock-section">
                <button
                  id="lock-flight-btn"
                  onClick={() => {
                    const routeDetails = FLIGHT_ROUTES[selectedDeparture][selectedArrival];
                    const summaryText = `Interactive Flight Locked: Departure: ${selectedDeparture} ➔ Destination: ${selectedArrival} (${routeDetails.routeName}, Distance: ${routeDetails.distance}, Est: ${routeDetails.duration}). Selected Aircraft: ${selectedAircraft}. Catering: ${selectedGastronomy}.`;
                    setFormData((prev) => ({
                      ...prev,
                      destination: `${selectedDeparture} ➔ ${selectedArrival}`,
                      notes: summaryText
                    }));
                    setLockedFlight(true);
                    setTimeout(() => {
                      scrollToForm();
                    }, 1200);
                  }}
                  className={`hni-simulator-lock-btn ${lockedFlight ? "locked" : "unlocked"}`}
                >
                  {lockedFlight ? (
                    <>
                      <Check className="hni-icon-btn text-white" />
                      <span>Charter Flight Locked in Manifest!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="hni-icon-btn" />
                      <span>Lock Private Flight details</span>
                    </>
                  )}
                </button>
                {lockedFlight && (
                  <p className="hni-simulator-lock-alert animate-pulse">
                    ★ Saved! Automatically redirecting you to concierge secure form...
                  </p>
                )}
              </div>
            </div>

            {/* Flight Ticket / Manifest Display (cols 7) */}
            <div className="hni-manifest-card">
              {/* Header */}
              <div className="hni-manifest-header">
                <div className="hni-manifest-header-left">
                  <Plane className="hni-manifest-header-plane" />
                  <span className="hni-manifest-header-title">
                    ARUVI FLIGHTS // PRIVATE MANIFESTO
                  </span>
                </div>
                <span className="hni-manifest-header-class">
                  Class: Sovereign First
                </span>
              </div>

              {/* Ticket Body Content */}
              <div className="hni-manifest-body">
                {/* Route visualization */}
                <div className="hni-route-visualizer">
                  {/* Dashed connector line */}
                  <div className="hni-route-line" />

                  <div className="hni-ticket-city departure">
                    <span className="hni-ticket-sub">DEPARTURE</span>
                    <h4 className="hni-ticket-heading">{selectedDeparture.split(" ")[0]}</h4>
                    <span className="hni-ticket-sub">
                      {selectedDeparture.match(/\(([^)]+)\)/)?.[1]} TERMINAL
                    </span>
                  </div>

                  <div className="hni-route-middle">
                    <Plane className="hni-sim-icon animate-pulse" />
                    <span className="hni-route-duration">
                      {FLIGHT_ROUTES[selectedDeparture][selectedArrival].duration}
                    </span>
                  </div>

                  <div className="hni-ticket-city arrival">
                    <span className="hni-ticket-sub">DESTINATION</span>
                    <h4 className="hni-ticket-heading">{selectedArrival.split(" ")[0]}</h4>
                    <span className="hni-ticket-sub">
                      {selectedArrival.match(/\(([^)]+)\)/)?.[1]} VIP ARRIVAL
                    </span>
                  </div>
                </div>

                {/* Flight information metrics */}
                <div className="hni-route-metrics">
                  <div>
                    <span className="hni-metric-label">FLIGHT CORRIDOR</span>
                    <span className="hni-metric-value">
                      {FLIGHT_ROUTES[selectedDeparture][selectedArrival].routeName}
                    </span>
                  </div>
                  <div>
                    <span className="hni-metric-label">DIRECT DISTANCE</span>
                    <span className="hni-metric-value">
                      {FLIGHT_ROUTES[selectedDeparture][selectedArrival].distance}
                    </span>
                  </div>
                  <div>
                    <span className="hni-metric-label">AIRCRAFT RANGE</span>
                    <span className="hni-metric-value">
                      {AIRCRAFT_FLEET[selectedAircraft].range}
                    </span>
                  </div>
                  <div>
                    <span className="hni-metric-label">CRUISE PERFORMANCE</span>
                    <span className="hni-metric-value hni-text-gold">
                      {AIRCRAFT_FLEET[selectedAircraft].speed}
                    </span>
                  </div>
                </div>

                {/* Description details */}
                <div className="hni-manifest-details-section">
                  <div>
                    <h5 className="hni-manifest-details-title">
                      Flight Route Overview
                    </h5>
                    <p className="hni-manifest-details-desc">
                      {FLIGHT_ROUTES[selectedDeparture][selectedArrival].desc}
                    </p>
                  </div>

                  <div>
                    <h5 className="hni-manifest-details-title">
                      Cabin Dining & Gastronomy Curation
                    </h5>
                    <p className="hni-manifest-details-gastro">
                      <Utensils className="hni-sim-icon-amber" />
                      <span>{selectedGastronomy} ({GASTRONOMY_OPTIONS.find(g => g.name === selectedGastronomy)?.desc})</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Barcode / Stamp */}
              <div className="hni-manifest-footer">
                <div className="hni-manifest-footer-barcode-wrap">
                  {/* Mini custom barcode */}
                  <div className="hni-manifest-barcode-container">
                    <div className="hni-manifest-barcode-bars">
                      {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 4].map((w, idx) => (
                        <div key={idx} className="hni-manifest-barcode-bar" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                  </div>
                  <span className="hni-manifest-footer-id">
                    SVRN-ID: {selectedDeparture.match(/\(([^)]+)\)/)?.[1]}-{selectedArrival.match(/\(([^)]+)\)/)?.[1]}
                  </span>
                </div>

                <div className="hni-manifest-footer-right">
                  <span className="hni-manifest-fbo">
                    <ShieldCheck className="hni-sim-icon-green" /> FBO EXPEDITED
                  </span>
                  <span>•</span>
                  <span>ARUVI TOURS PRIVATE AVIATION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. SIGNATURE PACKAGES ==================== */}
      <section className="hni-packages-section" id="packages">
        <div className="hni-section-header">
          <span className="hni-section-pretitle">Fully Staffed & Guided Masterpieces</span>
          <h2 className="hni-section-title">
            Signature <span className="hni-hero-title-italic">Packages</span>
          </h2>
          <div className="hni-section-line" />
          <p className="hni-section-desc">
            Crafted for multi-generational escapes, milestone anniversaries, and high-security executive retreats.
          </p>
        </div>

        <motion.div
          className="hni-packages-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SIGNATURE_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              className="hni-pkg-card"
            >
              {/* Package Image */}
              <div className="hni-pkg-img-wrapper">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="hni-pkg-img"
                />
                <div className="hni-pkg-gradient-overlay" />
                <div className="hni-pkg-badge">
                  {pkg.luxuryLevel}
                </div>
              </div>

              {/* Package Details */}
              <div className="hni-pkg-details">
                <div>
                  <div className="hni-pkg-meta-row">
                    <span className="hni-pkg-meta-item">
                      <Calendar className="hni-icon-pkg" /> {pkg.duration}
                    </span>
                    <span className="hni-pkg-meta-item hni-text-gold">
                      <Star className="hni-icon-pkg hni-icon-fill" /> {pkg.rating}
                    </span>
                  </div>
                  <h3 className="hni-pkg-title">
                    {pkg.title}
                  </h3>

                  {/* Highlights Bullet List */}
                  <div className="hni-pkg-highlights">
                    {pkg.highlights.map((high, i) => (
                      <div key={i} className="hni-pkg-highlight-item">
                        <Check className="hni-pkg-check-icon" />
                        <span>{high}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="hni-pkg-price-row">
                    <span className="hni-pkg-price-label">Royal Fare:</span>
                    <span className="hni-pkg-price-value">
                      {pkg.price} <span className="hni-pkg-price-currency">USD</span>
                    </span>
                  </div>
                  <button
                    onClick={() => openInquiryForPackage(pkg)}
                    className="hni-pkg-btn"
                  >
                    Inquire On Package
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==================== 5. WHY CHOOSE US ==================== */}
      <section className="hni-why-choose-us-section" id="why-choose-us">
        <div className="hni-why-choose-us-container">
          <div className="hni-section-header">
            <span className="hni-section-pretitle">Uncompromising Luxury Execution</span>
            <h2 className="hni-section-title">
              Unrivaled Travel <span className="hni-hero-title-italic">Philosophy</span>
            </h2>
            <div className="hni-section-line" />
          </div>

          <div className="hni-pillars-grid">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="hni-pillar-card"
                >
                  <div className="hni-pillar-number">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="hni-pillar-icon-wrapper">
                    <Icon className="hni-pillar-icon" />
                  </div>
                  <h3 className="hni-pillar-title">
                    {item.title}
                  </h3>
                  <p className="hni-pillar-desc">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 6. TESTIMONIALS ==================== */}
      <section className="hni-testimonials-section" id="testimonials">
        <div className="hni-testimonials-container">
          <div className="hni-section-header">
            <span className="hni-section-pretitle">Letters of Satisfaction</span>
            <h2 className="hni-section-title">
              Sovereign <span className="hni-hero-title-italic">Testimonials</span>
            </h2>
            <div className="hni-section-line" />
          </div>

          <div className="hni-testimonials-grid">
            {TESTIMONIALS.map((test, idx) => (
              <div
                key={idx}
                className="hni-testimonial-card"
              >
                {/* Large Quotation Mark */}
                <div className="hni-testimonial-quote-mark">
                  “
                </div>

                <div>
                  <div className="hni-testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="hni-testimonial-star-icon" />
                    ))}
                  </div>
                  <blockquote className="hni-testimonial-quote">
                    "{test.quote}"
                  </blockquote>
                </div>

                <div className="hni-testimonial-author-row">
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="hni-testimonial-avatar"
                  />
                  <div>
                    <cite className="hni-testimonial-name">
                      {test.author}
                    </cite>
                    <span className="hni-testimonial-meta">
                      {test.title} • {test.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. JOURNEY TIMELINE ==================== */}
      <section className="hni-timeline-section" id="timeline">
        <div className="hni-section-header">
          <span className="hni-section-pretitle">How We Handcraft Excellence</span>
          <h2 className="hni-section-title">
            Your Journey <span className="hni-hero-title-italic">Timeline</span>
          </h2>
          <div className="hni-section-line" />
        </div>

        {/* Animated timeline list */}
        <div className="hni-timeline">
          <div className="hni-timeline-line" />

          <div className="hni-timeline-list">
            {TIMELINE_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`hni-timeline-item ${isEven ? "even" : "odd"}`}>
                  {/* Bullet center divider */}
                  <div className="hni-timeline-dot" />

                  {/* Card wrapper */}
                  <div className="hni-timeline-card-wrapper">
                    <div className="hni-timeline-card">
                      <div className="hni-timeline-card-header">
                        <span className="hni-timeline-step-num">
                          {step.num}
                        </span>
                        <span className="hni-timeline-phase-tag">
                          Phase {idx + 1}
                        </span>
                      </div>
                      <h3 className="hni-timeline-step-title">
                        {step.title}
                      </h3>
                      <p className="hni-timeline-step-desc">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PREMIUM CHECKLIST / PROFILE BUILDER ==================== */}
      <section className="hni-profile-section" id="profile-builder">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hni-section-header">
            <span className="hni-section-pretitle flex items-center justify-center gap-2">
              <Activity className="w-4 h-4 text-[#C9A84C] animate-pulse" />
              <span>Custom Bespoke Logistics Profile</span>
            </span>
            <h2 className="hni-section-title">
              Build Your <span className="hni-hero-title-italic">Luxury Profile</span>
            </h2>
            <p className="hni-section-desc">
              Select all elements needed for your dream trip. They will be integrated directly into our final booking proposal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Asset Selector Buttons */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CHECKLIST_ITEMS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedProfile.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleProfileItem(item.id)}
                    className={`hni-profile-card ${isSelected ? "active" : ""}`}
                  >
                    <div className="hni-profile-icon-box">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="hni-profile-title">{item.label}</span>
                      <span className="hni-profile-desc">
                        {isSelected ? "✦ Active Request" : "✦ Excluded"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Bespoke Manifest Card */}
            <div className="lg:col-span-4 hni-manifest-card">
              {/* Radial subtle gold background glow */}
              <div className="hni-manifest-glow" />

              <div>
                <div className="hni-manifest-header">
                  <div>
                    <h3 className="hni-manifest-title">
                      Expedition Blueprint
                    </h3>
                    <p className="hni-manifest-subtitle">
                      Sovereign Manifest Curation
                    </p>
                  </div>
                  <span className="hni-manifest-badge">
                    {selectedProfile.length} / 9 Active
                  </span>
                </div>

                {/* Exclusivity Score Meter */}
                <div className="mb-6">
                  <div className="hni-manifest-score-row">
                    <span>Exclusivity Score</span>
                    <span className="hni-manifest-score-val">
                      {selectedProfile.length === 0
                        ? "15%"
                        : selectedProfile.length <= 2
                        ? "40%"
                        : selectedProfile.length <= 4
                        ? "65%"
                        : selectedProfile.length <= 7
                        ? "85%"
                        : "100%"}
                    </span>
                  </div>
                  <div className="hni-manifest-track">
                    <div
                      className="hni-manifest-bar"
                      style={{
                        width: `${
                          selectedProfile.length === 0
                            ? 15
                            : selectedProfile.length <= 2
                            ? 40
                            : selectedProfile.length <= 4
                            ? 65
                            : selectedProfile.length <= 7
                            ? 85
                            : 100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="hni-manifest-prestige-row">
                    <span>Prestige Tier:</span>
                    <span className="hni-manifest-prestige-val">
                      {selectedProfile.length === 0
                        ? "Sovereign Elite Tier IV"
                        : selectedProfile.length <= 2
                        ? "Sovereign Elite Tier III"
                        : selectedProfile.length <= 4
                        ? "Sovereign Elite Tier II"
                        : selectedProfile.length <= 7
                        ? "Sovereign Elite Tier I"
                        : "Imperial Monarch Class"}
                    </span>
                  </div>
                </div>

                {/* Selected Assets List */}
                <div className="space-y-3 mb-6">
                  <h4 className="hni-manifest-list-title">
                    Secured Assets Manifest
                  </h4>

                  {selectedProfile.length === 0 ? (
                    <div className="hni-manifest-empty">
                      <Compass className="w-8 h-8 text-[#C9A84C]/30 animate-pulse mb-3" />
                      <p className="hni-manifest-empty-text">
                        Select assets on the left to populate your custom expedition blueprint.
                      </p>
                    </div>
                  ) : (
                    <div className="hni-manifest-scroll-area">
                      {CHECKLIST_ITEMS.filter((item) => selectedProfile.includes(item.id)).map((item) => {
                        const IconComp = item.icon;
                        const descriptions = {
                          jet: "Private VIP Terminal FBO departure & transit",
                          yacht: "Bespoke ocean routes & custom anchorage layout",
                          wedding: "Five-star milestone luxury celebration planning",
                          corp: "Exclusive secure estate buyout & logistics",
                          celeb: "Tier-1 security details, NDAs, press blackout",
                          visa: "Expedited diplomatic visa processing service",
                          chauffeur: "Rolls-Royce or Range Rover sentinel fleet",
                          butler: "24/7 dedicated lifestyle butler & steward care",
                          photo: "Documentary drone filming & cinematography"
                        };
                        return (
                          <div
                            key={item.id}
                            className="hni-manifest-item"
                          >
                            <div className="hni-manifest-item-icon">
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <h5 className="hni-manifest-item-name">{item.label}</h5>
                              <p className="hni-manifest-item-desc">{descriptions[item.id]}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="hni-manifest-footer">
                <button
                  onClick={() => {
                    if (selectedProfile.length === 0) {
                      scrollToForm();
                    } else {
                      const labelList = CHECKLIST_ITEMS.filter((item) => selectedProfile.includes(item.id))
                        .map((item) => item.label)
                        .join(", ");
                      setFormData((prev) => ({
                        ...prev,
                        notes: `Curated profile requested: ${labelList}.`
                      }));
                      scrollToForm();
                    }
                  }}
                  className="hni-manifest-btn"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>
                    {selectedProfile.length > 0 ? "Apply to Concierge Form" : "Configure Luxury Assets"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 8. INSTAGRAM GALLERY ==================== */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="gallery">
        <div className="hni-section-header">
          <span className="hni-section-pretitle">Chronicles of Travel Excellence</span>
          <h2 className="hni-section-title">
            Instagram <span className="hni-hero-title-italic">Gallery</span>
          </h2>
          <div className="hni-section-line" />
        </div>

        {/* Masonry Grid */}
        <div className="hni-gallery-grid">
          {INSTAGRAM_PHOTOS.map((photo, idx) => (
            <div key={idx} className="hni-gallery-item">
              <img
                src={photo}
                alt={`Instagram luxury snapshot ${idx + 1}`}
                className="hni-gallery-img"
              />
              <div className="hni-gallery-overlay">
                <span className="hni-gallery-badge">
                  @aruvitours
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 9. CTA & BOOKING FORM ==================== */}
      <section
        id="booking"
        ref={formSectionRef}
        className="hni-booking-section"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1600")`
        }}
      >
        <div className="hni-booking-scrim" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="hni-section-header">
            <span className="hni-section-pretitle">Curated Private Consultation</span>
            <h2 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-white mt-4">
              Ready For Your <br /> Next Luxury Escape?
            </h2>
            <p className="hni-section-desc">
              Book a Free Consultation with our CEO or Lead Destination Architect today. Absolutely zero commitment.
            </p>
          </div>

          {/* Luxury Interactive Form Card */}
          <div className="hni-form-card">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="hni-form-row">
                    <div>
                      <label className="hni-form-label">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Richard Hendricks"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="hni-form-input"
                      />
                    </div>
                    <div>
                      <label className="hni-form-label">
                        Private Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. richard@piedpiper.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="hni-form-input"
                      />
                    </div>
                  </div>

                  <div className="hni-form-row">
                    <div>
                      <label className="hni-form-label">
                        Direct Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="hni-form-input"
                      />
                    </div>
                    <div>
                      <label className="hni-form-label">
                        Target Destination & Cadence
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Maldives, Private Yacht Expedition"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="hni-form-input"
                      />
                    </div>
                  </div>

                  <div className="hni-form-row">
                    <div>
                      <label className="hni-form-label">
                        Estimated Trip Duration
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="hni-form-input"
                      >
                        <option>3 - 6 Days</option>
                        <option>1 Week</option>
                        <option>2 Weeks</option>
                        <option>3+ Weeks</option>
                      </select>
                    </div>
                    <div>
                      <label className="hni-form-label">
                        Budget Preference Category
                      </label>
                      <select
                        value={formData.scale}
                        onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                        className="hni-form-input"
                      >
                        <option>Premium (From $10k)</option>
                        <option>Ultra-Premium (From $25k)</option>
                        <option>Elite Sovereign (From $50k+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="hni-form-label">
                      Specific Requests / Logistics Details / Security Protocols
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify private air charter requests, custom hotel suite configurations, or medical/dietary concerns..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="hni-form-input resize-none"
                    />
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="hni-form-btn"
                    >
                      Connect with Private Concierge
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] flex items-center justify-center text-[#E8D08A] mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white mb-2">
                    Logistics Blueprint Received
                  </h3>
                  <p className="text-xs text-gray-400 max-w-sm leading-relaxed mb-6">
                    Your personal luxury travel advisor will review your selected assets and contact you within the next 2 hours via phone & secure email.
                  </p>
                  <span className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-widest border border-[#C9A84C]/25 bg-[#C9A84C]/5 px-3 py-1.5 rounded">
                    ★ Status: Connecting with Concierge ★
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================== INQUIRY MODAL (POPUP) ==================== */}
      <AnimatePresence>
        {inquiryModalOpen && (
          <div className="hni-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInquiryModalOpen(false)}
              className="hni-modal-backdrop"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="hni-modal-content"
            >
              <button
                onClick={() => setInquiryModalOpen(false)}
                className="hni-modal-close"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C] block mb-2">
                  ✦ Bespoke Inquiry
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mb-6">
                  {selectedPackage ? `Curating: ${selectedPackage.title}` : "Private Consultation Booking"}
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="hni-form-row">
                    <div>
                      <label className="hni-form-label">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="hni-form-input"
                      />
                    </div>
                    <div>
                      <label className="hni-form-label">
                        Private Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="hni-form-input"
                      />
                    </div>
                  </div>

                  <div className="hni-form-row">
                    <div>
                      <label className="hni-form-label">
                        Direct Mobile / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="hni-form-input"
                      />
                    </div>
                    <div>
                      <label className="hni-form-label">
                        Specific Target Destination
                      </label>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="hni-form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="hni-form-label">
                      Bespoke Itinerary Guidelines / Logistics Detail
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="hni-form-input resize-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setInquiryModalOpen(false)}
                      className="hni-modal-cancel-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="hni-modal-submit-btn"
                    >
                      Submit Logistics Query
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
