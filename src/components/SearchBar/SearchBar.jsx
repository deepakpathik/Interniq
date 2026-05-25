import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Briefcase, MapPin } from 'lucide-react';
import './SearchBar.css';

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      setFilteredProfiles(popularProfiles.slice(0, 4));
      setFilteredLocations(popularLocations.slice(0, 4));
      return;
    }
    setFilteredProfiles(popularProfiles.filter(p => p.toLowerCase().includes(q)).slice(0, 4));
    setFilteredLocations(popularLocations.filter(l => l.toLowerCase().includes(q)).slice(0, 4));
  }, [searchQuery, popularProfiles, popularLocations]);

  const selectSuggestion = (value) => {
    setSearchQuery(value);
    setShowDropdown(false);
  };

  const hasSuggestions = filteredProfiles.length > 0 || filteredLocations.length > 0;

  return (
    <div className="is-search-container" ref={dropdownRef}>
      <div className="is-search-inner">
        <span className="is-search-icon-left">
          <Search size={18} />
        </span>
        <input
          type="text"
          id="keyword-search"
          className="is-search-input"
          placeholder="e.g. Design, Mumbai, Infosys"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            className="is-search-clear"
            onClick={() => setSearchQuery('')}
            title="Clear search"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
        <button className="is-search-btn" type="button" aria-label="Search">
          <Search size={16} />
          <span>Search</span>
        </button>
      </div>

      {showDropdown && hasSuggestions && (
        <div className="is-search-dropdown" id="search-suggestions">
          {filteredProfiles.length > 0 && (
            <div className="is-suggestion-section">
              <div className="is-suggestion-heading">Profiles</div>
              {filteredProfiles.map((profile) => (
                <div
                  key={`profile-${profile}`}
                  className="is-suggestion-item"
                  onClick={() => selectSuggestion(profile)}
                  id={`suggestion-profile-${profile.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <Briefcase size={14} className="is-suggestion-icon" />
                  <span>{profile}</span>
                </div>
              ))}
            </div>
          )}
          {filteredLocations.length > 0 && (
            <div className="is-suggestion-section">
              <div className="is-suggestion-heading">Locations</div>
              {filteredLocations.map((location) => (
                <div
                  key={`location-${location}`}
                  className="is-suggestion-item"
                  onClick={() => selectSuggestion(location)}
                  id={`suggestion-location-${location.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <MapPin size={14} className="is-suggestion-icon" />
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
