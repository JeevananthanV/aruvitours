import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: '/maldives/maldives-overwater-villas.jpg',
      title: 'Maldives Overwater Villas',
      subtitle: 'Luxury Sanctuary'
    },
    {
      id: 2,
      image: '/japan/japan-cherry-blossoms.jpg',
      title: 'Japan Cherry Blossoms',
      subtitle: 'Cultural Heritage'
    },
    {
      id: 3,
      image: '/kerala/kerala-backwaters-twilight-serenity.jpg',
      title: 'Kerala Backwaters',
      subtitle: 'Serene Sanctuary'
    },
    {
      id: 4,
      image: '/goa/goa-fort-aguda-sunset.jpg',
      title: 'Goa Fort Sunset',
      subtitle: 'Coastal Paradise'
    },
    {
      id: 5,
      image: '/kashmir/kashmir-dal-lake-srinagar.jpg',
      title: 'Kashmir Dal Lake',
      subtitle: 'Alpine Heaven'
    },
    {
      id: 6,
      image: '/ladakh/ladakh-pangong-lake.jpg',
      title: 'Ladakh Pangong Lake',
      subtitle: 'Himalayan Adventure'
    }
  ];

  return (
    <section className="immersive-gallery-section">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-subtitle font-gold">Visual Inspiration</span>
          <h2 className="section-title-editorial">Travel Gallery</h2>
          <div className="section-title-separator"></div>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-item-card">
              <div className="gallery-image-wrapper">
                <img src={item.image} alt={item.title} className="gallery-image" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-subtitle">{item.subtitle}</span>
                  <h4 className="gallery-item-title">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
