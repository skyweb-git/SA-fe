import React from 'react';
import { 
  X, 
  Home, 
  BedDouble, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ArrowUpRight,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

export default function MobileDrawer({ 
  isOpen, 
  onClose, 
  currentPage, 
  navigateTo, 
  onOpenBooking,
  cmsContent 
}) {
  if (!isOpen) return null;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rooms', label: 'Rooms & Suites', icon: BedDouble },
    { id: 'amenities', label: 'Amenities', icon: Sparkles },
    { id: 'location', label: 'Location & Map', icon: MapPin },
    { id: 'contact', label: 'Contact & Inquiries', icon: MessageSquare },
  ];

  const handleNav = (id) => {
    navigateTo(id);
    onClose();
  };

  const phone = cmsContent?.contact?.phone || '078 972 4254';
  const callNumber = cmsContent?.contact?.callNumber || '0789724254';

  return (
    <div className="mobile-drawer-overlay" onClick={onClose}>
      <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-drawer-header">
          <div className="rivr-logo mobile-drawer-logo" onClick={() => { navigateTo('home'); onClose(); }}>
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div>
              <span className="logo-text">Edion Royal</span>
              <span className="logo-subtext">Guesthouse</span>
            </div>
          </div>
          <button className="mobile-drawer-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="mobile-drawer-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                className={`mobile-drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.id)}
              >
                <div className="mobile-drawer-item-left">
                  <div className={`mobile-nav-icon-box ${isActive ? 'active' : ''}`}>
                    <Icon size={18} />
                  </div>
                  <span className="mobile-nav-item-label">{item.label}</span>
                </div>
                <ChevronRight size={16} className="mobile-nav-item-arrow" />
              </button>
            );
          })}
        </nav>

        {/* Direct Action Card */}
        <div className="mobile-drawer-actions-card">
          <div className="mobile-drawer-phone-row">
            <div>
              <span className="mobile-drawer-label">Direct Reservations</span>
              <a href={`tel:${callNumber}`} className="mobile-drawer-phone-number">
                <Phone size={15} />
                <span>{phone}</span>
              </a>
            </div>
            <a 
              href={`https://wa.me/${callNumber.replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-drawer-whatsapp"
            >
              WhatsApp
            </a>
          </div>

          <button 
            className="btn-drawer-book"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
          >
            <span>Book Your Stay</span>
            <ArrowUpRight size={16} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}
