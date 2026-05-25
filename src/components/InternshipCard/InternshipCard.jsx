import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import './InternshipCard.css';

/**
 * InternshipCard Component (Base Layout - Commit 9)
 * Renders the basic structure of an internship listing card including title,
 * company name, logo placeholder, and basic location details.
 */
export default function InternshipCard({ internship, onClick }) {
  const {
    title,
    company,
    companyLogo,
    locations,
    isWorkFromHome
  } = internship;

  // Get initials for the fallback logo
  const companyInitials = company
    ? company.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'CO';

  return (
    <div className="internship-card" onClick={onClick}>
      <div className="card-header">
        {/* Title and Company Area */}
        <div className="card-title-area">
          <h4 className="card-title">{title}</h4>
          <span className="card-company">{company}</span>
        </div>

        {/* Company Logo / Fallback */}
        <div className="card-logo-container">
          {companyLogo ? (
            <img 
              src={companyLogo} 
              alt={`${company} logo`} 
              className="card-logo-img"
              onError={(e) => {
                // If live URL fails to load, fallback to text avatar
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="card-logo-fallback"
            style={{ display: companyLogo ? 'none' : 'flex' }}
          >
            {companyInitials}
          </div>
        </div>
      </div>

      {/* Basic Location / Type Details */}
      <div className="card-basic-details">
        <div className="card-detail-item">
          <span className="card-detail-icon"><MapPin size={16} /></span>
          <span>{locations.join(', ')}</span>
        </div>
        {isWorkFromHome && (
          <div className="card-detail-item">
            <span className="card-detail-icon"><Briefcase size={16} /></span>
            <span>Work From Home</span>
          </div>
        )}
      </div>
    </div>
  );
}
