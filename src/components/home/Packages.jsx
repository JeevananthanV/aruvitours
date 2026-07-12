import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const PACKAGES = [
  // Domestic I
  {
    id: 1,
    name: "Kerala",
    region: "domestic",
    tag: "Backwaters & Houseboats",
    image: "/kerala/kerala-hero-banner-backwaters.avif",
    path: "/domestic/kerala",
    price: 12500,
    rating: 4.9,
    reviews: 148,
    experiences: ["honeymoon", "wellness"],
  },
  {
    id: 2,
    name: "Goa",
    region: "domestic",
    tag: "Sun, Sand & Beach Shacks",
    image: "/goa/goa-beach-shack-sunset.jpg",
    path: "/domestic/goa",
    price: 9999,
    rating: 4.8,
    reviews: 215,
    experiences: ["family", "honeymoon"],
  },
  {
    id: 3,
    name: "Andaman",
    region: "domestic",
    tag: "Tropical Beach Paradise",
    image: "/Andaman/sea.jpg",
    path: "/domestic/andaman",
    price: 18999,
    rating: 4.9,
    reviews: 132,
    experiences: ["honeymoon", "luxury"],
  },
  {
    id: 4,
    name: "Golden Triangle",
    region: "domestic",
    tag: "Heritage Taj Mahal Trail",
    image: "/golden_triangle/golden-triangle-taj-mahal-agra.jpg",
    path: "/domestic/golden-triangle",
    price: 14500,
    rating: 4.9,
    reviews: 189,
    experiences: ["family"],
  },
  {
    id: 5,
    name: "Himachal",
    region: "domestic",
    tag: "Scenic Mountain Escape",
    image: "/Himachal Pradesh/himachal-shimla-mall-road.jpg",
    path: "/domestic/himachal",
    price: 11999,
    rating: 4.8,
    reviews: 167,
    experiences: ["family", "adventure"],
  },
  {
    id: 6,
    name: "Kashmir",
    region: "domestic",
    tag: "Paradise Valley Snow Peaks",
    image: "/Kashmir/kashmir-gulmarg-ski-resort.jpg",
    path: "/domestic/kashmir",
    price: 17500,
    rating: 5.0,
    reviews: 284,
    experiences: ["honeymoon", "family"],
  },
  {
    id: 7,
    name: "Rajasthan",
    region: "domestic",
    tag: "Palaces & Desert Safaris",
    image: "/Rajasthan/rajasthan-hawa-mahal-jaipur.jpg",
    path: "/domestic/rajasthan",
    price: 15500,
    rating: 4.9,
    reviews: 198,
    experiences: ["luxury", "family"],
  },
  {
    id: 8,
    name: "Sikkim",
    region: "domestic",
    tag: "Himalayan Buddhist Monasteries",
    image: "/Sikkim/sikkim-gangtok-city-view.jpg",
    path: "/domestic/sikkim",
    price: 13900,
    rating: 4.8,
    reviews: 122,
    experiences: ["honeymoon", "adventure"],
  },

  // Domestic II
  {
    id: 9,
    name: "Assam",
    region: "domestic",
    tag: "Wildlife Kaziranga Rhino Safari",
    image: "/Assam/assam-kaziranga-one-horn-rhino.jpg",
    path: "/domestic/assam",
    price: 11500,
    rating: 4.7,
    reviews: 84,
    experiences: ["adventure"],
  },
  {
    id: 10,
    name: "Gujarat",
    region: "domestic",
    tag: "Salt Desert Rann of Kutch",
    image: "/Gujarat/gujarat-rann-of-kutch.jpg",
    path: "/domestic/gujarat",
    price: 10900,
    rating: 4.6,
    reviews: 95,
    experiences: ["family"],
  },
  {
    id: 11,
    name: "Ladakh",
    region: "domestic",
    tag: "High Altitude Passes & Lakes",
    image: "/Ladakh/ladakh-pangong-lake.jpg",
    path: "/domestic/ladakh",
    price: 21900,
    rating: 5.0,
    reviews: 312,
    experiences: ["adventure"],
  },
  {
    id: 12,
    name: "Lakshadweep",
    region: "domestic",
    tag: "Unspoiled Coral Lagoon Islands",
    image: "/Lakshadweep/lakshadweep-agatti-island.jpg",
    path: "/domestic/lakshadweep",
    price: 24500,
    rating: 4.9,
    reviews: 73,
    experiences: ["luxury", "honeymoon"],
  },
  {
    id: 13,
    name: "Odisha",
    region: "domestic",
    tag: "Konark Sun Temple & Puri Beach",
    image: "/Odisha/odisha-sun-temple-konark.jpg",
    path: "/domestic/odisha",
    price: 9500,
    rating: 4.6,
    reviews: 58,
    experiences: ["family"],
  },
  {
    id: 14,
    name: "Meghalaya",
    region: "domestic",
    tag: "Cleanest Village & Crystal Rivers",
    image: "/Meghalaya/meghalaya-dawki-river.jpg",
    path: "/domestic/meghalaya",
    price: 14800,
    rating: 4.9,
    reviews: 109,
    experiences: ["adventure"],
  },
  {
    id: 15,
    name: "Arunachal Pradesh",
    region: "domestic",
    tag: "Ziro Valley & Tawang Monastery",
    image: "/Arunachal Pradesh/arunachal-tawang-monastery.jpg",
    path: "/domestic/arunachal-pradesh",
    price: 16500,
    rating: 4.8,
    reviews: 92,
    experiences: ["adventure"],
  },

  // International I
  {
    id: 16,
    name: "Malaysia",
    region: "international",
    tag: "Kuala Lumpur Skylines",
    image: "/malaysia/malaysia-kuala-lumpur-petronas.jpg",
    path: "/international/malaysia",
    price: 34500,
    rating: 4.8,
    reviews: 165,
    experiences: ["family", "international"],
  },
  {
    id: 17,
    name: "Singapore",
    region: "international",
    tag: "Modern Gardens By The Bay",
    image: "/singapore/singapore-marina-bay-sands.jpg",
    path: "/international/singapore",
    price: 39500,
    rating: 4.9,
    reviews: 198,
    experiences: ["family", "international"],
  },
  {
    id: 18,
    name: "Thailand",
    region: "international",
    tag: "Buddhist Temples & Exotic Islands",
    image: "/Thailand/thailand-bangkok-grand-palace.jpg",
    path: "/international/thailand",
    price: 29900,
    rating: 4.8,
    reviews: 284,
    experiences: ["wellness", "international"],
  },
  {
    id: 19,
    name: "Sri Lanka",
    region: "international",
    tag: "Sigiriya Rock & Scenic Train Rides",
    image: "/srilanka/sri-lanka-sigiriya-rock-fortress.webp",
    path: "/international/sri-lanka",
    price: 27500,
    rating: 4.7,
    reviews: 154,
    experiences: ["wellness", "honeymoon", "international"],
  },
  {
    id: 20,
    name: "Bali",
    region: "international",
    tag: "Scenic Rice Terraces & Surf Beaches",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
    path: "/international/bali",
    price: 32999,
    rating: 4.9,
    reviews: 247,
    experiences: ["honeymoon", "wellness", "international"],
  },
  {
    id: 21,
    name: "Dubai",
    region: "international",
    tag: "Burj Khalifa & Desert Safari Glamp",
    image: "/Dubai/dubai-1.jpg",
    path: "/international/dubai",
    price: 42500,
    rating: 4.9,
    reviews: 265,
    experiences: ["luxury", "family", "international"],
  },
  {
    id: 22,
    name: "Maldives",
    region: "international",
    tag: "Private Lagoon Villas",
    image: "/Maldives/mal-1.jpg",
    path: "/international/maldives",
    price: 54999,
    rating: 5.0,
    reviews: 178,
    experiences: ["honeymoon", "luxury", "international"],
  },
  {
    id: 23,
    name: "Nepal",
    region: "international",
    tag: "Himalayan Sunrise & Pokhara Lakes",
    image: "/nepal/nepal-kathmandu-durbar-square.jpg",
    path: "/international/nepal",
    price: 19500,
    rating: 4.7,
    reviews: 118,
    experiences: ["family", "international"],
  },
  {
    id: 24,
    name: "Bhutan",
    region: "international",
    tag: "Tiger's Nest Monastery Hike",
    image: "/Bhutan/bhu-1.jpg",
    path: "/international/bhutan",
    price: 36500,
    rating: 4.9,
    reviews: 94,
    experiences: ["wellness", "honeymoon", "international"],
  },
  {
    id: 25,
    name: "Philippines",
    region: "international",
    tag: "El Nido Island Lagoon Cruises",
    image: "/Philippines/php-1.jpg",
    path: "/international/philippines",
    price: 41800,
    rating: 4.8,
    reviews: 112,
    experiences: ["adventure", "international"],
  },

  // International II
  {
    id: 26,
    name: "Vietnam",
    region: "international",
    tag: "Ha Long Bay Limestone Cruises",
    image: "/Vietnam/vie-1.jpg",
    path: "/international/vietnam",
    price: 28500,
    rating: 4.9,
    reviews: 204,
    experiences: ["adventure", "international"],
  },
  {
    id: 27,
    name: "Cambodia",
    region: "international",
    tag: "Angkor Wat Ancient Temples",
    image: "/Cambodia/cambodia-1.jpg",
    path: "/international/cambodia",
    price: 29500,
    rating: 4.7,
    reviews: 87,
    experiences: ["adventure", "international"],
  },
  {
    id: 28,
    name: "Japan",
    region: "international",
    tag: "Cherry Blossoms & Bullet Trains",
    image: "/Japan/japan-1.jpg",
    path: "/international/japan",
    price: 78500,
    rating: 5.0,
    reviews: 164,
    experiences: ["luxury", "international"],
  },
  {
    id: 29,
    name: "China",
    region: "international",
    tag: "Great Wall & Forbidden City Trails",
    image: "/China/greatwall.webp",
    path: "/international/china",
    price: 52000,
    rating: 4.6,
    reviews: 73,
    experiences: ["international"],
  },
  {
    id: 30,
    name: "Kenya",
    region: "international",
    tag: "Maasai Mara Serengeti Wild Safari",
    image: "/Kenya/kenya-1.jpg",
    path: "/international/kenya",
    price: 89000,
    rating: 4.9,
    reviews: 104,
    experiences: ["adventure", "international"],
  },
  {
    id: 31,
    name: "Brunei",
    region: "international",
    tag: "Sultanate Palaces & Golden Domes",
    image: "/Brunei/bru-1.jpg",
    path: "/international/brunei",
    price: 36000,
    rating: 4.6,
    reviews: 43,
    experiences: ["luxury", "international"],
  },
  {
    id: 32,
    name: "Hong Kong & Macau",
    region: "international",
    tag: "Disneyland & Senado Squares",
    image: "/HongKongmacau/hong-kong-disneyland.jpg",
    path: "/international/hong-kong-macau",
    price: 49500,
    rating: 4.7,
    reviews: 132,
    experiences: ["family", "international"],
  },
  {
    id: 33,
    name: "Russia",
    region: "international",
    tag: "Red Square & Hermitage Museum",
    image: "/Russia/russia-1.jpg",
    path: "/international/russia",
    price: 68500,
    rating: 4.8,
    reviews: 115,
    experiences: ["luxury", "international"],
  },
  {
    id: 34,
    name: "Turkey",
    region: "international",
    tag: "Cappadocia Hot Air Ballooning",
    image: "/Turkey/turkey-1.jpg",
    path: "/international/turkey",
    price: 59900,
    rating: 4.9,
    reviews: 216,
    experiences: ["adventure", "international"],
  },
  {
    id: 35,
    name: "Egypt",
    region: "international",
    tag: "Nile River Cruises & Great Pyramids",
    image: "/Egypt/egypt-2.jpg",
    path: "/international/egypt",
    price: 64900,
    rating: 4.8,
    reviews: 154,
    experiences: ["luxury", "international"],
  },
];

