import React from 'react';
import { X, MapPin, Home, Clock, Calendar, Bookmark, ExternalLink, Zap, Star, CheckCircle } from 'lucide-react';
import './InternshipDetail.css';

export default function InternshipDetail({ internship, onClose, isSaved, onSave, isApplied, onApply }) {
  if (!internship) return null;

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
    isPartTime,
    skills = [],
    about,
    deadline,
  } = internship;

  const companyInitials = company
    ? company.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'CO';

  const displayLocations = isWorkFromHome ? ['Work from home'] : (locations.length > 0 ? locations : ['Office']);

  return (
    <div className="is-detail-overlay" onClick={onClose}>
      <div className="is-detail-panel" onClick={e => e.stopPropagation()} id="internship-detail-panel">
        {/* Header */}
        <div className="is-detail-header">
          <button className="is-detail-close" onClick={onClose} aria-label="Close details">
            <X size={20} />
          </button>
          <div className="is-detail-header-content">
            <div className="is-detail-logo">
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt={`${company} logo`}
                  className="is-detail-logo-img"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
              ) : null}
              <div className="is-detail-logo-fallback" style={{ display: companyLogo ? 'none' : 'flex' }}>
                {companyInitials}
              </div>
            </div>
            <div className="is-detail-title-block">
              <h1 className="is-detail-title">{title}</h1>
              <p className="is-detail-company">{company}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="is-detail-body">
          {/* Meta grid */}
          <div className="is-detail-meta-grid">
            <div className="is-detail-meta-item">
              <div className="is-detail-meta-label">
                {isWorkFromHome ? <Home size={14} /> : <MapPin size={14} />}
                Location
              </div>
              <div className="is-detail-meta-value">{displayLocations.join(', ')}</div>
            </div>
            <div className="is-detail-meta-item">
              <div className="is-detail-meta-label">
                <span style={{fontSize:'0.9rem',fontWeight:700,color:'#94a3b8'}}>₹</span>
                Stipend
              </div>
              <div className="is-detail-meta-value is-stipend-highlight">{stipendText}</div>
            </div>
            <div className="is-detail-meta-item">
              <div className="is-detail-meta-label">
                <Calendar size={14} />
                Start Date
              </div>
              <div className="is-detail-meta-value">{startDate || 'Immediately'}</div>
            </div>
            <div className="is-detail-meta-item">
              <div className="is-detail-meta-label">
                <Clock size={14} />
                Duration
              </div>
              <div className="is-detail-meta-value">{duration}</div>
            </div>
          </div>

          {/* Type badges */}
          <div className="is-detail-badges">
            {isPpo && (
              <span className="is-detail-badge is-detail-badge-ppo">
                <Star size={12} fill="currentColor" /> {ppoLabel || 'With job offer'}
              </span>
            )}
            {isPremium && (
              <span className="is-detail-badge is-detail-badge-premium">
                <Zap size={12} fill="currentColor" /> Premium
              </span>
            )}
            {isPartTime && <span className="is-detail-badge">Part-time</span>}
            {isWorkFromHome && <span className="is-detail-badge">Work from home</span>}
          </div>

          {/* About */}
          {about && (
            <div className="is-detail-section">
              <h3 className="is-detail-section-title">About the internship</h3>
              <p className="is-detail-about">{about}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="is-detail-section">
              <h3 className="is-detail-section-title">Skill(s) required</h3>
              <div className="is-detail-skills">
                {skills.map(skill => (
                  <span key={skill} className="is-detail-skill-chip">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Footer info */}
          <div className="is-detail-info-row">
            {postedOn && <span className="is-detail-posted">Posted: {postedOn}</span>}
            {deadline && <span className="is-detail-deadline">Apply by: {deadline}</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="is-detail-actions">
          <button
            className={`is-detail-bookmark-btn ${isSaved ? 'is-detail-bookmarked' : ''}`}
            onClick={() => onSave && onSave(id)}
            id={`detail-save-btn-${id}`}
          >
            <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          {isApplied ? (
            <button className="is-detail-applied-btn" disabled id={`detail-applied-btn-${id}`}>
              <CheckCircle size={16} />
              Applied
            </button>
          ) : (
            <button
              className="is-detail-apply-btn"
              onClick={() => onApply && onApply(id)}
              id={`detail-apply-btn-${id}`}
            >
              Apply now
              <ExternalLink size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
