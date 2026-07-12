import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Compass,
  MapPin,
  Calendar,
  ChevronRight,
  Star,
  Filter,
  ShieldCheck,
  HeartHandshake,
  Award,
  Clock,
  Sparkles,
  Luggage,
  ThumbsUp
} from 'lucide-react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

// Fully mapped database of 35 domestic and international tour packages
const packagesList = [
  // --- DOMESTIC (15) ---
  {
    id: 1,
    name: "Kerala",
    region: "domestic",
    durations: ["2N/3D", "3N/4D", "4N/5D", "5N/6D"],
    tagline: "God's Own Country - serene backwaters, mist-shrouded Munnar hills & spice orchards.",
    image: "/kerala/kerala-hero-banner-backwaters.avif",
    path: "/domestic/kerala",
    price: 12500,
    rating: 4.9,
    reviews: 148,
    highlight: "Backwater Houseboat Cruise Included"
  },
  {
    id: 2,
    name: "Goa",
    region: "domestic",
    durations: ["3N/4D"],
    tagline: "Golden sandy shores, colonial Portuguese architecture, and vibrant coastal luxury.",
    image: "/goa/goa-beach-shack-sunset.jpg",
    path: "/domestic/goa",
    price: 9999,
    rating: 4.8,
    reviews: 215,
    highlight: "Sunset Sailing & Beach Picnic"
  },
  {
    id: 3,
    name: "Andaman",
    region: "domestic",
    durations: ["2N/3D", "3N/4D", "4N/5D", "5N/6D"],
    tagline: "A tropical oasis featuring sapphire oceans, coral reefs, and pristine white sands.",
    image: "/Andaman/sea.jpg",
    path: "/domestic/andaman",
    price: 18999,
    rating: 4.9,
    reviews: 132,
    highlight: "Scuba Diving & Coral Safari"
  },
  {
    id: 4,
    name: "Golden Triangle",
    region: "domestic",
    durations: ["3N/4D", "4N/5D"],
    tagline: "Experience the historic heritage of Delhi, the iconic Taj Mahal in Agra, and Jaipur's royal palaces.",
    image: "/golden_triangle/golden-triangle-taj-mahal-agra.jpg",
    path: "/domestic/golden-triangle",
    price: 14500,
    rating: 4.9,
    reviews: 189,
    highlight: "Private Guided Palace Tours"
  },
  {
    id: 5,
    name: "Himachal",
    region: "domestic",
    durations: ["3N/4D (Manali)", "5N/6D (Shimla - Kullu Manali)"],
    tagline: "Pine-forested peaks, roaring glacial streams, and snow-capped Himalayan ridges.",
    image: "/Himachal Pradesh/himachal-shimla-mall-road.jpg",
    path: "/domestic/himachal",
    price: 11999,
    rating: 4.8,
    reviews: 167,
    highlight: "Solang Valley Snow Adventure"
  },
  {
    id: 6,
    name: "Kashmir",
    region: "domestic",
    durations: ["4N/5D"],
    tagline: "Sail on tranquil Srinagar lakes and witness Gulmarg's meadows in timeless alpine splendor.",
    image: "/Kashmir/kashmir-gulmarg-ski-resort.jpg",
    path: "/domestic/kashmir",
    price: 17500,
    rating: 5.0,
    reviews: 284,
    highlight: "Luxury Shikara Stay & Gondola Ride"
  },
  {
    id: 7,
    name: "Rajasthan",
    region: "domestic",
    durations: ["6N/7D"],
    tagline: "Imperial grandeur, massive desert fortresses, and vibrant traditional heritage.",
    image: "/Rajasthan/rajasthan-amber-fort-jaipur.jpg",
    path: "/domestic/rajasthan",
    price: 21999,
    rating: 4.9,
    reviews: 156,
    highlight: "Desert Glamping & Royal Fort Stays"
  },
  {
    id: 8,
    name: "Sikkim",
    region: "domestic",
    durations: ["4N/5D"],
    tagline: "Darjeeling's world-famous emerald tea gardens paired with Gangtok's peaceful monasteries.",
    image: "/Sikkim/sikkim-gurudongmar-lake.jpg",
    path: "/domestic/sikkim",
    price: 15999,
    rating: 4.8,
    reviews: 98,
    highlight: "Kanchenjunga Sunrise View Point"
  },
  {
    id: 9,
    name: "Assam",
    region: "domestic",
    durations: ["3N/4D"],
    tagline: "Majestic tea plantations, holy Brahmaputra shores, and rare wildlife encounters.",
    image: "/Assam/assam-kaziranga-one-horn-rhino.jpg",
    path: "/domestic/assam",
    price: 13500,
    rating: 4.7,
    reviews: 74,
    highlight: "Kaziranga Elephant Safari"
  },
  {
    id: 10,
    name: "Gujarat",
    region: "domestic",
    durations: ["5N/6D"],
    tagline: "Vibrant salt deserts of Kutch, historic stepwells, and ancient temple architectural marvels.",
    image: "/Gujarat/gujarat-gir-forest-lion.jpg",
    path: "/domestic/gujarat",
    price: 16999,
    rating: 4.8,
    reviews: 83,
    highlight: "Rann of Kutch Moonlight Dinner"
  },
  {
    id: 11,
    name: "Ladakh",
    region: "domestic",
    durations: ["4N/5D"],
    tagline: "High-altitude blue lakes, stark moon-like landscapes, and ancient Buddhist passes.",
    image: "/Ladakh/ladakh-pangong-lake.jpg",
    path: "/domestic/ladakh",
    price: 24999,
    rating: 4.9,
    reviews: 112,
    highlight: "Pangong Tso Lakeside Glamping"
  },
  {
    id: 12,
    name: "Lakshadweep",
    region: "domestic",
    durations: ["3N/4D"],
    tagline: "Untouched turquoise lagoons, coral atolls, and complete coastal isolation.",
    image: "/Lakshadweep/lakshadweep-agatti-island.jpg",
    path: "/domestic/lakshadweep",
    price: 26500,
    rating: 4.9,
    reviews: 65,
    highlight: "Exclusive Atoll Lagoon Cruises"
  },
  {
    id: 13,
    name: "Odisha",
    region: "domestic",
    durations: ["3N/4D"],
    tagline: "Ancient architectural temples, serene Chilika Lake, and quiet gold-sand shorelines.",
    image: "/Odisha/odisha-jagannath-temple.jpg",
    path: "/domestic/odisha",
    price: 11500,
    rating: 4.7,
    reviews: 59,
    highlight: "Konark Sun Temple Cultural Walk"
  },
  {
    id: 14,
    name: "Meghalaya",
    region: "domestic",
    durations: ["3N/4D"],
    tagline: "The abode of clouds, home to living root bridges, pristine gorges, and spectacular waterfalls.",
    image: "/Meghalaya/meghalaya-living-root-bridge.jpg",
    path: "/domestic/meghalaya",
    price: 14500,
    rating: 4.9,
    reviews: 94,
    highlight: "Double Decker Root Bridge Hike"
  },
  {
    id: 15,
    name: "Arunachal",
    region: "domestic",
    durations: ["5N/6D"],
    tagline: "Walk through mystical Tawang monastery, snowy high mountain passes, and hidden tribal valleys.",
    image: "/Arunachal Pradesh/arunachal-tawang-monastery.jpg",
    path: "/domestic/arunachal-pradesh",
    price: 19500,
    rating: 4.9,
    reviews: 77,
    highlight: "Tawang Monastery Golden Hour Walk"
  },

  // --- INTERNATIONAL (20) ---
  {
    id: 16,
    name: "Malaysia",
    region: "international",
    durations: ["3N/4D", "4N/5D"],
    tagline: "Skyscrapers of Kuala Lumpur paired with historic rainforests and beautiful shorelines.",
    image: "/malaysia/malaysia-kuala-lumpur-petronas.jpg",
    path: "/international/malaysia",
    price: 28500,
    rating: 4.8,
    reviews: 142,
    highlight: "Petronas Twin Towers Skybridge Pass"
  },
  {
    id: 17,
    name: "Singapore",
    region: "international",
    durations: ["2N/3D", "3N/4D"],
    tagline: "The modern futuristic garden city of Asia, featuring high-end entertainment & dining.",
    image: "/singapore/singapore-marina-bay-sands.jpg",
    path: "/international/singapore",
    price: 39500,
    rating: 4.9,
    reviews: 198,
    highlight: "Universal Studios & Gardens by the Bay"
  },
  {
    id: 18,
    name: "Thailand",
    region: "international",
    durations: ["3N/4D", "4N/5D"],
    tagline: "Gilded city temples, vibrant street bazaars, and legendary beaches in Phuket & Krabi.",
    image: "https://images.unsplash.com/photo-1528181304800-2f1702ad9fbe?q=80&w=600&auto=format&fit=crop",
    path: "/international/thailand",
    price: 24500,
    rating: 4.8,
    reviews: 324,
    highlight: "Phi Phi Islands Private Speedboat"
  },
  {
    id: 19,
    name: "Sri Lanka",
    region: "international",
    durations: ["2N/3D", "3N/4D", "4N/5D"],
    tagline: "UNESCO fortress peaks, colonial hillside tea trains, and pristine Indian Ocean waves.",
    image: "/srilanka/sri-lanka-sigiriya-rock-fortress.webp",
    path: "/international/sri-lanka",
    price: 22500,
    rating: 4.8,
    reviews: 119,
    highlight: "Scenic Ella Hill Country Train Ride"
  },
  {
    id: 20,
    name: "Bali",
    region: "international",
    durations: ["4N/5D"],
    tagline: "Mystical volcanic temples, terraced emerald rice fields, and ultra-luxurious beach resorts.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
    path: "/international/bali",
    price: 32999,
    rating: 4.9,
    reviews: 247,
    highlight: "Ubud Private Villa with Infinity Pool"
  },
  {
    id: 21,
    name: "Dubai",
    region: "international",
    durations: ["4N/5D"],
    tagline: "Dazzling desert skyscrapers, luxury shopping malls, and world-class theme parks.",
    image: "/Dubai/dubai-1.jpg",
    path: "/international/dubai",
    price: 42500,
    rating: 4.9,
    reviews: 265,
    highlight: "Burj Khalifa 124th Floor Sunset View"
  },
  {
    id: 22,
    name: "Maldives",
    region: "international",
    durations: ["3N/4D"],
    tagline: "Overwater bungalows, vibrant private lagoons, and five-star reef snorkeling sanctuaries.",
    image: "/Maldives/mal-1.jpg",
    path: "/international/maldives",
    price: 54999,
    rating: 5.0,
    reviews: 178,
    highlight: "Private All-Inclusive Water Villa"
  },
  {
    id: 23,
    name: "Nepal",
    region: "international",
    durations: ["3N/4D", "4N/5D"],
    tagline: "Ancient Himalayan temples, Pokhara's peaceful lakes, and sweeping Everest mountain views.",
    image: "/nepal/nepal-kathmandu-durbar-square.jpg",
    path: "/international/nepal",
    price: 18500,
    rating: 4.7,
    reviews: 104,
    highlight: "Everest Mountain Scenic Flight"
  },
  {
    id: 24,
    name: "Bhutan",
    region: "international",
    durations: ["4N/5D"],
    tagline: "The Land of the Thunder Dragon, home to spectacular cliffside monasteries and deep peace.",
    image: "/Bhutan/bhu-1.jpg",
    path: "/international/bhutan",
    price: 36500,
    rating: 4.9,
    reviews: 89,
    highlight: "Hike to Tiger's Nest Monastery"
  },
  {
    id: 25,
    name: "Philippines",
    region: "international",
    durations: ["4N/5D"],
    tagline: "Secluded pristine white lagoons of El Nido and spectacular Chocolate Hills landscapes.",
    image: "/Philippines/php-1.jpg",
    path: "/international/philippines",
    price: 37999,
    rating: 4.8,
    reviews: 82,
    highlight: "Coron Island Island-Hopping Tour"
  },
  {
    id: 26,
    name: "Vietnam",
    region: "international",
    durations: ["3N/4D", "4N/5D", "6N/7D"],
    tagline: "Sail across towering limestone karsts in Halong Bay and walk through French colonial towns.",
    image: "/Vietnam/vie-1.jpg",
    path: "/international/vietnam",
    price: 29999,
    rating: 4.9,
    reviews: 213,
    highlight: "Halong Bay Luxury Overnight Cruise"
  },
  {
    id: 27,
    name: "Cambodia",
    region: "international",
    durations: ["3N/4D"],
    tagline: "Step back in history inside majestic Angkor Wat, a true architectural wonder of the world.",
    image: "/Cambodia/cambodia-1.jpg",
    path: "/international/cambodia",
    price: 26500,
    rating: 4.8,
    reviews: 79,
    highlight: "Sunrise Guided Angkor Wat Tour"
  },
  {
    id: 28,
    name: "Japan",
    region: "international",
    durations: ["8N/9D"],
    tagline: "Dazzling neon lights of Tokyo paired with ancient Kyoto temples and majestic Mt. Fuji.",
    image: "/Japan/japan-1.jpg",
    path: "/international/japan",
    price: 115000,
    rating: 5.0,
    reviews: 134,
    highlight: "Bullet Train Pass & Mt. Fuji Onsen"
  },
  {
    id: 29,
    name: "China",
    region: "international",
    durations: ["6N/7D", "8N/9D"],
    tagline: "Walk on the majestic Great Wall, explore ancient forbidden empires, and modern Shanghai.",
    image: "/China/beijing.jpg",
    path: "/international/china",
    price: 78500,
    rating: 4.7,
    reviews: 92,
    highlight: "Private Forbidden City VIP Walk"
  },
  {
    id: 30,
    name: "Kenya",
    region: "international",
    durations: ["4N/5D"],
    tagline: "An unforgettable safari to see the spectacular wildlife migrations across the Masai Mara.",
    image: "/Kenya/kenya-1.jpg",
    path: "/international/kenya",
    price: 89000,
    rating: 4.9,
    reviews: 115,
    highlight: "Masai Mara Hot Air Balloon Safari"
  },
  {
    id: 31,
    name: "Brunei",
    region: "international",
    durations: ["2N/3D", "3N/4D"],
    tagline: "A peaceful kingdom adorned with spectacular golden mosques and historic water villages.",
    image: "/Brunei/bru-1.jpg",
    path: "/international/brunei",
    price: 34500,
    rating: 4.6,
    reviews: 48,
    highlight: "Sultan Omar Ali Saifuddien Mosque Walk"
  },
  {
    id: 32,
    name: "Hong Kong & Macau",
    region: "international",
    durations: ["4N/5D"],
    tagline: "High-energy skyline harbors of Hong Kong coupled with European Macau heritage.",
    image: "/HongKongmacau/hong-kong-victoria-harbor.jpg",
    path: "/international/hong-kong-macau",
    price: 49500,
    rating: 4.8,
    reviews: 121,
    highlight: "Victoria Peak Tram & Macau Ferry"
  },
  {
    id: 33,
    name: "Russia",
    region: "international",
    durations: ["5N/6D"],
    tagline: "The imperial palaces of St. Petersburg and Moscow's world-famous Red Square grandeur.",
    image: "/Russia/russia-2.jpg",
    path: "/international/russia",
    price: 68500,
    rating: 4.8,
    reviews: 106,
    highlight: "Red Square & Hermitage Museum VIP Passes"
  },
  {
    id: 34,
    name: "Turkey",
    region: "international",
    durations: ["6N/7D"],
    tagline: "Marvel at Istanbul's historic domes and fly over magical Cappadocia fairy chimneys.",
    image: "/Turkey/turkey-1.jpg",
    path: "/international/turkey",
    price: 59500,
    rating: 4.9,
    reviews: 187,
    highlight: "Cappadocia Sunrise Hot Air Balloon"
  },
  {
    id: 35,
    name: "Egypt",
    region: "international",
    durations: ["4N/5D"],
    tagline: "Behold the legendary Pyramids of Giza and cruise down the historic mystical Nile river.",
    image: "/Egypt/egypt-2.jpg",
    path: "/international/egypt",
    price: 48999,
    rating: 4.9,
    reviews: 165,
    highlight: "Great Sphinx & Nile Dinner Cruise"
  }
];