export default function Packages({ activeFilter, onFilterChange }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState(activeFilter || "all");

  useEffect(() => {
    if (activeFilter) {
      setTab(activeFilter);
    }
  }, [activeFilter]);

  const filtered = useMemo(() => {
    return PACKAGES.filter((p) => {
      // Fix search options to match name, tag or experiences
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tag.toLowerCase().includes(search.toLowerCase());

      if (tab === "all") return matchesSearch;
      if (tab === "international") {
        return p.region === "international" && matchesSearch;
      }
      return p.experiences.includes(tab) && matchesSearch;
    });
  }, [tab, search]);

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

  return (
    <div className="section" id="packages">
      <motion.div
        className="sec-header reveal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="sec-eyebrow">Curated Packages</p>
          <h2 className="sec-title">
            Popular <em>Destinations</em>
          </h2>
        </div>
      </motion.div>

      <div className="pkg-controls">
        <div className="pkg-search">
          <input
            type="text"
            placeholder="Search destination, theme, region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="pkg-tabs" style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
          <button
            className={tab === "all" ? "active" : ""}
            onClick={() => {
              setTab("all");
              onFilterChange && onFilterChange("all");
            }}
          >
            All
          </button>
          <button
            className={tab === "honeymoon" ? "active" : ""}
            onClick={() => {
              setTab("honeymoon");
              onFilterChange && onFilterChange("honeymoon");
            }}
          >
            ❣ Honeymoon
          </button>
          <button
            className={tab === "family" ? "active" : ""}
            onClick={() => {
              setTab("family");
              onFilterChange && onFilterChange("family");
            }}
          >
            👨‍👩‍👧 Family
          </button>
          <button
            className={tab === "luxury" ? "active" : ""}
            onClick={() => {
              setTab("luxury");
              onFilterChange && onFilterChange("luxury");
            }}
          >
            ✦ Luxury
          </button>
          <button
            className={tab === "adventure" ? "active" : ""}
            onClick={() => {
              setTab("adventure");
              onFilterChange && onFilterChange("adventure");
            }}
          >
            ⛰ Adventure
          </button>
          <button
            className={tab === "wellness" ? "active" : ""}
            onClick={() => {
              setTab("wellness");
              onFilterChange && onFilterChange("wellness");
            }}
          >
            🌿 Wellness
          </button>
          <button
            className={tab === "international" ? "active" : ""}
            onClick={() => {
              setTab("international");
              onFilterChange && onFilterChange("international");
            }}
          >
            ✈ International
          </button>
        </div>
      </div>

      <motion.div
        className="pkg-grid stagger"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <motion.div
                className="pkg-card reveal premium-card"
                key={p.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="pkg-img-wrap hover-zoom-container">
                  <img src={p.image} alt={p.name} loading="lazy" style={{ height: "240px", objectFit: "cover", width: "100%" }} />
                  <div className="pkg-badge" style={{ textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.1em" }}>{p.region}</div>
                </div>
                <div className="pkg-body">
                  <h3>{p.name}</h3>
                  <p>{p.tag}</p>
                  <div className="pkg-meta">
                    <span className="pkg-price">₹{p.price.toLocaleString()}</span>
                    <span className="pkg-rating">
                      {"★".repeat(Math.floor(p.rating))}
                      <span className="pkg-reviews">({p.reviews})</span>
                    </span>
                  </div>
                  <Link to={p.path} className="pkg-link">
                    Explore Details
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="pkg-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}
            >
              No packages found matching your criteria. Try adjusting your filters or search terms.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
