import React from 'react';
import { MapPin, Play, Calendar, DollarSign, Clock, TrendingUp, Zap } from 'lucide-react';
import './InternshipCard.css';

const TEXT_WFH = 'Work From Home';
const LABEL_START_DATE = 'Start Date';
const LABEL_DURATION = 'Duration';
const LABEL_STIPEND = 'Stipend';

export default function InternshipCard({ internship, onClick }) {
  const {
    title,
    company,
    companyLogo,
    locations,
    isWorkFromHome,
    startDate,
    duration,
    stipendText,
    postedOn,
    expiringIn,
    isPremium,
    isPpo,
    ppoLabel
  } = internship;

  const companyInitials = company
    ? company.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'CO';

  return (
    <div className="internship-card" onClick={onClick}>
      <div className="card-header">
        <div className="card-title-area">
          <h4 className="card-title">{title}</h4>
          <span className="card-company">{company}</span>
        </div>

        <div className="card-logo-container">
          {companyLogo ? (
            <img 
              src={companyLogo} 
              alt={`${company} logo`} 
              className="card-logo-img"
              onError={(e) => {
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

      <div className="card-basic-details">
        <div className="card-detail-item">
          <span className="card-detail-icon"><MapPin size={16} /></span>
          <span>{locations.join(', ')}</span>
        </div>
        {isWorkFromHome && (
          <div className="card-detail-item">
            <span>•</span>
            <span>{TEXT_WFH}</span>
          </div>
        )}
      </div>

      <div className="card-details-grid">
        <div className="card-detail-column">
          <div className="card-detail-label">
            <Play size={12} />
            <span>{LABEL_START_DATE}</span>
          </div>
          <span className="card-detail-value">{startDate}</span>
        </div>
        
        <div className="card-detail-column">
          <div className="card-detail-label">
            <Calendar size={12} />
            <span>{LABEL_DURATION}</span>
          </div>
          <span className="card-detail-value">{duration}</span>
        </div>

        <div className="card-detail-column">
          <div className="card-detail-label">
            <DollarSign size={12} />
            <span>{LABEL_STIPEND}</span>
          </div>
          <span className="card-detail-value">{stipendText}</span>
        </div>
      </div>

      <div className="card-badges-row">
        {isPpo && (
          <div className="card-badge ppo-badge">
            <TrendingUp size={12} />
            <span>{ppoLabel}</span>
          </div>
        )}
        {isPremium && (
          <div className="card-badge premium-badge">
            <Zap size={12} fill="currentColor" />
            <span>Premium</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="card-footer-left">
          <span className="card-posted-date">{postedOn}</span>
        </div>
        
        {expiringIn && (
          <div className="card-deadline">
            <Clock size={12} />
            <span>{expiringIn}</span>
          </div>
        )}
      </div>
    </div>
  );
}
