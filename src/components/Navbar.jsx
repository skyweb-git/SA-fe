import React from 'react';
import { Phone, ArrowUpRight, Menu as MenuIcon } from 'lucide-react';

export default function Navbar({ 
  currentPage, 
  navigateTo, 
  onOpenBooking, 
  cmsContent, 
  onToggleMobileDrawer,
  isStandalone = false 
}) {
  const phone = cmsContent?.contact?.phone || '078 972 4254';
  const callNumber = cmsContent?.contact?.callNumber || '0789724254';

  const content = (
    <>
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

      {/* Desktop Menu */}
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

      {/* Right actions: Desktop and Mobile Hamburger */}
      <div className="nav-right-actions">
        <a href={`tel:${callNumber}`} className="nav-phone-pill">
          <Phone size={14} />
          <span>{phone}</span>
        </a>
        <button 
          className="btn-book-demo"
          onClick={onOpenBooking}
          aria-label="Book Now"
        >
          <span>Book now</span>
          <div className="btn-icon-circle">
            <ArrowUpRight size={13} strokeWidth={2.6} />
          </div>
        </button>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-hamburger-btn"
          onClick={onToggleMobileDrawer}
          aria-label="Open mobile navigation menu"
        >
          <MenuIcon size={20} />
        </button>
      </div>
    </>
  );

  if (isStandalone) {
    return <div className="standalone-navbar-wrapper">{content}</div>;
  }

  return <header className="rivr-navbar">{content}</header>;
}
