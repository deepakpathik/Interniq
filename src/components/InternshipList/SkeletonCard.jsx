import React from 'react';
import './SkeletonCard.css';

/**
 * SkeletonCard Component
 * Displays a shimmering placeholder layout for internships while data is fetching.
 */
export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      {/* Title & Brand Logo Section */}
      <div className="skeleton-header">
        <div className="skeleton-brand">
          <div className="skeleton-title shimmer"></div>
          <div className="skeleton-subtitle shimmer"></div>
        </div>
        <div className="skeleton-logo shimmer"></div>
      </div>

      {/* Grid of Key Info (Location, Start Date, Duration, Stipend) */}
      <div className="skeleton-details-grid">
        <div className="skeleton-detail-item">
          <div className="skeleton-detail-label shimmer"></div>
          <div className="skeleton-detail-value shimmer"></div>
        </div>
        <div className="skeleton-detail-item">
          <div className="skeleton-detail-label shimmer"></div>
          <div className="skeleton-detail-value shimmer"></div>
        </div>
        <div className="skeleton-detail-item">
          <div className="skeleton-detail-label shimmer"></div>
          <div className="skeleton-detail-value shimmer"></div>
        </div>
        <div className="skeleton-detail-item">
          <div className="skeleton-detail-label shimmer"></div>
          <div className="skeleton-detail-value shimmer"></div>
        </div>
      </div>

      {/* Footer Tags & Actions Section */}
      <div className="skeleton-footer">
        <div className="skeleton-meta">
          <div className="skeleton-tag shimmer"></div>
          <div className="skeleton-tag shimmer"></div>
        </div>
        <div className="skeleton-actions">
          <div className="skeleton-btn-circle shimmer"></div>
          <div className="skeleton-btn shimmer"></div>
        </div>
      </div>
    </div>
  );
}
