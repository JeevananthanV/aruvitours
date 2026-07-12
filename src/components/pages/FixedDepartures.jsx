"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  MapPin,
  X,
  Sparkles,
  Search,
  Compass,
  Phone,
  Filter,
  Check,
  HelpCircle,
  SlidersHorizontal,
  Info,
  Users,
  Plane,
  Hotel,
  Coffee,
  Globe,
  Clock
} from 'lucide-react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

// Robust luxury fixed departure database
const fixedDeparturesData = [
  {
    id: 1,
    title: "Bali Escape & Tropical Paradise",
    country: "Indonesia",
    destination: "Ubud, Seminyak, Nusa Penida",
    departureCity: "Chennai",
    rating: 4.8,
    reviews: 142,
    departureDate: "2026-09-15",
    duration: "6 Days / 5 Nights",
    nights: 5,
    seatsLeft: 12,
    totalSeats: 25,
    price: 58999,
    originalPrice: 69990,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    theme: "Honeymoon",
    category: "International",
    flightsIncluded: true,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: true,
    highlights: ["Private Pool Villa Stay", "Nusa Penida Speedboat Tour", "Traditional Balinese Massage"]
  },
  {
    id: 2,
    title: "Arunachal Explorer & Tawang Valley",
    country: "India",
    destination: "Tawang, Bomdila, Bhalukpong",
    departureCity: "Guwahati",
    rating: 4.9,
    reviews: 98,
    departureDate: "2026-10-12",
    duration: "6 Days / 5 Nights",
    nights: 5,
    seatsLeft: 4,
    totalSeats: 12,
    price: 29999,
    originalPrice: 35000,
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?auto=format&fit=crop&q=80&w=800",
    theme: "Adventure",
    category: "Domestic",
    flightsIncluded: false,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: false,
    highlights: ["Sela Pass Snow Sightseeing", "Tawang Monastery", "Nuranang Waterfalls visit"]
  },
  {
    id: 3,
    title: "Golden Triangle Heritage Expedition",
    country: "India",
    destination: "Delhi, Agra, Jaipur",
    departureCity: "Delhi",
    rating: 4.7,
    reviews: 215,
    departureDate: "2026-11-05",
    duration: "4 Days / 3 Nights",
    nights: 3,
    seatsLeft: 15,
    totalSeats: 30,
    price: 24999,
    originalPrice: 31000,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    theme: "Family",
    category: "Domestic",
    flightsIncluded: true,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: false,
    highlights: ["Taj Mahal Sunrise Tour", "Jaipur Palace Dinner", "Chauffeur Driven Premium Car"]
  },
  {
    id: 4,
    title: "Kerala backwater luxury voyage",
    country: "India",
    destination: "Munnar, Alleppey Houseboat",
    departureCity: "Kochi",
    rating: 4.9,
    reviews: 180,
    departureDate: "2026-12-10",
    duration: "5 Days / 4 Nights",
    nights: 4,
    seatsLeft: 6,
    totalSeats: 15,
    price: 41999,
    originalPrice: 49999,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
    theme: "Weekend",
    category: "Domestic",
    flightsIncluded: false,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: false,
    highlights: ["Luxury Houseboat Private Cruise", "Tea Garden Bungalow Stay", "Kathakali Art Show Entry"]
  },
  {
    id: 5,
    title: "Singapore & Malaysia Highlights",
    country: "Singapore",
    destination: "Marina Bay, Kuala Lumpur",
    departureCity: "Trichy",
    rating: 4.8,
    reviews: 310,
    departureDate: "2026-09-25",
    duration: "6 Days / 5 Nights",
    nights: 5,
    seatsLeft: 8,
    totalSeats: 20,
    price: 74999,
    originalPrice: 85000,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800",
    theme: "Family",
    category: "International",
    flightsIncluded: true,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: true,
    highlights: ["Universal Studios Day Pass", "Genting Highlands Cable Car", "Batu Caves & Twin Towers"]
  },
  {
    id: 6,
    title: "Sikkim & Darjeeling Retreat",
    country: "India",
    destination: "Gangtok, Pelling, Darjeeling",
    departureCity: "Bagdogra",
    rating: 4.6,
    reviews: 74,
    departureDate: "2026-11-20",
    duration: "5 Days / 4 Nights",
    nights: 4,
    seatsLeft: 2,
    totalSeats: 10,
    price: 22999,
    originalPrice: 28000,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
    theme: "Summer",
    category: "Domestic",
    flightsIncluded: false,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: false,
    highlights: ["Tiger Hill Golden Sunrise", "Changu Lake Yak Ride", "Organic Tea Plantation Tour"]
  },
  {
    id: 7,
    title: "Vietnam Wonders & Halong Cruise",
    country: "Vietnam",
    destination: "Hanoi, Halong Bay, Ninh Binh",
    departureCity: "Bengaluru",
    rating: 4.9,
    reviews: 125,
    departureDate: "2026-10-18",
    duration: "6 Days / 5 Nights",
    nights: 5,
    seatsLeft: 11,
    totalSeats: 25,
    price: 64999,
    originalPrice: 79999,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800",
    theme: "Adventure",
    category: "International",
    flightsIncluded: true,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: true,
    highlights: ["Halong Bay Over-night Cruise", "Hanoi Old Quarter Rickshaw", "Trang An Caves Boat Ride"]
  },
  {
    id: 8,
    title: "Chardham Yatra Pilgrimage",
    country: "India",
    destination: "Badrinath, Kedarnath, Gangotri",
    departureCity: "Dehradun",
    rating: 4.9,
    reviews: 410,
    departureDate: "2026-10-05",
    duration: "10 Days / 9 Nights",
    nights: 9,
    seatsLeft: 5,
    totalSeats: 20,
    price: 39999,
    originalPrice: 48000,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&q=80&w=800",
    theme: "Pilgrimage",
    category: "Domestic",
    flightsIncluded: false,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: false,
    highlights: ["VIP Darshan at Temples", "Kedarnath Helicopter Service", "Luxury Himalayan Camps"]
  },
  {
    id: 9,
    title: "Swiss Alps Winter Dream",
    country: "Switzerland",
    destination: "Zurich, Interlaken, Lucerne",
    departureCity: "Mumbai",
    rating: 4.9,
    reviews: 88,
    departureDate: "2026-12-15",
    duration: "8 Days / 7 Nights",
    nights: 7,
    seatsLeft: 7,
    totalSeats: 15,
    price: 189000,
    originalPrice: 220000,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=800",
    theme: "Winter",
    category: "International",
    flightsIncluded: true,
    hotelIncluded: true,
    breakfastIncluded: true,
    visaIncluded: true,
    highlights: ["Mount Titlis Ice Flyer", "Scenic Swiss Pass Travel", "Chocolate Factory Tour"]
  }
];