// Luxury Services provided by Aruvi Tours (Services & Offerings)
const servicesList = [
  {
    id: 1,
    title: "Bespoke Itineraries",
    icon: <Compass className="w-6 h-6" />,
    desc: "Every journey is customized to match your individual pace, interests, and preferences."
  },
  {
    id: 2,
    title: "Premium Lodgings",
    icon: <Award className="w-6 h-6" />,
    desc: "Handpicked 5-star properties, heritage palaces, and luxury boutique stays worldwide."
  },
  {
    id: 3,
    title: "Hassle-Free Visa Desk",
    icon: <ShieldCheck className="w-6 h-6" />,
    desc: "Complete, seamless document processing and expert guidance for all international escapes."
  },
  {
    id: 4,
    title: "24/7 Concierge Support",
    icon: <HeartHandshake className="w-6 h-6" />,
    desc: "Dedicated personal travel assistance always online to resolve any requirement in real time."
  }
];

export default function Packages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortOption, setSortOption] = useState("alphabetical");

  useEffect(() => {
    document.title = "Explore Packages | Aruvi Tours";
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort computation
  const filteredAndSortedPackages = useMemo(() => {
    let result = [...packagesList];

    // Filter by Region tab
    if (activeTab !== "all") {
      result = result.filter((pkg) => pkg.region === activeTab);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(query) ||
          pkg.tagline.toLowerCase().includes(query) ||
          pkg.region.toLowerCase().includes(query)
      );
    }

    // Sorting logic
    if (sortOption === "alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeTab, searchQuery, sortOption]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveTab("all");
    setSortOption("alphabetical");
  };

  return (
    <div className="packages-wrapper">
      <Navbar />

      {/* Cinematic Hero Header */}
      <section className="pk-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop')" }}>
        <div className="pk-hero-content">
          <div className="pk-hero-badge">
            <Sparkles className="w-3.5 h-3.5 inline mr-1" /> Curated Escapes
          </div>
          <h1 className="pk-hero-title">
            Bespoke <em>Journeys</em>
          </h1>
          <p className="pk-hero-tagline">
            Immersive itineraries handcrafted for the discerning wanderer.
          </p>
        </div>
      </section>

      {/* Sticky-Feel Control Hub (Search, Sort, Region Tabs) */}
      <section className="pk-control-hub">
        <div className="pk-control-inner">
          <div className="pk-search-grid">
            {/* Search Box */}
            <div className="pk-input-group">
              <Search className="pk-input-icon w-5 h-5" />
              <input
                id="package-search-input"
                type="text"
                placeholder="Search destinations (e.g. Kerala, Japan...)"
                className="pk-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="pk-input-group">
              <select
                id="package-sort-select"
                className="pk-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="alphabetical">Sort alphabetically (A-Z)</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Category / Region Pills inside the Hub */}
            <div className="flex gap-2 justify-center sm:justify-end items-center">
              <button
                id="filter-tab-all"
                className={`pk-tab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Escapes
              </button>
              <button
                id="filter-tab-domestic"
                className={`pk-tab-btn ${activeTab === "domestic" ? "active" : ""}`}
                onClick={() => setActiveTab("domestic")}
              >
                Domestic
              </button>
              <button
                id="filter-tab-international"
                className={`pk-tab-btn ${activeTab === "international" ? "active" : ""}`}
                onClick={() => setActiveTab("international")}
              >
                International
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="pk-section" id="packages-listing">
        <div className="flex justify-between items-center mb-6">
          <h2 className="pk-results-count">
            Showing {filteredAndSortedPackages.length} luxury destinations
          </h2>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredAndSortedPackages.length > 0 ? (
            <motion.div
              layout
              className="pk-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredAndSortedPackages.map((pkg, idx) => (
                <motion.div
                  layout
                  key={pkg.id}
                  className="pk-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.04, 0.3), duration: 0.5 }}
                >
                  {/* Card Image Header */}
                  <div className="pk-card-image-wrapper">
                    <img
                      src={pkg.image}
                      alt={`${pkg.name} luxury getaway`}
                      className="pk-card-image"
                      loading="lazy"
                    />
                    <div className="pk-card-gradient"></div>
                    <span className="pk-card-badge">{pkg.region}</span>
                    <span className="pk-card-rating">
                      <Star className="w-3 h-3 fill-current" />
                      {pkg.rating}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="pk-card-body">
                    <h3 className="pk-card-title">{pkg.name}</h3>

                    {/* Available Durations */}
                    <div className="pk-card-durations">
                      {pkg.durations.map((dur, idx) => (
                        <span key={idx} className="pk-duration-tag">
                          {dur}
                        </span>
                      ))}
                    </div>

                    <p className="pk-card-tagline">{pkg.tagline}</p>

                    {/* Highlight Pill */}
                    {pkg.highlight && (
                      <div className="mt-2 text-xs text-[#C9A84C] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{pkg.highlight}</span>
                      </div>
                    )}

                    {/* Footer / Price & Call To Action */}
                    <div className="pk-card-footer">
                      <div className="pk-card-price">
                        <span className="pk-price-label">Starting From</span>
                        <span className="pk-price-val">
                          ₹{pkg.price.toLocaleString("en-IN")}
                          <small>/ person</small>
                        </span>
                      </div>
                      <Link
                        id={`explore-btn-${pkg.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        to={pkg.path}
                        className="pk-card-btn"
                      >
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              className="pk-empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Compass className="w-12 h-12 text-[#C9A84C] mx-auto mb-4 stroke-[1.5]" />
              <h3 className="pk-empty-title">No Escapes Found</h3>
              <p className="pk-empty-desc">
                We couldn't find any packages matching your search criteria. Let's try resetting the filters.
              </p>
              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="pk-empty-btn"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Services & Offerings Section */}
      <section className="srv-section" id="services">
        <div className="srv-container">
          <div className="srv-header">
            <span className="srv-label">Services & Offerings</span>
            <h2 className="srv-title">
              Bespoke Services, <em>Curated for You</em>
            </h2>
            <p className="srv-desc">
              At Aruvi Tours, we turn vacation planning into an art. Enjoy meticulous attention to detail, luxury transfers, and premium inclusions on every single departure.
            </p>
          </div>

          <div className="srv-grid">
            {servicesList.map((srv) => (
              <div key={srv.id} className="srv-card">
                <div className="srv-card-icon">{srv.icon}</div>
                <h3 className="srv-card-title">{srv.title}</h3>
                <p className="srv-card-desc">{srv.desc}</p>
                <div className="srv-card-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
}

