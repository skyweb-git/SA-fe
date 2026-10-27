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
        <span className="logo-text">Edion Royal</span>
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