const FixedDepartures = () => {
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

  // References
  const searchSectionRef = useRef(null);

  // Scroll to search action
  const handleScrollToSearch = () => {
    if (searchSectionRef.current) {
      searchSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    document.title = "Fixed Departures | Aruvi Tours";
    window.scrollTo(0, 0);
  }, []);

  // Sticky Filter and Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedTravellers, setSelectedTravellers] = useState("All");

  // Selected Quick Chip
  const [activeChip, setActiveChip] = useState("All");

  // Sidebar Filter States
  const [sidebarTheme, setSidebarTheme] = useState("All");
  const [sidebarDepartureCity, setSidebarDepartureCity] = useState("All");
  const [filterFlights, setFilterFlights] = useState(false);
  const [filterVisa, setFilterVisa] = useState(false);
  const [filterHotel, setFilterHotel] = useState(false);
  const [filterMeals, setFilterMeals] = useState(false);

  // Mobile Slide-up panel state
  const [showMobileFilterPanel, setShowMobileFilterPanel] = useState(false);

  // Booking Modal States
  const [selectedTour, setSelectedTour] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    travellersCount: "1",
    specialRequests: ""
  });

  // Unique Lists for dynamic filters
  const countriesList = useMemo(() => {
    const list = new Set();
    fixedDeparturesData.forEach(item => list.add(item.country));
    return ["All", ...Array.from(list)];
  }, []);

  const departureCitiesList = useMemo(() => {
    const list = new Set();
    fixedDeparturesData.forEach(item => list.add(item.departureCity));
    return ["All", ...Array.from(list)];
  }, []);

  const themesList = useMemo(() => {
    const list = new Set();
    fixedDeparturesData.forEach(item => list.add(item.theme));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter computation logic (reactive and fully matched to the UI states)
  const finalFilteredDepartures = useMemo(() => {
    return fixedDeparturesData.filter(item => {
      // 1. Search Destination Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDest = item.destination.toLowerCase().includes(query);
        const matchesCountry = item.country.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDest && !matchesCountry) return false;
      }

      // 2. Country Filter
      if (selectedCountry !== "All" && item.country !== selectedCountry) {
        return false;
      }

      // 3. Month Filter
      if (selectedMonth !== "All") {
        const dateObj = new Date(item.departureDate);
        const monthNum = dateObj.getMonth(); // 0-indexed
        const monthMap = {
          "09": 8, "September": 8,
          "10": 9, "October": 9,
          "11": 10, "November": 10,
          "12": 11, "December": 11
        };
        const targetMonthIndex = monthMap[selectedMonth];
        if (targetMonthIndex !== undefined && monthNum !== targetMonthIndex) {
          return false;
        }
      }

      // 4. Duration Filter
      if (selectedDuration !== "All") {
        const nights = item.nights;
        if (selectedDuration === "short" && nights > 4) return false;
        if (selectedDuration === "medium" && (nights < 5 || nights > 6)) return false;
        if (selectedDuration === "long" && nights < 7) return false;
      }

      // 5. Budget Filter
      if (selectedBudget !== "All") {
        const price = item.price;
        if (selectedBudget === "under-30k" && price >= 30000) return false;
        if (selectedBudget === "30k-60k" && (price < 30000 || price > 60000)) return false;
        if (selectedBudget === "60k-100k" && (price < 60000 || price > 100000)) return false;
        if (selectedBudget === "above-100k" && price <= 100000) return false;
      }

      // 6. Travellers Left capacity
      if (selectedTravellers !== "All") {
        const required = parseInt(selectedTravellers, 10);
        if (!isNaN(required) && item.seatsLeft < required) return false;
      }

      // 7. Quick Filter Chips
      if (activeChip !== "All") {
        if (activeChip === "International" && item.category !== "International") return false;
        if (activeChip === "Domestic" && item.category !== "Domestic") return false;
        if (activeChip === "Flights Included" && !item.flightsIncluded) return false;
        if (activeChip === "Visa Included" && !item.visaIncluded) return false;
        // Match standard travel themes from chips
        const possibleThemes = ["Weekend", "Family", "Honeymoon", "Adventure", "Pilgrimage", "Summer", "Winter"];
        if (possibleThemes.includes(activeChip) && item.theme !== activeChip) return false;
      }

      // 8. Sidebar Filters (Desktop / Slide-up Panel)
      if (sidebarTheme !== "All" && item.theme !== sidebarTheme) return false;
      if (sidebarDepartureCity !== "All" && item.departureCity !== sidebarDepartureCity) return false;
      if (filterFlights && !item.flightsIncluded) return false;
      if (filterVisa && !item.visaIncluded) return false;
      if (filterHotel && !item.hotelIncluded) return false;
      if (filterMeals && !item.breakfastIncluded) return false;

      return true;
    });
  }, [
    searchQuery,
    selectedCountry,
    selectedMonth,
    selectedDuration,
    selectedBudget,
    selectedTravellers,
    activeChip,
    sidebarTheme,
    sidebarDepartureCity,
    filterFlights,
    filterVisa,
    filterHotel,
    filterMeals
  ]);

  // Clean all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCountry("All");
    setSelectedMonth("All");
    setSelectedDuration("All");
    setSelectedBudget("All");
    setSelectedTravellers("All");
    setActiveChip("All");
    setSidebarTheme("All");
    setSidebarDepartureCity("All");
    setFilterFlights(false);
    setFilterVisa(false);
    setFilterHotel(false);
    setFilterMeals(false);
  };

  // Handle reserve flow
  const handleOpenBooking = (tour) => {
    setSelectedTour(tour);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.fullName || !bookingForm.phoneNumber) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }

    // Direct WhatsApp premium message generation
    const customMessage = `*Fixed Departure Inquiry - Aruvi Tours*%0A%0A*Tour:* ${selectedTour.title}%0A*Destination:* ${selectedTour.destination}%0A*Date:* ${selectedTour.departureDate}%0A*Duration:* ${selectedTour.duration}%0A*Price:* ₹${selectedTour.price.toLocaleString()}/-%0A%0A*Lead Guest Details:*%0A- *Name:* ${bookingForm.fullName}%0A- *Phone:* ${bookingForm.phoneNumber}%0A- *Email:* ${bookingForm.emailAddress || "Not provided"}%0A- *Travellers Count:* ${bookingForm.travellersCount}%0A- *Special Requests:* ${bookingForm.specialRequests || "None"}`;
    const targetUrl = `https://api.whatsapp.com/send?phone=919494141475&text=${customMessage}`;
    window.open(targetUrl, "_blank");

    // Clear state
    setBookingForm({
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      travellersCount: "1",
      specialRequests: ""
    });
    setShowBookingModal(false);
  };

  return (
    <div className="fd-container">
      <Navbar />

      {/* 1. Compact Hero Section with Integrated Floating Search Bar */}
      <section className="fd-hero">
        <div className="fd-hero-glow"></div>
        <div className="fd-hero-grid-bg"></div>
        
        <div className="fd-hero-content">
          <span className="fd-hero-badge">
            <Sparkles style={{ width: '18px', height: '18px' }} /> Premium Curated Tours
          </span>
          <h1 className="fd-hero-title">
            🌍 Fixed Departures
          </h1>
          <p className="fd-hero-subtitle">
            Guaranteed departures to amazing destinations. Choose your date and book instantly.
          </p>
          <button 
            onClick={handleScrollToSearch}
            className="fd-hero-button"
            style={{ marginBottom: '16px' }}
          >
            Browse Tours
          </button>
        </div>

        {/* Floating Premium Search Card */}
        <div className="fd-hero-search-float">
          <div className="fd-search-bar-inner">
            <div className="fd-search-grid">
              
              {/* Search Destination */}
              <div className="fd-search-group">
                <label className="fd-search-label">
                  <Search /> Search Destination
                </label>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where to go..."
                  className="fd-search-input"
                />
              </div>

              {/* Country Selection */}
              <div className="fd-search-group">
                <label className="fd-search-label">
                  <Globe /> Country
                </label>
                <select 
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="fd-search-select"
                >
                  <option value="All">All Countries</option>
                  {countriesList.filter(c => c !== "All").map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Month Selection */}
              <div className="fd-search-group">
                <label className="fd-search-label">
                  <Calendar /> Month
                </label>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="fd-search-select"
                >
                  <option value="All">All Months</option>
                  <option value="September">September 2026</option>
                  <option value="October">October 2026</option>
                  <option value="November">November 2026</option>
                  <option value="December">December 2026</option>
                </select>
              </div>

              {/* Duration Selection */}
              <div className="fd-search-group">
                <label className="fd-search-label">
                  <Clock /> Duration
                </label>
                <select 
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="fd-search-select"
                >
                  <option value="All">All Durations</option>
                  <option value="short">Short (3-4 Nights)</option>
                  <option value="medium">Medium (5-6 Nights)</option>
                  <option value="long">Long (7+ Nights)</option>
                </select>
              </div>

              {/* Budget Selection */}
              <div className="fd-search-group">
                <label className="fd-search-label">
                  <Compass style={{ color: '#C9A84C' }} /> Budget
                </label>
                <select 
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="fd-search-select"
                >
                  <option value="All">All Budgets</option>
                  <option value="under-30k">Under ₹30,000</option>
                  <option value="30k-60k">₹30,000 - ₹60,000</option>
                  <option value="60k-100k">₹60,000 - ₹1,00,000</option>
                  <option value="above-100k">Above ₹1,00,000</option>
                </select>
              </div>

              {/* Travellers Left capacity */}
              <div className="fd-search-group">
                <label className="fd-search-label">
                  <Users /> Travellers
                </label>
                <select 
                  value={selectedTravellers}
                  onChange={(e) => setSelectedTravellers(e.target.value)}
                  className="fd-search-select"
                >
                  <option value="All">Any Group</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="8">8+ Persons</option>
                </select>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Filter Chips Section with the scroll-to ref */}
      <section 
        ref={searchSectionRef}
        className="fd-chips-section"
      >
        <div className="fd-chips-container">
          <span className="fd-chips-label">Quick Chips:</span>
          {[
            "All", "International", "Domestic", "Weekend", "Family", "Honeymoon", 
            "Adventure", "Pilgrimage", "Summer", "Winter", "Flights Included", "Visa Included"
          ].map((chip) => {
            const isSelected = activeChip === chip;
            return (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`fd-chip ${isSelected ? "active" : ""}`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4 & 5. Main content split view (Desktop Sidebar vs Mobile filter slider) */}
      <section className="fd-main-layout">
        <div className="fd-grid-container">
          
          {/* 5. Sidebar Filters (Desktop only) */}
          <aside className="fd-sidebar">
            <div className="fd-sidebar-card">
              <div className="fd-sidebar-header">
                <h3 className="fd-sidebar-title">
                  <SlidersHorizontal /> Filters
                </h3>
                <button 
                  onClick={handleResetFilters}
                  className="fd-sidebar-clear"
                >
                  Clear All
                </button>
              </div>

              {/* Theme Filter */}
              <div className="fd-sidebar-group">
                <label className="fd-sidebar-label">Travel Theme</label>
                <select 
                  value={sidebarTheme}
                  onChange={(e) => setSidebarTheme(e.target.value)}
                  className="fd-sidebar-select"
                >
                  <option value="All">All Themes</option>
                  {themesList.filter(t => t !== "All").map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Departure City Filter */}
              <div className="fd-sidebar-group">
                <label className="fd-sidebar-label">Departure City</label>
                <select 
                  value={sidebarDepartureCity}
                  onChange={(e) => setSidebarDepartureCity(e.target.value)}
                  className="fd-sidebar-select"
                >
                  <option value="All">All Cities</option>
                  {departureCitiesList.filter(c => c !== "All").map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Inclusions Checkboxes */}
              <div className="fd-sidebar-group fd-sidebar-divider fd-checkbox-list">
                <span className="fd-sidebar-label">Trip Inclusions</span>
                
                <label className="fd-checkbox-label">
                  <input 
                    type="checkbox"
                    checked={filterFlights}
                    onChange={(e) => setFilterFlights(e.target.checked)}
                    className="fd-checkbox-input"
                  />
                  <span>✈ Flights Included</span>
                </label>

                <label className="fd-checkbox-label">
                  <input 
                    type="checkbox"
                    checked={filterVisa}
                    onChange={(e) => setFilterVisa(e.target.checked)}
                    className="fd-checkbox-input"
                  />
                  <span>📄 Visa Assistance Included</span>
                </label>

                <label className="fd-checkbox-label">
                  <input 
                    type="checkbox"
                    checked={filterHotel}
                    onChange={(e) => setFilterHotel(e.target.checked)}
                    className="fd-checkbox-input"
                  />
                  <span>🏨 4★/5★ Hotel Stay</span>
                </label>

                <label className="fd-checkbox-label">
                  <input 
                    type="checkbox"
                    checked={filterMeals}
                    onChange={(e) => setFilterMeals(e.target.checked)}
                    className="fd-checkbox-input"
                  />
                  <span>🍽 Breakfast Included</span>
                </label>
              </div>

              <div className="fd-sidebar-divider" style={{ marginTop: '20px' }}>
                <div className="fd-sidebar-info">
                  <Info />
                  <p className="fd-sidebar-info-text">
                    All prices are highly dynamic and verified transparently. Click on <strong>View Details</strong> to browse comprehensive itineraries.
                  </p>
                </div>
              </div>

            </div>
          </aside>

          {/* Mobile Filter Toggle Trigger */}
          <div className="fd-mobile-filter-trigger">
            <button
              onClick={() => setShowMobileFilterPanel(true)}
              className="fd-mobile-filter-btn"
            >
              <Filter />
              Detailed Filters & Amenities
            </button>
          </div>

          {/* 4. Tour Cards (Main Content Grid - exactly 3 per row on desktop) */}
          <main className="fd-main-content">
            <div className="fd-results-header">
              <span className="fd-results-count">
                Showing {finalFilteredDepartures.length} premium departures
              </span>
              <span className="fd-results-sort">
                Sorted by Popularity
              </span>
            </div>

            <motion.div
              className="fd-cards-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {finalFilteredDepartures.map((tour) => (
                <motion.div
                  layout
                  key={tour.id}
                  className="fd-card"
                  variants={itemVariants}
                >
                  {/* Card Banner Image with zoom & badges */}
                  <div className="fd-card-image-wrap">
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="fd-card-image"
                    />
                    <div className="fd-card-gradient"></div>
                    
                    {/* Theme Badge */}
                    <span className="fd-card-theme-badge">
                      ✨ {tour.theme}
                    </span>

                    {/* Left seats color status indicators */}
                    <span className={`fd-card-seats-badge ${
                      tour.seatsLeft <= 4 
                        ? "fd-card-seats-rose" 
                        : tour.seatsLeft <= 8 
                          ? "fd-card-seats-amber" 
                          : "fd-card-seats-green"
                    }`}>
                      Seats Left: {tour.seatsLeft}
                    </span>

                    {/* Country Badge */}
                    <span className="fd-card-country-badge">
                      <MapPin /> {tour.country}
                    </span>

                    {/* Rating Badge */}
                    <span className="fd-card-rating-badge">
                      ⭐ {tour.rating}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="fd-card-body">
                    <div>
                      <h3 className="fd-card-title">
                        {tour.title}
                      </h3>
                      <p className="fd-card-dest">
                        📍 {tour.destination}
                      </p>

                      <div className="fd-card-meta-grid">
                        <div className="fd-card-meta-item">
                          <Calendar />
                          <span>{new Date(tour.departureDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="fd-card-meta-item">
                          <Clock />
                          <span>{tour.duration}</span>
                        </div>
                      </div>

                      {/* Inclusions Icons */}
                      <div className="fd-card-inclusions">
                        <div className={`fd-card-inclusion-item ${!tour.flightsIncluded ? "disabled" : ""}`}>
                          <Plane className={`fd-card-inclusion-icon ${tour.flightsIncluded ? "active" : "inactive"}`} />
                          <span>
                            Flights Included
                          </span>
                        </div>
                        <div className={`fd-card-inclusion-item ${!tour.hotelIncluded ? "disabled" : ""}`}>
                          <Hotel className={`fd-card-inclusion-icon ${tour.hotelIncluded ? "active" : "inactive"}`} />
                          <span>
                            Premium Hotels Stay
                          </span>
                        </div>
                        <div className={`fd-card-inclusion-item ${!tour.breakfastIncluded ? "disabled" : ""}`}>
                          <Coffee className={`fd-card-inclusion-icon ${tour.breakfastIncluded ? "active" : "inactive"}`} />
                          <span>
                            Breakfast Buffet Included
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing and Button Actions */}
                    <div>
                      <div className="fd-card-price-wrap">
                        <span className="fd-card-price">
                          ₹{tour.price.toLocaleString()}
                        </span>
                        {tour.originalPrice && (
                          <span className="fd-card-original-price">
                            ₹{tour.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="fd-card-price-sub">all-inclusive</span>
                      </div>

                      <div className="fd-card-actions">
                        <button
                          onClick={() => handleOpenBooking(tour)}
                          className="fd-btn-book"
                        >
                          Book Now
                        </button>
                        <Link
                          to={tour.category === "Domestic" ? `/domestic/${tour.title.toLowerCase().includes("arunachal") ? "arunachal-pradesh" : tour.title.toLowerCase().includes("golden") ? "golden-triangle" : tour.title.toLowerCase().includes("kerala") ? "kerala" : "sikkim"}` : "/contact"}
                          className="fd-btn-details"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {finalFilteredDepartures.length === 0 && (
              <div className="fd-no-results">
                <Compass className="fd-no-results-icon" />
                <h3 className="fd-no-results-title">No Departures Match Selection</h3>
                <p className="fd-no-results-text">
                  There are no fixed departures on the selected filters. Please adjust the filters or reset criteria to see availability.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="fd-no-results-btn"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>

        </div>
      </section>

      {/* 6. Why Book with Aruvi Tours? (Bento styled block with gold checklist) */}
      <section className="fd-values-section">
        <div className="fd-values-container">
          <div className="fd-values-header">
            <span className="fd-values-badge">Our Signature Values</span>
            <h2 className="fd-values-title">
              Why Book with Aruvi Tours?
            </h2>
            <p className="fd-values-subtitle">
              Providing exceptional group journeys, luxury transfers, and curated itineraries since inception.
            </p>
          </div>

          <div className="fd-values-grid">
            {[
              { title: "Guaranteed Departures", desc: "No minimum cohort capacity limit required. When you register, your departure is 100% active." },
              { title: "Best Price Guarantee", desc: "Guaranteed pricing without any hidden charges or surprise taxes at destination points." },
              { title: "Trusted Tour Managers", desc: "Attentive experienced specialists guide every group step-by-step from takeoff to return." },
              { title: "Handpicked Hotels", desc: "Premium luxury cottages, heritage properties, and 4★/5★ accommodation setups guaranteed." },
              { title: "Secure Payments", desc: "SSL protected gateways and a reliable, modular refund setup for peace of mind." },
              { title: "24/7 Customer Support", desc: "Always online and ready to adjust flights, transfers, or guide preferences instantly." }
            ].map((value, idx) => (
              <div 
                key={idx} 
                className="fd-value-card"
              >
                <div className="fd-value-icon-box">
                  <div className="fd-value-icon-wrap">
                    <Check />
                  </div>
                  <div>
                    <h4 className="fd-value-title">
                      {value.title}
                    </h4>
                    <p className="fd-value-desc">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="fd-faq-section">
        <div className="fd-faq-container">
          <div className="fd-faq-header">
            <span className="fd-faq-badge">Got Questions?</span>
            <h2 className="fd-faq-title">
              Frequently Answered
            </h2>
          </div>

          <div className="fd-faq-list">
            {[
              {
                q: "What is a Fixed Departure?",
                a: "A Fixed Departure is a pre-scheduled group tour with set travel dates, specific flight patterns, pre-booked premium hotel stays, and guaranteed departures. Solo travelers, couples, and families can join the pre-arranged cohort directly."
              },
              {
                q: "Can I change my travel date?",
                a: "Because flights and stays are locked in blocks for group departures, date changes are subject to airline modification availability. Contact our travel desk concierge to discuss individual options."
              },
              {
                q: "Is airfare included?",
                a: "Look for the ✈ icon on the cards. For destinations like Bali and Singapore, flight tickets from major hubs are fully integrated. For select domestic tours, we provide local ground support, and flights can be added optionally."
              },
              {
                q: "Can I cancel my booking?",
                a: "Yes. Our standard cancelation policy permits complete cancellation or partial refund based on how early you submit the request. Details are shared transparently prior to advance deposit."
              },
              {
                q: "How many people are required?",
                a: "Zero minimum is required from your side! Aruvi Tours guarantees departures even if you are a solo guest booking a single ticket."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="fd-faq-item"
              >
                <details className="fd-faq-details">
                  <summary className="fd-faq-summary">
                    <span className="fd-faq-summary-span">
                      <HelpCircle />
                      {faq.q}
                    </span>
                    <span className="fd-faq-arrow">
                      ▼
                    </span>
                  </summary>
                  <div className="fd-faq-content">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="fd-cta-section">
        <div className="fd-cta-glow"></div>
        
        <div className="fd-cta-container">
          <h2 className="fd-cta-title">
            Need Help Choosing a Tour?
          </h2>
          <p className="fd-cta-text">
            Contact Aruvi Tours now. Our luxury travel concierge handles customized flight connections, room requests, and visa assistance.
          </p>
          
          <div className="fd-cta-buttons">
            <a 
              href="tel:+919494141475"
              className="fd-cta-btn-phone"
            >
              <Phone style={{ width: '16px', height: '16px' }} /> Talk to Our Travel Expert
            </a>
            
            <a 
              href="https://api.whatsapp.com/send?phone=919494141475&text=Hi! I am looking for help choosing a Fixed Departure tour."
              target="_blank"
              rel="noreferrer"
              className="fd-cta-btn-whatsapp"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Slide-up Filter Panel */}
      <AnimatePresence>
        {showMobileFilterPanel && (
          <div className="fd-mobile-panel-backdrop">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fd-mobile-panel"
            >
              <div className="fd-mobile-panel-header">
                <h3 className="fd-mobile-panel-title">
                  <SlidersHorizontal /> Select Filters
                </h3>
                <button 
                  onClick={() => setShowMobileFilterPanel(false)}
                  className="fd-mobile-panel-close"
                >
                  <X />
                </button>
              </div>

              <div className="fd-mobile-panel-body">
                {/* Theme Filter */}
                <div className="fd-mobile-panel-section">
                  <label className="fd-mobile-panel-label">Travel Theme</label>
                  <select 
                    value={sidebarTheme}
                    onChange={(e) => setSidebarTheme(e.target.value)}
                    className="fd-mobile-panel-select"
                  >
                    <option value="All">All Themes</option>
                    {themesList.filter(t => t !== "All").map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Departure City Filter */}
                <div className="fd-mobile-panel-section">
                  <label className="fd-mobile-panel-label">Departure City</label>
                  <select 
                    value={sidebarDepartureCity}
                    onChange={(e) => setSidebarDepartureCity(e.target.value)}
                    className="fd-mobile-panel-select"
                  >
                    <option value="All">All Cities</option>
                    {departureCitiesList.filter(c => c !== "All").map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Inclusions */}
                <div className="fd-mobile-panel-section fd-mobile-panel-checkbox-group">
                  <span className="fd-mobile-panel-label">Trip Inclusions</span>
                  
                  <label className="fd-checkbox-label">
                    <input 
                      type="checkbox"
                      checked={filterFlights}
                      onChange={(e) => setFilterFlights(e.target.checked)}
                      className="fd-checkbox-input"
                    />
                    <span>✈ Flights Included</span>
                  </label>

                  <label className="fd-checkbox-label">
                    <input 
                      type="checkbox"
                      checked={filterVisa}
                      onChange={(e) => setFilterVisa(e.target.checked)}
                      className="fd-checkbox-input"
                    />
                    <span>📄 Visa Assistance Included</span>
                  </label>

                  <label className="fd-checkbox-label">
                    <input 
                      type="checkbox"
                      checked={filterHotel}
                      onChange={(e) => setFilterHotel(e.target.checked)}
                      className="fd-checkbox-input"
                    />
                    <span>🏨 Premium Stays</span>
                  </label>

                  <label className="fd-checkbox-label">
                    <input 
                      type="checkbox"
                      checked={filterMeals}
                      onChange={(e) => setFilterMeals(e.target.checked)}
                      className="fd-checkbox-input"
                    />
                    <span>🍽 Breakfast Included</span>
                  </label>
                </div>

                <div className="fd-mobile-panel-footer">
                  <button
                    onClick={() => {
                      handleResetFilters();
                      setShowMobileFilterPanel(false);
                    }}
                    className="fd-btn-reset"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => setShowMobileFilterPanel(false)}
                    className="fd-btn-apply"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedTour && (
          <div className="fd-modal-backdrop">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fd-modal"
            >
              <div className="fd-modal-header">
                <div>
                  <span className="fd-modal-header-sub">Secure Your Departure Seat</span>
                  <h3 className="fd-modal-header-title">
                    Reserve Tour Seat
                  </h3>
                </div>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="fd-modal-close"
                >
                  <X />
                </button>
              </div>

              <div className="fd-modal-body">
                <div className="fd-modal-summary-box">
                  <div className="fd-modal-summary-img-wrap">
                    <img src={selectedTour.image} alt={selectedTour.title} className="fd-modal-summary-img" />
                  </div>
                  <div className="fd-modal-summary-details">
                    <h4 className="fd-modal-summary-title">{selectedTour.title}</h4>
                    <p className="fd-modal-summary-text">📅 Date: <span>{new Date(selectedTour.departureDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                    <p className="fd-modal-summary-text">💰 Price: <span className="price">₹{selectedTour.price.toLocaleString()}/-</span></p>
                    <p className="fd-modal-summary-text">✈️ Departure: <span>{selectedTour.departureCity}</span></p>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="fd-modal-form">
                  <div className="fd-form-group">
                    <label className="fd-form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingForm.fullName}
                      onChange={(e) => setBookingForm({...bookingForm, fullName: e.target.value})}
                      className="fd-form-input"
                      placeholder="e.g. Jeevananthan"
                      required
                    />
                  </div>

                  <div className="fd-form-row">
                    <div className="fd-form-group">
                      <label className="fd-form-label">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={bookingForm.phoneNumber}
                        onChange={(e) => setBookingForm({...bookingForm, phoneNumber: e.target.value})}
                        className="fd-form-input"
                        placeholder="e.g. +91 94941 41475"
                        required
                      />
                    </div>
                    <div className="fd-form-group">
                      <label className="fd-form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={bookingForm.emailAddress}
                        onChange={(e) => setBookingForm({...bookingForm, emailAddress: e.target.value})}
                        className="fd-form-input"
                        placeholder="e.g. name@domain.com"
                      />
                    </div>
                  </div>

                  <div className="fd-form-group">
                    <label className="fd-form-label">
                      Number of Travellers
                    </label>
                    <select
                      value={bookingForm.travellersCount}
                      onChange={(e) => setBookingForm({...bookingForm, travellersCount: e.target.value})}
                      className="fd-form-select"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="5+">5+ Persons</option>
                    </select>
                  </div>

                  <div className="fd-form-group">
                    <label className="fd-form-label">
                      Special requests or remarks
                    </label>
                    <textarea
                      value={bookingForm.specialRequests}
                      onChange={(e) => setBookingForm({...bookingForm, specialRequests: e.target.value})}
                      className="fd-form-textarea"
                      placeholder="Specify roommate preference, dietary needs, flight preferences..."
                    />
                  </div>

                  <div className="fd-modal-footer">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="fd-btn-cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="fd-btn-submit"
                    >
                      <span>Proceed on WhatsApp</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default FixedDepartures;
