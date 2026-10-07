import React, { useState } from 'react';
import { MenuContainer, MenuItem } from './ui/fluid-menu';
import { 
  Menu as MenuIcon, 
  X, 
  Home, 
  BedDouble, 
  Sparkles, 
  MapPin, 
  Phone, 
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function FloatingMobileMenu({ currentPage, navigateTo, onOpenBooking, phoneNumber = '0789724254' }) {
  const [tooltip, setTooltip] = useState('');

  return (
    <aside aria-label="Mobile Navigation Menu" className="floating-fluid-menu-wrapper">
      <MenuContainer>
        {/* Toggle Button (First Item) */}
        <MenuItem
          icon={
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="fluid-icon-toggle-open">
                <MenuIcon size={24} strokeWidth={2} />
              </div>
              <div className="fluid-icon-toggle-close">
                <X size={24} strokeWidth={2.2} />
              </div>
            </div>
          }
        />

        {/* Home */}
        <MenuItem
          isActive={currentPage === 'home'}
          onClick={() => {
            navigateTo('home');
          }}
          icon={
            <div className="fluid-menu-action-btn" title="Home">
              <Home size={22} strokeWidth={2} />
              <span className="fluid-item-tooltip">Home</span>
            </div>
          }
        />

        {/* Rooms */}
        <MenuItem
          isActive={currentPage === 'rooms'}
          onClick={() => {
            navigateTo('rooms');
          }}
          icon={
            <div className="fluid-menu-action-btn" title="Rooms">
              <BedDouble size={22} strokeWidth={2} />
              <span className="fluid-item-tooltip">Rooms</span>
            </div>
          }
        />

        {/* Amenities */}
        <MenuItem
          isActive={currentPage === 'amenities'}
          onClick={() => {
            navigateTo('amenities');
          }}
          icon={
            <div className="fluid-menu-action-btn" title="Amenities">
              <Sparkles size={22} strokeWidth={2} />
              <span className="fluid-item-tooltip">Amenities</span>
            </div>
          }
        />

        {/* Location */}
        <MenuItem
          isActive={currentPage === 'location'}
          onClick={() => {
            navigateTo('location');
          }}
          icon={
            <div className="fluid-menu-action-btn" title="Location">
              <MapPin size={22} strokeWidth={2} />
              <span className="fluid-item-tooltip">Location</span>
            </div>
          }
        />

        {/* Contact */}
        <MenuItem
          isActive={currentPage === 'contact'}
          onClick={() => {
            navigateTo('contact');
          }}
          icon={
            <div className="fluid-menu-action-btn" title="Contact">
              <MessageSquare size={22} strokeWidth={2} />
              <span className="fluid-item-tooltip">Contact</span>
            </div>
          }
        />

        {/* Book Now */}
        <MenuItem
          onClick={onOpenBooking}
          icon={
            <div className="fluid-menu-action-btn highlight" title="Book Now">
              <Calendar size={22} strokeWidth={2.2} />
              <span className="fluid-item-tooltip">Book</span>
            </div>
          }
        />
      </MenuContainer>
    </aside>
  );
}
