import React from 'react';
import InternshipCard from '../InternshipCard/InternshipCard';
import SkeletonCard from './SkeletonCard';
import { useApp } from '../../context/AppContext';
import './InternshipList.css';

export default function InternshipList() {
  const {
    filteredInternships,
    loading,
    error,
    wishlist,
    toggleWishlist,
    setIsDetailOpen,
    setSelectedInternship
  } = useApp();

  const handleCardClick = (internship) => {
    setSelectedInternship(internship);
    setIsDetailOpen(true);
  };

  if (loading) {
    return (
      <div className="internship-list">
        {[1, 2, 3, 4, 5].map(i => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-message error-message">
        <p>{error}</p>
      </div>
    );
  }

  if (filteredInternships.length === 0) {
    return (
      <div className="is-empty-state">
        <div className="is-empty-icon">🔍</div>
        <h3 className="is-empty-title">No internships found</h3>
        <p className="is-empty-sub">Try adjusting your filters or search term.</p>
      </div>
    );
  }


  return (
    <div className="internship-list">
      {filteredInternships.map(internship => (
        <InternshipCard
          key={internship.id}
          internship={internship}
          onClick={() => handleCardClick(internship)}
          isSaved={wishlist.includes(internship.id)}
          onSave={toggleWishlist}
        />
      ))}
    </div>
  );
}
