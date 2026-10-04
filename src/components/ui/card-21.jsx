import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

// Define the props for the DestinationCard component
const DestinationCard = React.forwardRef(
  (
    {
      className,
      imageUrl,
      location,
      stats,
      href,
      price,
      badge,
      features = [],
      buttonText = "Enquire about this room",
      onExplore,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("destination-card-wrapper group w-full h-full", className)}
        {...props}
      >
        <div
          onClick={onExplore || (() => { if (href) window.location.href = href; })}
          className="destination-card-inner relative block w-full h-full rounded-3xl overflow-hidden shadow-lg 
                     transition-all duration-500 ease-in-out cursor-pointer"
          aria-label={`Explore details for ${location}`}
          style={{
            minHeight: '490px',
            position: 'relative',
            borderRadius: '26px',
            overflow: 'hidden',
            backgroundColor: '#0c1624'
          }}
        >
          {/* Background Image with Parallax Zoom */}
          <div
            className="destination-card-bg absolute inset-0 bg-cover bg-center 
                       transition-transform duration-700 ease-in-out"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              position: 'absolute',
              inset: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          />

          {/* Calm, Natural Dark Gradient Overlay (Zero Saturated Color Cast) */}
          <div
            className="destination-card-overlay absolute inset-0"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, rgba(9, 17, 28, 0.94) 0%, rgba(9, 17, 28, 0.72) 42%, rgba(9, 17, 28, 0.18) 72%, transparent 100%)`,
            }}
          />

          {/* Top Badges */}
          <div 
            style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
              right: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          >
            {badge && (
              <span 
                style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#0f172a',
                  fontSize: '11.5px',
                  fontWeight: 750,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)'
                }}
              >
                {badge}
              </span>
            )}
            {price && (
              <span 
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  marginLeft: 'auto'
                }}
              >
                {price}
              </span>
            )}
          </div>
          
          {/* Content */}
          <div 
            className="destination-card-content relative flex flex-col justify-end h-full p-8 text-white"
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: '100%',
              minHeight: '490px',
              padding: '32px 26px',
              color: '#ffffff',
              boxSizing: 'border-box'
            }}
          >
            <h3 
              className="destination-card-title text-3xl font-bold tracking-tight text-white flex items-center"
              style={{
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                lineHeight: 1.25,
                margin: 0
              }}
            >
              {location}
            </h3>
            
            <p 
              className="destination-card-stats text-sm text-white/90 mt-2 font-medium leading-relaxed"
              style={{
                fontSize: '13.5px',
                color: 'rgba(255, 255, 255, 0.85)',
                marginTop: '8px',
                fontWeight: 450,
                lineHeight: 1.5,
                margin: '8px 0 0'
              }}
            >
              {stats}
            </p>

            {/* Feature Pills */}
            {features && features.length > 0 && (
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginTop: '14px'
                }}
              >
                {features.map((feat, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: '6px',
                      padding: '3.5px 9px',
                      fontSize: '11.5px',
                      fontWeight: 550,
                      color: 'rgba(255, 255, 255, 0.95)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Check size={11} strokeWidth={2.8} />
                    {feat}
                  </span>
                ))}
              </div>
            )}

            {/* Explore / Book Button */}
            <div 
              className="destination-card-btn mt-6 flex items-center justify-between"
              style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: '14px',
                padding: '12px 18px',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.01em' }}>
                {buttonText}
              </span>
              <ArrowRight size={15} color="#ffffff" className="destination-card-arrow" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

DestinationCard.displayName = "DestinationCard";

export { DestinationCard };
export default DestinationCard;
