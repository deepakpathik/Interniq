import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Briefcase, MapPin } from 'lucide-react';
import './SearchBar.css';

/**
 * SearchBar Component
 * Renders the search input with real-time query updates and an autocomplete dropdown
 * suggesting matching profiles and locations.
 */
export default function SearchBar({
  searchQuery = '',
  setSearchQuery,
  popularProfiles = [],
  popularLocations = []
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions when query changes
  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      setFilteredProfiles(popularProfiles.slice(0, 3));
      setFilteredLocations(popularLocations.slice(0, 3));
      return;
    }

    const matchesP = popularProfiles.filter(p => p.toLowerCase().includes(q));
    const matchesL = popularLocations.filter(l => l.toLowerCase().includes(q));

    setFilteredProfiles(matchesP.slice(0, 3));
    setFilteredLocations(matchesL.slice(0, 3));
  }, [searchQuery, popularProfiles, popularLocations]);

  const selectSuggestion = (value) => {
    setSearchQuery(value);
    setShowDropdown(false);
  };

  const hasSuggestions = filteredProfiles.length > 0 || filteredLocations.length > 0;

  return (
    <div className="search-bar-container" ref={dropdownRef}>
      <div className="search-input-wrapper">
        <div className="search-icon">
          <Search size={20} />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search by profile, company name, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && hasSuggestions && (
        <div className="search-suggestions-dropdown">
          {filteredProfiles.length > 0 && (
            <div>
              <div className="suggestion-section-title">Profiles</div>
              {filteredProfiles.map((profile) => (
                <div
                  key={`profile-${profile}`}
                  className="suggestion-item"
                  onClick={() => selectSuggestion(profile)}
                >
                  <span className="suggestion-icon"><Briefcase size={16} /></span>
                  <span>{profile}</span>
                </div>
              ))}
            </div>
          )}

          {filteredLocations.length > 0 && (
            <div>
              <div className="suggestion-section-title">Locations</div>
              {filteredLocations.map((location) => (
                <div
                  key={`location-${location}`}
                  className="suggestion-item"
                  onClick={() => selectSuggestion(location)}
                >
                  <span className="suggestion-icon"><MapPin size={16} /></span>
                  <span>{location}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
