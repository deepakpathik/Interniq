import React from 'react';
import { MapPin, Home, DollarSign, Clock, Zap, Bookmark, Star } from 'lucide-react';
import './InternshipCard.css';

export default function InternshipCard({ internship, onClick, isSaved, onSave }) {
  const {
    id,
    title,
    company,
    companyLogo,
    locations = [],
    isWorkFromHome,
    startDate,
    duration,
    stipendText,
    postedOn,
    expiringIn,
    isPremium,
    isPpo,
    ppoLabel,
    activelyHiring,
    isPartTime,
    isEarlyApplicant,
    skills = [],
    about,
  } = internship;

  const companyInitials = company
    ? company.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'CO';

  const displayLocations = isWorkFromHome
    ? ['Work from home']
    : (locations.length > 0 ? locations : ['Office']);

  return (
    <div className="is-card" onClick={onClick} id={`internship-card-${id}`}>
      <div className="is-card-top">
        <div className="is-card-info">
          <h2 className="is-card-title">{title}</h2>
          <div className="is-card-company-row">
            <p className="is-card-company">{company}</p>
            {activelyHiring && (
              <span className="is-actively-hiring">Actively hiring</span>
            )}
          </div>
        </div>

        <div className="is-card-logo-area">
          <div className="is-card-logo" title={company}>
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={`${company} logo`}
                className="is-card-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="is-card-logo-fallback"
              style={{ display: companyLogo ? 'none' : 'flex' }}
            >
              {companyInitials}
            </div>
          </div>
          <button
            className={`is-bookmark-btn ${isSaved ? 'is-bookmarked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onSave) onSave(id);
            }}
            title={isSaved ? 'Remove from saved' : 'Save internship'}
            id={`save-btn-${id}`}
          >
            <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="is-card-row1">
        <div className="is-card-meta-item">
          {isWorkFromHome
            ? <Home size={15} className="is-meta-icon wfh" />
            : <MapPin size={15} className="is-meta-icon" />
          }
          <span className="is-meta-text">{displayLocations.join(', ')}</span>
        </div>
        <div className="is-card-meta-item">
          <span className="is-meta-icon-rupee">₹</span>
          <span className="is-meta-text">{stipendText}</span>
        </div>
        <div className="is-card-meta-item">
          <Clock size={15} className="is-meta-icon" />
          <span className="is-meta-text">{duration}</span>
        </div>
      </div>

      {skills.length > 0 && (
        <div className="is-card-skills">
          {skills.slice(0, 4).map((skill, i) => (
            <React.Fragment key={skill}>
              <span className="is-skill-tag">{skill}</span>
              {i < Math.min(skills.length, 4) - 1 && <span className="is-skill-dot">•</span>}
            </React.Fragment>
          ))}
          {skills.length > 4 && (
            <span className="is-skills-more">+{skills.length - 4} more</span>
          )}
        </div>
      )}

      <div className="is-card-footer">
        <div className="is-card-footer-left">
          {postedOn && (
            <span className="is-posted-time">{postedOn}</span>
          )}
          {isEarlyApplicant && (
            <span className="is-early-badge">
              <Zap size={11} fill="currentColor" />
              Be an early applicant
            </span>
          )}
          {expiringIn && (
            <span className="is-expiring-badge">{expiringIn}</span>
          )}
        </div>

        <div className="is-card-footer-right">
          {isPpo && (
            <span className="is-ppo-badge">
              <Star size={11} fill="currentColor" />
              {ppoLabel || 'With job offer'}
            </span>
          )}
          {isPremium && (
            <span className="is-premium-badge">
              <Zap size={11} fill="currentColor" />
              Premium
            </span>
          )}
          {isPartTime && (
            <span className="is-type-badge">Part time</span>
          )}
          {isWorkFromHome && !isPartTime && (
            <span className="is-type-badge">Work from home</span>
          )}
        </div>
      </div>
    </div>
  );
}
