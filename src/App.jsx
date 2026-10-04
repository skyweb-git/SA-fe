import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  MapPin, 
  Wifi, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Tv, 
  Coffee, 
  UtensilsCrossed, 
  Car, 
  Flame, 
  ExternalLink,
  BedDouble,
  Star,
  Plane,
  Lock,
  Home,
  Check,
  Bath,
  Maximize2,
  Users,
  Compass,
  Navigation,
  MessageSquare
} from 'lucide-react';
import { DestinationCard } from './components/ui/card-21';
import { 
  createBookingEnquiry, 
  getLocalContent, 
  fetchContentFromAPI, 
  subscribeToContentUpdates 
} from './lib/api';
import SEO from './components/SEO';
import './App.css';

export default function App() {
  const [cmsContent, setCmsContent] = useState(() => getLocalContent());
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'rooms' | 'amenities' | 'location' | 'contact'
  const [activeModal, setActiveModal] = useState(null); // 'booking' | null
  const [selectedRoomName, setSelectedRoomName] = useState('');
  const [bgChoice, setBgChoice] = useState('custom'); // 'custom' | 'estate' | 'surreal'
  const reviewsScrollRef = useRef(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    room: '',
    checkIn: '',
    checkOut: '',
    message: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Sync with Backend API and Live Admin Broadcast updates
  useEffect(() => {
    fetchContentFromAPI().then(data => {
      if (data) setCmsContent(data);
    });

    const unsubscribe = subscribeToContentUpdates((updated) => {
      if (updated) setCmsContent(updated);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Dynamically update CSS variables for colors if customized
  useEffect(() => {
    if (cmsContent?.theme) {
      const root = document.documentElement;
      if (cmsContent.theme.accentColor) {
        root.style.setProperty('--accent-primary', cmsContent.theme.accentColor);
      }
      if (cmsContent.theme.darkNavy) {
        root.style.setProperty('--navy-dark', cmsContent.theme.darkNavy);
      }
    }
  }, [cmsContent?.theme]);

  // Sync with window hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'rooms-page' || hash === 'rooms') {
        setCurrentPage('rooms');
      } else if (hash === 'amenities-page' || hash === 'amenities') {
        setCurrentPage('amenities');
      } else if (hash === 'location-page' || hash === 'location') {
        setCurrentPage('location');
      } else if (hash === 'contact-page' || hash === 'contact') {
        setCurrentPage('contact');
      } else if (hash === 'home' || !hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, sectionId = null) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const openBookingForRoom = (roomTitle) => {
    setSelectedRoomName(roomTitle);
    setBookingData(prev => ({ ...prev, room: roomTitle }));
    setActiveModal('booking');
  };

  const scrollReviews = (direction) => {
    if (reviewsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      reviewsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // The official rooms of Edion Royal Guesthouse (Dynamic from CMS with fallback)
  const defaultRoomsData = [
    {
      id: 'renovated-double',
      title: 'Renovated Double Room',
      badge: '2 Guests',
      stats: 'A calm, recently renovated room with a private en-suite bathroom, work desk, flat-screen TV and a dressing area.',
      features: ['Private bathroom', 'Work desk', 'Flat-screen TV', 'Wardrobe'],
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'twin-kitchenette',
      title: 'Twin Room with Kitchenette',
      badge: '2 Guests · Kitchenette',
      stats: 'Ideal for longer stays and colleagues travelling together — two beds plus a fridge, microwave and full kitchenware set.',
      features: ['Fridge & microwave', 'Kitchenware', 'Private bathroom', 'Free WiFi'],
      imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'triple-room',
      title: 'Triple Room',
      badge: '3 Guests',
      stats: 'A spacious room with a large double bed, bathroom, and reliable WiFi. Great value with flexible cancellation.',
      features: ['Private bathroom', 'Flat-screen TV', 'Free WiFi', 'Flexible cancellation'],
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'budget-double',
      title: 'Budget Double Room',
      badge: '2 Guests · Budget',
      stats: 'A compact, affordable room with a large double bed, private bathroom, and all standard amenities.',
      features: ['Private bathroom', 'Flat-screen TV', 'Free WiFi', 'Budget-friendly'],
      imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'comfort-triple-shower',
      title: 'Comfort Triple Room with Shower',
      badge: '3 Guests · Shower',
      stats: 'Comfortable triple room with shower, ideal for guests who want a little extra room and convenience.',
      features: ['Private bathroom', 'Shower', 'Flat-screen TV', 'Free WiFi'],
      imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'budget-triple',
      title: 'Budget Triple Room',
      badge: '3 Guests · Extra-Large Bed',
      stats: 'A larger triple room with a single bed and an extra-large double bed, perfect for a small group.',
      features: ['Private bathroom', 'Flat-screen TV', 'Free WiFi', 'Extra-large bed'],
      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'family-room',
      title: 'Family Room',
      badge: '3–4 Guests · Family Layout',
      stats: 'Family-friendly room with a single bed and a double bed, offering comfort and extra space.',
      features: ['Private bathroom', 'Flat-screen TV', 'Free WiFi', 'Family layout'],
      imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const defaultGuestReviews = [
    {
      id: 1,
      name: "Thandi M.",
      location: "Johannesburg",
      rating: 5.0,
      initials: "TM",
      quote: "Excellent location — an easy drive to the Waterfront and a short walk to the beachfront. The room was clean and the bed comfortable."
    },
    {
      id: 2,
      name: "Daniel K.",
      location: "United Kingdom",
      rating: 5.0,
      initials: "DK",
      quote: "Great value for money. Reception was helpful at all hours and the parking behind the gate gave us real peace of mind."
    },
    {
      id: 3,
      name: "Lerato S.",
      location: "Pretoria",
      rating: 5.0,
      initials: "LS",
      quote: "The kitchenette made our week-long stay so much easier. Quiet street, friendly hosts and strong WiFi for remote work."
    },
    {
      id: 4,
      name: "Francois & Anke B.",
      location: "Durban",
      rating: 5.0,
      initials: "FA",
      quote: "Such a peaceful oasis in Milnerton. Watching the Table Mountain sunset from the beachfront just down the road was unforgettable. We'll definitely be back!"
    },
    {
      id: 5,
      name: "Markus W.",
      location: "Munich, Germany",
      rating: 5.0,
      initials: "MW",
      quote: "Spotless en-suite room, very secure premises and super fast check-in. Perfect base for exploring Cape Town without city center traffic."
    },
    {
      id: 6,
      name: "Naledi K.",
      location: "Gqeberha",
      rating: 5.0,
      initials: "NK",
      quote: "The braai area and shared kitchen are fantastic bonuses. Warm hospitality, daily housekeeping, and truly felt like a home away from home."
    }
  ];

  // Dynamic Content Bindings
  const roomsData = (cmsContent?.roomsSection?.items && cmsContent.roomsSection.items.length > 0)
    ? cmsContent.roomsSection.items
    : defaultRoomsData;

  const guestReviews = (cmsContent?.reviewsSection?.items && cmsContent.reviewsSection.items.length > 0)
    ? cmsContent.reviewsSection.items
    : defaultGuestReviews;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    // Send to backend MongoDB via API
    await createBookingEnquiry(bookingData);
    setTimeout(() => {
      setBookingSubmitted(false);
      if (activeModal === 'booking') {
        setActiveModal(null);
      }
      setBookingData({ name: '', email: '', phone: '', room: '', checkIn: '', checkOut: '', message: '' });
      setSelectedRoomName('');
    }, 2500);
  };

  const getBgImage = () => {
    const bgMap = cmsContent?.hero?.bgImages || {};
    switch(bgChoice) {
      case 'custom':
        return `url(${bgMap.custom || '/798129955.jpg'})`;
      case 'estate':
        return `url(${bgMap.estate || '/513927625.jpg'})`;
      case 'surreal':
      default:
        return `url(${bgMap.surreal || '/798153808.jpg'})`;
    }
  };

  const renderCmsIcon = (iconName, size = 24, strokeWidth = 2.2, color) => {
    const props = { size, strokeWidth, ...(color ? { color } : {}) };
    switch (String(iconName || '').toLowerCase().replace(/[^a-z0-9]/g, '')) {
      case 'wifi': return <Wifi {...props} />;
      case 'car':
      case 'parking': return <Car {...props} />;
      case 'plane':
      case 'shuttle':
      case 'airport': return <Plane {...props} />;
      case 'clock':
      case 'time':
      case 'reception': return <Clock {...props} />;
      case 'utensilscrossed':
      case 'utensils':
      case 'kitchen':
      case 'dining': return <UtensilsCrossed {...props} />;
      case 'flame':
      case 'braai':
      case 'bbq': return <Flame {...props} />;
      case 'sparkles':
      case 'housekeeping':
      case 'clean': return <Sparkles {...props} />;
      case 'lock':
      case 'security': return <Lock {...props} />;
      case 'shieldcheck':
      case 'shield': return <ShieldCheck {...props} />;
      case 'bath':
      case 'bathroom':
      case 'shower': return <Bath {...props} />;
      case 'tv':
      case 'television': return <Tv {...props} />;
      case 'coffee': return <Coffee {...props} />;
      case 'mappin':
      case 'map':
      case 'location': return <MapPin {...props} />;
      case 'beddouble':
      case 'bed': return <BedDouble {...props} />;
      case 'users': return <Users {...props} />;
      case 'star': return <Star {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <main className="rivr-page-container">
      {/* Heavy SEO Header Powered by react-helmet-async */}
      <SEO page={currentPage} cmsContent={cmsContent} />

      {/* ============================================================ */}
      {/* PAGE 1: HOME PAGE VIEW (WITH FULL HERO FRAME & CTAS)         */}
      {/* ============================================================ */}
      {currentPage === 'home' && (
        <>
          {/* 1. HERO FRAME */}
          <div className="hero-card-frame">
            <div 
              className="hero-bg-layer" 
              style={{ 
                backgroundImage: getBgImage(),
                backgroundPosition: 'center center'
              }} 
            />

            {/* Focused Left Dark Gradient Overlay */}
            <div className="hero-overlay-layer" />

            {/* TOP NAVBAR */}
            <header className="rivr-navbar">
              <div className="rivr-logo" onClick={() => navigateTo('home')}>
                <div className="logo-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="logo-text">Edion Royal</span>
                  <span className="logo-subtext">Guesthouse</span>
                </div>
              </div>

              <nav className="nav-menu">
                <button 
                  className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  Home
                </button>
                <button 
                  className={`nav-link ${currentPage === 'rooms' ? 'active' : ''}`}
                  onClick={() => navigateTo('rooms')}
                >
                  Rooms
                </button>
                <button 
                  className={`nav-link ${currentPage === 'amenities' ? 'active' : ''}`}
                  onClick={() => navigateTo('amenities')}
                >
                  Amenities
                </button>
                <button 
                  className={`nav-link ${currentPage === 'location' ? 'active' : ''}`}
                  onClick={() => navigateTo('location')}
                >
                  Location
                </button>
                <button 
                  className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={() => navigateTo('contact')}
                >
                  Contact
                </button>
              </nav>

              <div className="nav-right-actions">
                <a href={`tel:${cmsContent?.contact?.callNumber || '0789724254'}`} className="nav-phone-pill">
                  <Phone size={14} />
                  <span>{cmsContent?.contact?.phone || '078 972 4254'}</span>
                </a>
                <button 
                  className="btn-book-demo"
                  onClick={() => setActiveModal('booking')}
                  aria-label="Book Now"
                >
                  <span>Book now</span>
                  <div className="btn-icon-circle">
                    <ArrowUpRight size={13} strokeWidth={2.6} />
                  </div>
                </button>
              </div>
            </header>

            {/* CENTER HERO CONTENT */}
            <section className="hero-center-content">
              <div 
                className="fluid-staking-badge"
                onClick={() => setActiveModal('booking')}
                role="button"
                tabIndex={0}
              >
                <MapPin className="badge-icon" size={14} />
                <span className="badge-text">{cmsContent?.hero?.eyebrowBadge || 'Milnerton · Cape Town'}</span>
              </div>

              <h1 className="hero-main-title">
                {cmsContent?.hero?.title ? (
                  cmsContent.hero.title.split('\n').map((chunk, i) => (
                    <React.Fragment key={i}>{chunk}{i < cmsContent.hero.title.split('\n').length - 1 ? <br /> : null}</React.Fragment>
                  ))
                ) : (
                  <>A warm, quiet stay<br />minutes from the sea</>
                )}
              </h1>

              <p className="hero-subtitle">
                {cmsContent?.hero?.subheading || 'Comfortable, secure accommodation in Milnerton. Private rooms, Wi-Fi and everything you need for a relaxed stay.'}
              </p>

              <div className="hero-cta-button-group">
                <button 
                  className="btn-cta-primary"
                  onClick={() => setActiveModal('booking')}
                >
                  <span>{cmsContent?.hero?.ctaPrimary || 'Check availability'}</span>
                  <ArrowUpRight size={17} strokeWidth={2.6} />
                </button>
                <button 
                  className="btn-cta-secondary"
                  onClick={() => navigateTo('rooms')}
                >
                  <span>{cmsContent?.hero?.ctaSecondary || 'View our rooms'}</span>
                </button>
              </div>
            </section>

            {/* BOTTOM HERO SECTION */}
            <footer className="hero-bottom-bar">
              <div className="bottom-left-card">
                <span className="stat-number">{cmsContent?.hero?.phone || cmsContent?.contact?.phone || '078 972 4254'}</span>
                <span className="stat-label">{cmsContent?.hero?.directReservationsLabel || 'DIRECT RESERVATIONS & INQUIRIES'}</span>
                <a 
                  href={`tel:${cmsContent?.contact?.callNumber || '0789724254'}`} 
                  className="btn-join-discord"
                >
                  <Phone size={13} strokeWidth={2.5} />
                  <span>Call / WhatsApp</span>
                </a>
              </div>

              <div className="bottom-right-island-wrapper">
                <svg className="corner-curve-svg curve-top" viewBox="0 0 38 38">
                  <path d="M38,38 L38,0 C38,20.987 20.987,38 0,38 L38,38 Z" />
                </svg>
                <svg className="corner-curve-svg curve-left" viewBox="0 0 38 38">
                  <path d="M38,38 L0,38 C20.987,38 38,20.987 38,0 L38,38 Z" />
                </svg>

                <div 
                  className="bottom-right-card"
                  onClick={() => navigateTo('location')}
                >
                  <div className="doc-icon-bubble">
                    <MapPin size={19} strokeWidth={2.4} />
                  </div>
                  <div className="doc-text-group">
                    <span className="doc-title">{cmsContent?.hero?.addressTitle || '7 Arum Street'}</span>
                    <span className="doc-subtitle">
                      {cmsContent?.hero?.addressSubtitle || 'Milnerton, Cape Town'} <ChevronRight size={12} strokeWidth={2.8} />
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </div>

          {/* BACKGROUND VIEW SWITCHER */}
          <div className="bg-switcher-bar">
            <span className="bg-switcher-label">Switch View:</span>
            <button 
              className={`bg-switcher-btn ${bgChoice === 'custom' ? 'active' : ''}`}
              onClick={() => setBgChoice('custom')}
              title="Custom Guesthouse View"
            >
              View 1
            </button>
            <button 
              className={`bg-switcher-btn ${bgChoice === 'estate' ? 'active' : ''}`}
              onClick={() => setBgChoice('estate')}
              title="Cape Dutch Estate"
            >
              View 2
            </button>
            <button 
              className={`bg-switcher-btn ${bgChoice === 'surreal' ? 'active' : ''}`}
              onClick={() => setBgChoice('surreal')}
              title="3D Ambient View"
            >
              View 3
            </button>
          </div>

          {/* GUEST RATINGS STATS BANNER */}
          <section className="stats-banner-card">
            <div className="stat-item">
              <span className="stat-value">{cmsContent?.stats?.locationScore || '8.8'}</span>
              <span className="stat-desc">{cmsContent?.stats?.locationLabel || 'Location'}</span>
            </div>

            <div className="stat-item">
              <span className="stat-value">{cmsContent?.stats?.wifiScore || '8.8'}</span>
              <span className="stat-desc">{cmsContent?.stats?.wifiLabel || 'Free WiFi'}</span>
            </div>

            <div className="stat-item">
              <span className="stat-value">{cmsContent?.stats?.cleanlinessScore || '7.7'}</span>
              <span className="stat-desc">{cmsContent?.stats?.cleanlinessLabel || 'Cleanliness'}</span>
            </div>

            <div className="stat-item">
              <span className="stat-value">{cmsContent?.stats?.valueScore || '7.6'}</span>
              <span className="stat-desc">{cmsContent?.stats?.valueLabel || 'Value for Money'}</span>
            </div>
          </section>

          {/* WELCOME & ABOUT CARD */}
          <section className="welcome-about-card">
            <div>
              <span className="welcome-badge">{cmsContent?.about?.badge || 'Welcome'}</span>
              <h2 className="welcome-title">
                {cmsContent?.about?.title || 'Comfortable, secure accommodation in the heart of Milnerton'}
              </h2>
            </div>
            <div>
              <div className="welcome-body-text">
                <p>
                  {cmsContent?.about?.description1 || (
                    <>
                      <strong>Edion Royal Guesthouse</strong> is a family-run home away from home on Arum Street, Milnerton. Every room has been recently renovated and comes with its own private bathroom, fridge, microwave, work desk and flat-screen TV — whether you are here for a week of meetings or a Cape Town summer holiday.
                    </>
                  )}
                </p>
                <p>
                  {cmsContent?.about?.description2 || 'Guests have full use of the shared kitchen, lounge and braai area, while daily housekeeping and a 24-hour reception keep everything simple from arrival to check-out.'}
                </p>
              </div>
              <div className="welcome-amenities-tags">
                <span className="amenity-tag"><Wifi size={14} /> Free High-Speed WiFi</span>
                <span className="amenity-tag"><Car size={14} /> Free Secure Parking</span>
                <span className="amenity-tag"><Clock size={14} /> 24-Hour Reception</span>
                <span className="amenity-tag"><Flame size={14} /> Braai &amp; BBQ Area</span>
                <span className="amenity-tag"><UtensilsCrossed size={14} /> Shared Kitchen</span>
                <span className="amenity-tag"><ShieldCheck size={14} /> Daily Housekeeping</span>
              </div>
            </div>
          </section>

          {/* ROOMS PREVIEW SECTION */}
          <section className="rooms-section" id="rooms">
            <div className="section-header-row">
              <div>
                <div className="section-tag">Our rooms</div>
                <h2 className="section-title">
                  Renovated en-suite rooms for every kind of stay
                </h2>
              </div>
              <button 
                className="btn-section-action"
                onClick={() => navigateTo('rooms')}
              >
                <span>Explore All {roomsData.length} Rooms</span>
                <ArrowUpRight size={15} strokeWidth={2.6} />
              </button>
            </div>

            <div className="rooms-grid">
              <div className="room-card" onClick={() => navigateTo('rooms')} style={{ cursor: 'pointer' }}>
                <div className="card-icon-box">
                  <BedDouble size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="card-title">{roomsData.length} Renovated Room Options</h3>
                  <p className="card-text">
                    {cmsContent?.roomsSection?.subtitle || 'From calm renovated double rooms and kitchenette suites to spacious triple and family rooms — all with private bathrooms, WiFi and TV.'}
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '12px', color: '#2563eb', fontWeight: 700, fontSize: '14px' }}>
                    View all {roomsData.length} rooms <ChevronRight size={14} />
                  </span>
                </div>
              </div>

              <div className="room-card" onClick={() => navigateTo('amenities')} style={{ cursor: 'pointer' }}>
                <div className="card-icon-box">
                  <Coffee size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="card-title">All Guesthouse Amenities</h3>
                  <p className="card-text">
                    Enjoy complete access to the shared kitchen, comfortable lounge, outdoor braai area, daily housekeeping, 24-hour reception, and gated on-site parking.
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '12px', color: '#2563eb', fontWeight: 700, fontSize: '14px' }}>
                    View all {cmsContent?.amenitiesSection?.items?.length || 8} amenities <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* LOCATION & PROXIMITY */}
          <section className="location-section" id="location">
            <div>
              <div className="section-tag">{cmsContent?.locationSection?.badge || 'Location'}</div>
              <h2 className="section-title">
                {cmsContent?.locationSection?.title || 'Table Mountain views, minutes from your door'}
              </h2>
              <p style={{ fontSize: '16px', color: '#556c86', marginTop: '12px', maxWidth: '780px', lineHeight: '1.6' }}>
                {cmsContent?.locationSection?.subtitle || 'Find us right off the R27, just minutes from the beachfront and a short drive from Cape Town city centre.'}
              </p>
            </div>

            <div className="distances-grid">
              {(cmsContent?.locationSection?.distances || [
                { name: 'Milnerton Beach', distance: '1.8 km' },
                { name: 'Century City / Canal Walk', distance: '7 km' },
                { name: 'CTICC Convention Centre', distance: '10 km' },
                { name: 'Robben Island Ferry', distance: '11 km' },
                { name: 'V&A Waterfront', distance: '13 km' },
                { name: 'Cape Town International Airport', distance: '18 km' }
              ]).map((dist, idx) => (
                <div className="distance-item-box" key={idx}>
                  <span className="distance-name">{dist.name}</span>
                  <span className="distance-km">{dist.distance}</span>
                </div>
              ))}
            </div>
          </section>

          {/* GUEST REVIEWS */}
          <section className="reviews-section">
            <div className="reviews-header-row">
              <div>
                <div className="section-tag">Guest reviews</div>
                <h2 className="section-title">What our guests say</h2>
              </div>

              <div className="reviews-nav-controls">
                <button 
                  className="btn-review-nav" 
                  onClick={() => scrollReviews('left')}
                  aria-label="Previous Reviews"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="btn-review-nav" 
                  onClick={() => scrollReviews('right')}
                  aria-label="Next Reviews"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="reviews-scroll-container" ref={reviewsScrollRef}>
              {guestReviews.map((rev) => (
                <div className="review-card" key={rev.id}>
                  <div>
                    <div className="review-stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                      ))}
                      <span className="review-score-badge">5.0</span>
                    </div>

                    <p className="review-quote">
                      “{rev.quote}”
                    </p>
                  </div>

                  <div className="review-author">
                    <div className="author-avatar">
                      {rev.initials}
                    </div>
                    <div className="author-info">
                      <span className="author-name">{rev.name}</span>
                      <span className="author-loc">{rev.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ============================================================ */}
      {/* PAGE 2: DEDICATED ROOMS PAGE (USING CARD-21 DESTINATIONCARD)  */}
      {/* ============================================================ */}
      {currentPage === 'rooms' && (
        <>
          {/* STANDALONE NAVBAR */}
          <div className="standalone-navbar-wrapper">
            <div className="rivr-logo" onClick={() => navigateTo('home')}>
              <div className="logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <span className="logo-text">Edion Royal</span>
                <span className="logo-subtext">Guesthouse</span>
              </div>
            </div>

            <nav className="nav-menu">
              <button 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                Home
              </button>
              <button 
                className={`nav-link ${currentPage === 'rooms' ? 'active' : ''}`}
                onClick={() => navigateTo('rooms')}
              >
                Rooms
              </button>
              <button 
                className={`nav-link ${currentPage === 'amenities' ? 'active' : ''}`}
                onClick={() => navigateTo('amenities')}
              >
                Amenities
              </button>
              <button 
                className={`nav-link ${currentPage === 'location' ? 'active' : ''}`}
                onClick={() => navigateTo('location')}
              >
                Location
              </button>
              <button 
                className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => navigateTo('contact')}
              >
                Contact
              </button>
            </nav>

            <div className="nav-right-actions">
              <a href={`tel:${cmsContent?.contact?.callNumber || '0789724254'}`} className="nav-phone-pill">
                <Phone size={14} />
                <span>{cmsContent?.contact?.phone || '078 972 4254'}</span>
              </a>
              <button 
                className="btn-book-demo"
                onClick={() => setActiveModal('booking')}
                aria-label="Book Now"
              >
                <span>Book now</span>
                <div className="btn-icon-circle">
                  <ArrowUpRight size={13} strokeWidth={2.6} />
                </div>
              </button>
            </div>
          </div>

          {/* ROOMS PAGE HEADER */}
          <section className="amenities-page-header-card">
            <span className="welcome-badge">{cmsContent?.roomsSection?.tag || cmsContent?.hero?.eyebrowBadge || 'Milnerton · Cape Town'}</span>
            <h1 style={{ fontSize: 'clamp(36px, 4.2vw, 54px)', fontWeight: 850, color: '#102138', letterSpacing: '-0.035em', lineHeight: 1.15, marginBottom: '14px' }}>
              {cmsContent?.roomsSection?.title || 'Rooms'}
            </h1>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, color: '#4a607a', maxWidth: '780px', fontWeight: 500 }}>
              {cmsContent?.roomsSection?.subtitle || 'Recently renovated, comfortable rooms in Milnerton for solo travellers, couples, colleagues, and families. Every room comes with its own private bathroom, flat-screen TV, and high-speed WiFi.'}
            </p>

            <div className="rooms-feature-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px' }}>
              <span className="pill-item active">All {roomsData.length} Rooms</span>
              <span className="pill-item">Double Rooms</span>
              <span className="pill-item">Twin & Kitchenette</span>
              <span className="pill-item">Triple Rooms</span>
              <span className="pill-item">Family Rooms</span>
              <span className="pill-item">Private En-Suite</span>
            </div>
          </section>

          {/* DESTINATIONCARD (CARD-21) GRID FOR ALL 7 ROOMS */}
          <section className="rooms-grid-container" style={{ width: '100%', maxWidth: '1540px', marginTop: '24px' }}>
            <div className="destination-cards-grid">
              {roomsData.map((room) => (
                <DestinationCard
                  key={room.id}
                  location={room.title}
                  badge={room.badge}
                  stats={room.stats}
                  features={room.features}
                  buttonText="Enquire about this room"
                  imageUrl={room.imageUrl}
                  onExplore={() => openBookingForRoom(room.title)}
                />
              ))}
            </div>
          </section>

          {/* ROOM INCLUSIONS & GUARANTEES */}
          <section className="welcome-about-card" style={{ marginTop: '40px' }}>
            <div>
              <span className="welcome-badge">{cmsContent?.inclusions?.badge || 'Standard Inclusions'}</span>
              <h2 className="welcome-title">
                {cmsContent?.inclusions?.title || 'Included in every room at Edion Royal'}
              </h2>
            </div>
            <div>
              <div className="welcome-body-text">
                <p>
                  {cmsContent?.inclusions?.description || 'We believe comfort should come standard. No hidden extra charges for essentials — every guest enjoys private, fully equipped accommodation backed by 24-hour reception and gated parking.'}
                </p>
              </div>

              <div className="amenities-spotlight-grid">
                {(cmsContent?.inclusions?.items || []).map((inc, idx) => (
                  <div key={idx} className="amenity-spotlight-card">
                    {renderCmsIcon(inc.icon, 28, 2.2, '#2563eb')}
                    <div>
                      <h4 className="spotlight-title">{inc.title}</h4>
                      <p className="spotlight-text">{inc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ============================================================ */}
      {/* PAGE 3: DEDICATED AMENITIES PAGE (CLEAN, DIRECT DIRECTORY)   */}
      {/* ============================================================ */}
      {currentPage === 'amenities' && (
        <>
          {/* STANDALONE NAVBAR */}
          <div className="standalone-navbar-wrapper">
            <div className="rivr-logo" onClick={() => navigateTo('home')}>
              <div className="logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <span className="logo-text">Edion Royal</span>
                <span className="logo-subtext">Guesthouse</span>
              </div>
            </div>

            <nav className="nav-menu">
              <button 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                Home
              </button>
              <button 
                className={`nav-link ${currentPage === 'rooms' ? 'active' : ''}`}
                onClick={() => navigateTo('rooms')}
              >
                Rooms
              </button>
              <button 
                className={`nav-link ${currentPage === 'amenities' ? 'active' : ''}`}
                onClick={() => navigateTo('amenities')}
              >
                Amenities
              </button>
              <button 
                className={`nav-link ${currentPage === 'location' ? 'active' : ''}`}
                onClick={() => navigateTo('location')}
              >
                Location
              </button>
              <button 
                className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => navigateTo('contact')}
              >
                Contact
              </button>
            </nav>

            <div className="nav-right-actions">
              <a href={`tel:${cmsContent?.contact?.callNumber || '0789724254'}`} className="nav-phone-pill">
                <Phone size={14} />
                <span>{cmsContent?.contact?.phone || '078 972 4254'}</span>
              </a>
              <button 
                className="btn-book-demo"
                onClick={() => setActiveModal('booking')}
                aria-label="Book Now"
              >
                <span>Book now</span>
                <div className="btn-icon-circle">
                  <ArrowUpRight size={13} strokeWidth={2.6} />
                </div>
              </button>
            </div>
          </div>

          {/* AMENITIES CLEAN HEADER BANNER */}
          <section className="amenities-page-header-card">
            <span className="welcome-badge">{cmsContent?.amenitiesSection?.badge || 'Amenities Directory'}</span>
            <h1 style={{ fontSize: 'clamp(34px, 4vw, 50px)', fontWeight: 850, color: '#102138', letterSpacing: '-0.035em', lineHeight: 1.15, marginBottom: '14px' }}>
              {cmsContent?.amenitiesSection?.title || 'All the comforts you need during your stay'}
            </h1>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, color: '#4a607a', maxWidth: '780px', fontWeight: 500 }}>
              {cmsContent?.amenitiesSection?.subtitle || 'From fast WiFi to a shared kitchen and secure parking, our guesthouse is designed to keep your Cape Town holiday or business trip comfortable, relaxed, and easy.'}
            </p>
          </section>

          {/* AMENITY FEATURE CARDS */}
          <section className="amenities-section" style={{ marginTop: '24px' }}>
            <div className="amenities-grid-8">
              {(cmsContent?.amenitiesSection?.items || []).map((amenity, idx) => (
                <div key={amenity.id || idx} className="amenity-feature-card">
                  <div className="amenity-icon-box">
                    {renderCmsIcon(amenity.icon, 24, 2.2)}
                  </div>
                  <div>
                    <h3 className="amenity-title">{amenity.name}</h3>
                    <p className="amenity-desc">{amenity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AMENITY EXPERIENCE SPOTLIGHT CARDS */}
          <section className="welcome-about-card" style={{ marginTop: '40px' }}>
            <div>
              <span className="welcome-badge">{cmsContent?.inclusions?.badge || 'Self-Catering & Comfort'}</span>
              <h2 className="welcome-title">
                {cmsContent?.inclusions?.title || 'Everything designed for a calm Cape Town stay'}
              </h2>
            </div>
            <div>
              <div className="welcome-body-text">
                <p>
                  {cmsContent?.inclusions?.description || 'Whether you are staying for a week of business meetings, an extended holiday, or a weekend getaway, enjoy all the comforts of home with full guesthouse convenience.'}
                </p>
              </div>

              <div className="amenities-spotlight-grid">
                {(cmsContent?.inclusions?.items || []).map((item, idx) => (
                  <div key={idx} className="amenity-spotlight-card">
                    {renderCmsIcon(item.icon, 28, 2.2, '#2563eb')}
                    <div>
                      <h4 className="spotlight-title">{item.title}</h4>
                      <p className="spotlight-text">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ============================================================ */}
      {/* PAGE 4: DEDICATED LOCATION PAGE (FEATURING LOCATION HERO)     */}
      {/* ============================================================ */}
      {currentPage === 'location' && (
        <>
          {/* LOCATION HERO / CTA FRAME (Using tobias-reich--7ZwuyDx2rI-unsplash.jpg) */}
          <div className="hero-card-frame">
            <div 
              className="hero-bg-layer" 
              style={{ 
                backgroundImage: 'url(/location-bg.jpg)',
                backgroundPosition: 'center center'
              }} 
            />

            {/* Focused Dark Gradient Overlay */}
            <div className="hero-overlay-layer" />

            {/* TOP NAVBAR */}
            <header className="rivr-navbar">
              <div className="rivr-logo" onClick={() => navigateTo('home')}>
                <div className="logo-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="logo-text">Edion Royal</span>
                  <span className="logo-subtext">Guesthouse</span>
                </div>
              </div>

              <nav className="nav-menu">
                <button 
                  className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  Home
                </button>
                <button 
                  className={`nav-link ${currentPage === 'rooms' ? 'active' : ''}`}
                  onClick={() => navigateTo('rooms')}
                >
                  Rooms
                </button>
                <button 
                  className={`nav-link ${currentPage === 'amenities' ? 'active' : ''}`}
                  onClick={() => navigateTo('amenities')}
                >
                  Amenities
                </button>
                <button 
                  className={`nav-link ${currentPage === 'location' ? 'active' : ''}`}
                  onClick={() => navigateTo('location')}
                >
                  Location
                </button>
                <button 
                  className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={() => navigateTo('contact')}
                >
                  Contact
                </button>
              </nav>

              <div className="nav-right-actions">
                <a href={`tel:${cmsContent?.contact?.callNumber || '0789724254'}`} className="nav-phone-pill">
                  <Phone size={14} />
                  <span>{cmsContent?.contact?.phone || '078 972 4254'}</span>
                </a>
                <button 
                  className="btn-book-demo"
                  onClick={() => setActiveModal('booking')}
                  aria-label="Book Now"
                >
                  <span>Book now</span>
                  <div className="btn-icon-circle">
                    <ArrowUpRight size={13} strokeWidth={2.6} />
                  </div>
                </button>
              </div>
            </header>

            {/* CENTER LOCATION HERO CONTENT */}
            <section className="hero-center-content">
              <div 
                className="fluid-staking-badge"
                role="button"
                tabIndex={0}
              >
                <MapPin className="badge-icon" size={14} />
                <span className="badge-text">{cmsContent?.locationSection?.badge || cmsContent?.hero?.eyebrowBadge || 'Milnerton · Cape Town'}</span>
              </div>

              <h1 className="hero-main-title">
                {cmsContent?.locationSection?.title || 'Table Mountain views, minutes from the sea'}
              </h1>

              <p className="hero-subtitle">
                {cmsContent?.locationSection?.subtitle || 'Find us right off the R27, just minutes from the beachfront and a short drive from Cape Town city centre.'}
              </p>

              <div className="hero-cta-button-group">
                <a 
                  href="#map-section" 
                  className="btn-cta-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>View map & directions</span>
                  <Navigation size={17} strokeWidth={2.4} />
                </a>
                <button 
                  className="btn-cta-secondary"
                  onClick={() => setActiveModal('booking')}
                >
                  <span>Check availability</span>
                </button>
              </div>
            </section>

            {/* BOTTOM LOCATION HERO BAR */}
            <footer className="hero-bottom-bar">
              <div className="bottom-left-card">
                <span className="stat-number">{cmsContent?.hero?.addressTitle || '7 Arum Street'}</span>
                <span className="stat-label">{cmsContent?.hero?.addressSubtitle || 'MILNERTON, CAPE TOWN, 7441'}</span>
                <a 
                  href={cmsContent?.locationSection?.googleMapsLink || "https://maps.google.com/?q=7+Arum+Street,+Milnerton,+Cape+Town,+7441"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-join-discord"
                >
                  <Navigation size={13} strokeWidth={2.5} />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              <div className="bottom-right-island-wrapper">
                <svg className="corner-curve-svg curve-top" viewBox="0 0 38 38">
                  <path d="M38,38 L38,0 C38,20.987 20.987,38 0,38 L38,38 Z" />
                </svg>
                <svg className="corner-curve-svg curve-left" viewBox="0 0 38 38">
                  <path d="M38,38 L0,38 C20.987,38 38,20.987 38,0 L38,38 Z" />
                </svg>

                <div 
                  className="bottom-right-card"
                  onClick={() => setActiveModal('booking')}
                >
                  <div className="doc-icon-bubble">
                    <Phone size={19} strokeWidth={2.4} />
                  </div>
                  <div className="doc-text-group">
                    <span className="doc-title">{cmsContent?.hero?.phone || cmsContent?.contact?.phone || '078 972 4254'}</span>
                    <span className="doc-subtitle">
                      Direct Reservations <ChevronRight size={12} strokeWidth={2.8} />
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </div>

          {/* OUR ADDRESS OVERVIEW CARD */}
          <section className="welcome-about-card" style={{ marginTop: '24px' }}>
            <div>
              <span className="welcome-badge">{cmsContent?.locationSection?.badge || 'Our Address'}</span>
              <h2 className="welcome-title">
                {cmsContent?.locationSection?.address || cmsContent?.contact?.address || '7 Arum Street, Milnerton, Cape Town, 7441'}
              </h2>
            </div>
            <div>
              <div className="welcome-body-text">
                <p>
                  {cmsContent?.locationSection?.addressDetails1 || 'Arum Street is a quiet residential road close to Milnerton Beach. The guesthouse is easy to reach from the R27 and has secure on-site parking.'}
                </p>
                <p>
                  {cmsContent?.locationSection?.addressDetails2 || 'Cape Town city centre is about 15 minutes away by car. The airport is roughly 20 minutes from the guesthouse.'}
                </p>
              </div>

              <div className="welcome-amenities-tags" style={{ marginTop: '20px' }}>
                <span className="amenity-tag"><MapPin size={14} /> {cmsContent?.locationSection?.address || '7 Arum Street, Milnerton'}</span>
                <span className="amenity-tag"><Car size={14} /> Easy Access from R27</span>
                <span className="amenity-tag"><ShieldCheck size={14} /> Gated On-Site Parking</span>
                <span className="amenity-tag"><Clock size={14} /> 15 Mins to Cape Town CBD</span>
                <span className="amenity-tag"><Plane size={14} /> 20 Mins to Airport</span>
              </div>
            </div>
          </section>

          {/* BIG INTERACTIVE MAP SECTION */}
          <section className="location-section" id="map-section" style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="section-tag">Interactive Map</div>
                <h2 className="section-title">
                  Find Edion Royal Guesthouse on the Map
                </h2>
              </div>
              <a 
                href={cmsContent?.locationSection?.googleMapsLink || "https://maps.google.com/?q=7+Arum+Street,+Milnerton,+Cape+Town,+7441"} 
                target="_blank" 
                rel="noreferrer"
                className="btn-section-action"
              >
                <span>Get GPS Directions</span>
                <ExternalLink size={15} strokeWidth={2.5} />
              </a>
            </div>

            {/* BIG MAP EMBED FRAME */}
            <div 
              style={{
                width: '100%',
                height: '460px',
                borderRadius: '32px',
                overflow: 'hidden',
                marginTop: '24px',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 20px 50px rgba(10, 25, 45, 0.08)',
                position: 'relative'
              }}
            >
              <iframe
                title="Edion Royal Guesthouse Location Map"
                src={cmsContent?.locationSection?.mapEmbedUrl || "https://maps.google.com/maps?q=7%20Arum%20Street,%20Milnerton,%20Cape%20Town,%207441&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* PROXIMITY & TRAVEL DISTANCES */}
            <div style={{ marginTop: '36px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#102138', marginBottom: '16px' }}>
                Key Destinations & Drive Times
              </h3>
              <div className="distances-grid">
                {(cmsContent?.locationSection?.distances || []).map((item, idx) => (
                  <div key={idx} className="distance-item-box">
                    <span className="distance-name">{item.name}</span>
                    <span className="distance-km">{item.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ============================================================ */}
      {/* PAGE 5: DEDICATED CONTACT PAGE                               */}
      {/* ============================================================ */}
      {currentPage === 'contact' && (
        <>
          {/* STANDALONE NAVBAR */}
          <div className="standalone-navbar-wrapper">
            <div className="rivr-logo" onClick={() => navigateTo('home')}>
              <div className="logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <span className="logo-text">Edion Royal</span>
                <span className="logo-subtext">Guesthouse</span>
              </div>
            </div>

            <nav className="nav-menu">
              <button 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                Home
              </button>
              <button 
                className={`nav-link ${currentPage === 'rooms' ? 'active' : ''}`}
                onClick={() => navigateTo('rooms')}
              >
                Rooms
              </button>
              <button 
                className={`nav-link ${currentPage === 'amenities' ? 'active' : ''}`}
                onClick={() => navigateTo('amenities')}
              >
                Amenities
              </button>
              <button 
                className={`nav-link ${currentPage === 'location' ? 'active' : ''}`}
                onClick={() => navigateTo('location')}
              >
                Location
              </button>
              <button 
                className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => navigateTo('contact')}
              >
                Contact
              </button>
            </nav>

            <div className="nav-right-actions">
              <a href={`tel:${cmsContent?.contact?.callNumber || '0789724254'}`} className="nav-phone-pill">
                <Phone size={14} />
                <span>{cmsContent?.contact?.phone || '078 972 4254'}</span>
              </a>
              <button 
                className="btn-book-demo"
                onClick={() => setActiveModal('booking')}
                aria-label="Book Now"
              >
                <span>Book now</span>
                <div className="btn-icon-circle">
                  <ArrowUpRight size={13} strokeWidth={2.6} />
                </div>
              </button>
            </div>
          </div>

          {/* CONTACT HEADER CARD */}
          <section className="amenities-page-header-card">
            <span className="welcome-badge">Get in Touch</span>
            <h1 style={{ fontSize: 'clamp(34px, 4vw, 50px)', fontWeight: 850, color: '#102138', letterSpacing: '-0.035em', lineHeight: 1.15, marginBottom: '14px' }}>
              Contact & Direct Reservations
            </h1>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, color: '#4a607a', maxWidth: '780px', fontWeight: 500 }}>
              Send us your dates and we'll confirm availability and the best direct rate. Group, corporate and long-stay enquiries are always welcome.
            </p>
          </section>

          {/* 3 DIRECT CONTACT CHANNELS */}
          <section className="contact-channels-grid">
            {/* 1. Phone & WhatsApp */}
            <div className="contact-channel-card">
              <div>
                <div className="channel-icon-bubble">
                  <Phone size={24} strokeWidth={2.2} />
                </div>
                <div className="channel-title">Call or WhatsApp</div>
                <div className="channel-value">{cmsContent?.contact?.phone || '+27 78 972 4254'}</div>
                <p className="channel-desc">
                  Instant answers for check-in times, room availability, and late arrivals.
                </p>
              </div>
              <div className="channel-btn-row">
                <a href={`tel:${cmsContent?.contact?.callNumber || '0789724254'}`} className="btn-channel-action btn-channel-primary">
                  <Phone size={14} /> Call Direct
                </a>
                <a 
                  href={`https://wa.me/${cmsContent?.contact?.whatsappNumber || '27789724254'}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-channel-action btn-channel-secondary"
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
              </div>
            </div>

            {/* 2. Email Reservations */}
            <div className="contact-channel-card">
              <div>
                <div className="channel-icon-bubble">
                  <Mail size={24} strokeWidth={2.2} />
                </div>
                <div className="channel-title">Direct Email</div>
                <div className="channel-value" style={{ fontSize: '18px' }}>{cmsContent?.contact?.email || 'stay@edionroyal.co.za'}</div>
                <p className="channel-desc">
                  Send corporate bookings, group stay requests, or tax invoice enquiries.
                </p>
              </div>
              <div className="channel-btn-row">
                <a href={`mailto:${cmsContent?.contact?.email || 'stay@edionroyal.co.za'}`} className="btn-channel-action btn-channel-primary">
                  <Mail size={14} /> Send Email
                </a>
              </div>
            </div>

            {/* 3. Physical Address */}
            <div className="contact-channel-card">
              <div>
                <div className="channel-icon-bubble">
                  <MapPin size={24} strokeWidth={2.2} />
                </div>
                <div className="channel-title">Our Address</div>
                <div className="channel-value" style={{ fontSize: '18px' }}>{cmsContent?.contact?.address || '7 Arum Street, Milnerton'}</div>
                <p className="channel-desc">
                  Cape Town, 7441 · Off the R27 with secure on-site gated parking.
                </p>
              </div>
              <div className="channel-btn-row">
                <a 
                  href={cmsContent?.locationSection?.googleMapsLink || "https://maps.google.com/?q=7+Arum+Street,+Milnerton,+Cape+Town,+7441"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-channel-action btn-channel-secondary"
                >
                  <Navigation size={14} /> View Map
                </a>
              </div>
            </div>
          </section>

          {/* PRACTICAL STAY INFORMATION */}
          <section className="welcome-about-card" style={{ marginTop: '32px' }}>
            <div>
              <span className="welcome-badge">Guest Information</span>
              <h2 className="welcome-title">
                Helpful details for your stay
              </h2>
            </div>
            <div>
              <div className="welcome-amenities-tags" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#102138', fontSize: '15px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#2563eb" /> Check-in & Check-out
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#64748b' }}>
                    Check-in {cmsContent?.contact?.checkInTime || 'from 14:00 (24h assisted)'}. Check-out {cmsContent?.contact?.checkOutTime || 'by 10:00'}.
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#102138', fontSize: '15px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Car size={16} color="#2563eb" /> Secure Parking
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#64748b' }}>Free off-street parking behind security-controlled gate.</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#102138', fontSize: '15px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wifi size={16} color="#2563eb" /> High-Speed Internet
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#64748b' }}>Uncapped high-speed Wi-Fi with in-room work desks.</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ============================================================ */}
      {/* DIRECT BOOKING & CONTACT FORM SECTION (SHARED ON ALL PAGES)  */}
      {/* ============================================================ */}
      <section className="booking-section" id="contact">
        <div>
          <h2 className="booking-left-title">Book your stay</h2>
          <p className="booking-left-desc">
            Send us your dates and room preference and we'll confirm availability and the best direct rate. Group, corporate and long-stay enquiries are always welcome.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <MapPin size={20} color="#60a5fa" />
              <span>{cmsContent?.contact?.address || '7 Arum Street, Milnerton, Cape Town, 7441'}</span>
            </div>
            <a href={`tel:${cmsContent?.contact?.callNumber || '0789724254'}`} className="contact-info-item">
              <Phone size={20} color="#60a5fa" />
              <span>{cmsContent?.contact?.phone || '+27 78 972 4254'}</span>
            </a>
            <a href={`mailto:${cmsContent?.contact?.email || 'stay@edionroyal.co.za'}`} className="contact-info-item">
              <Mail size={20} color="#60a5fa" />
              <span>{cmsContent?.contact?.email || 'stay@edionroyal.co.za'}</span>
            </a>
          </div>
        </div>

        <div>
          {bookingSubmitted ? (
            <div style={{ textAlign: 'center', padding: '48px 0', background: 'rgba(255,255,255,0.06)', borderRadius: '24px' }}>
              <CheckCircle2 size={54} color="#34d399" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>Enquiry Received!</h3>
              <p style={{ color: '#93c5fd', fontSize: '15px', marginTop: '8px' }}>
                Thank you{bookingData.name ? `, ${bookingData.name}` : ''}. We will check availability for <strong>{bookingData.room || 'your stay'}</strong> and email you our best rate immediately.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="booking-form-grid">
              <input 
                type="text" 
                required 
                className="booking-input-dark" 
                placeholder="Full name" 
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
              />
              <input 
                type="email" 
                required 
                className="booking-input-dark" 
                placeholder="Email address" 
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
              />
              <select
                className="booking-input-dark"
                value={bookingData.room}
                onChange={(e) => setBookingData({ ...bookingData, room: e.target.value })}
                style={{ color: bookingData.room ? '#ffffff' : '#94a3b8' }}
              >
                <option value="" style={{ background: '#102138', color: '#94a3b8' }}>Select Room Type (Optional)</option>
                {roomsData.map((room) => (
                  <option key={room.id || room.title} value={room.title} style={{ background: '#102138', color: '#ffffff' }}>
                    {room.title} {room.badge ? `(${room.badge})` : ''}
                  </option>
                ))}
              </select>
              <input 
                type="tel"
                className="booking-input-dark" 
                placeholder="Phone / WhatsApp (optional)"
                value={bookingData.phone || ''}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
              />
              <input 
                type="text" 
                required 
                className="booking-input-dark" 
                placeholder="Check-in Date" 
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
              />
              <input 
                type="text" 
                required 
                className="booking-input-dark" 
                placeholder="Check-out Date" 
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
              />
              <textarea 
                className="booking-textarea-dark" 
                placeholder="Message or special requests (optional)"
                value={bookingData.message}
                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
              ></textarea>
              <button type="submit" className="btn-send-enquiry">
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="guesthouse-footer">
        <div>
          {cmsContent?.footer?.copyright || '© 2026 Edion Royal Guesthouse, Milnerton, Cape Town.'}
        </div>
        <div className="footer-features-badges">
          {(cmsContent?.footer?.badges || ['Free WiFi', 'Free parking', '24-hour reception']).map((badge, idx, arr) => (
            <React.Fragment key={idx}>
              <span>{badge}</span>
              {idx < arr.length - 1 && <span>·</span>}
            </React.Fragment>
          ))}
        </div>
      </footer>

      {/* QUICK BOOKING MODAL */}
      {activeModal === 'booking' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
              <X size={18} />
            </button>
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedRoomName ? `Enquire: ${selectedRoomName}` : 'Check Availability & Book'}
              </h3>
              <p className="modal-subtitle">Direct rates with no booking fees — Edion Royal Guesthouse.</p>
            </div>

            {bookingSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Enquiry Received!</h4>
                <p style={{ color: '#64748b', fontSize: '14.5px', marginTop: '6px' }}>
                  We will contact you shortly to confirm your booking for {bookingData.room || 'your stay'}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="Your name" 
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    placeholder="yourname@email.com" 
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp (Optional)</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="+27 ..." 
                    value={bookingData.phone || ''}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Selected Room</label>
                  <select
                    className="form-input"
                    value={bookingData.room}
                    onChange={(e) => setBookingData({ ...bookingData, room: e.target.value })}
                  >
                    <option value="">Any Room / Best Available</option>
                    {roomsData.map((room) => (
                      <option key={room.id || room.title} value={room.title}>
                        {room.title} {room.badge ? `(${room.badge})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Check-in Date</label>
                    <input 
                      type="date" 
                      required 
                      className="form-input" 
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out Date</label>
                    <input 
                      type="date" 
                      required 
                      className="form-input" 
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-submit-modal">
                  Submit Reservation Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
