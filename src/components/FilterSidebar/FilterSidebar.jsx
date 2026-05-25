import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './FilterSidebar.css';

const DURATION_OPTIONS = [
  { value: 36, label: 'Show all' },
  { value: 1, label: '1 Month' },
  { value: 2, label: '2 Months' },
  { value: 3, label: '3 Months' },
  { value: 4, label: '4 Months' },
  { value: 6, label: '6 Months' },
  { value: 12, label: '12 Months' },
  { value: 24, label: '24 Months' },
  { value: 36, label: '36 Months' },
];

const STIPEND_STEPS = [0, 2000, 4000, 6000, 8000, 10000];
const STIPEND_LABELS = ['0', '2K', '4K', '6K', '8K', '10K'];

export default function FilterSidebar() {
  const {
    selectedProfiles,
    setSelectedProfiles,
    selectedLocations,
    setSelectedLocations,
    selectedDuration,
    setSelectedDuration,
    minStipend,
    setMinStipend,
    popularProfiles,
    popularLocations,
    resetFilters,
    isWFH,
    setIsWFH,
    isPartTime,
    setIsPartTime,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [profileInput, setProfileInput] = useState('');
  const [showProfileSuggestions, setShowProfileSuggestions] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const profileRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProfiles = useMemo(() => {
    const query = profileInput.toLowerCase().trim();
    const available = popularProfiles.filter(p => !selectedProfiles.includes(p));
    if (!query) return available.slice(0, 5);
    return available.filter(p => p.toLowerCase().includes(query)).slice(0, 5);
  }, [profileInput, popularProfiles, selectedProfiles]);

  const filteredLocationsSuggestions = useMemo(() => {
    const query = locationInput.toLowerCase().trim();
    const available = popularLocations.filter(l => !selectedLocations.includes(l));
    if (!query) return available.slice(0, 5);
    return available.filter(l => l.toLowerCase().includes(query)).slice(0, 5);
  }, [locationInput, popularLocations, selectedLocations]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleClearAll = (e) => {
    e.preventDefault();
    resetFilters();
    setProfileInput('');
    setLocationInput('');
  };

  const handleStipendChange = (e) => {
    const rawVal = Number(e.target.value);
    const nearest = STIPEND_STEPS.reduce((prev, curr) =>
      Math.abs(curr - rawVal) < Math.abs(prev - rawVal) ? curr : prev
    );
    setMinStipend(nearest);
  };

  const stipendPercent = (minStipend / 10000) * 100;

  const activeFilterCount = [
    selectedProfiles.length,
    selectedLocations.length,
    isWFH ? 1 : 0,
    isPartTime ? 1 : 0,
    minStipend > 0 ? 1 : 0,
    selectedDuration < 36 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="is-mobile-filter-chips">
        <button className="is-filter-chip is-chip-primary" onClick={toggleSidebar} id="filter-toggle-btn">
          <span>Filters</span>
          <SlidersHorizontal size={14} />
          {activeFilterCount > 0 && (
            <span className="is-filter-active-count">{activeFilterCount}</span>
          )}
        </button>
        <button className="is-filter-chip" onClick={toggleSidebar}>Profile</button>
        <button className="is-filter-chip" onClick={toggleSidebar}>Location</button>
        <button 
          className={`is-filter-chip ${isWFH ? 'is-chip-active' : ''}`}
          onClick={() => setIsWFH(!isWFH)}
        >
          Work from home
        </button>
        <button 
          className={`is-filter-chip ${isPartTime ? 'is-chip-active' : ''}`}
          onClick={() => setIsPartTime(!isPartTime)}
        >
          Part-time
        </button>
      </div>

      <div className={`is-filter-sidebar ${isOpen ? 'is-filter-open' : ''}`} id="filter-sidebar">
        <div className="is-filter-header">
          <div className="is-filter-title">
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="is-filter-active-count">{activeFilterCount}</span>
            )}
          </div>
          <button className="is-filter-close-btn" onClick={toggleSidebar} aria-label="Close filters">
            <X size={20} />
          </button>
        </div>

        <div className="is-filter-form">
          <div className="is-filter-group" id="filter-profile" ref={profileRef}>
            <label className="is-filter-label" htmlFor="filter-profile-input">Profile</label>
            <div className="is-filter-input-container">
              {selectedProfiles.map(p => (
                <span key={p} className="is-filter-tag">
                  {p}
                  <button
                    type="button"
                    className="is-filter-tag-remove"
                    onClick={() => setSelectedProfiles(selectedProfiles.filter(item => item !== p))}
                    aria-label={`Remove ${p}`}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                id="filter-profile-input"
                className="is-filter-input"
                placeholder={selectedProfiles.length === 0 ? "e.g. Marketing" : ""}
                value={profileInput}
                onChange={(e) => {
                  setProfileInput(e.target.value);
                  setShowProfileSuggestions(true);
                }}
                onFocus={() => setShowProfileSuggestions(true)}
                autoComplete="off"
              />
            </div>
            {showProfileSuggestions && filteredProfiles.length > 0 && (
              <div className="is-filter-suggestions">
                {filteredProfiles.map(p => (
                  <div
                    key={p}
                    className="is-filter-suggestion-item"
                    onClick={() => {
                      setSelectedProfiles([...selectedProfiles, p]);
                      setProfileInput('');
                      setShowProfileSuggestions(false);
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="is-filter-group" id="filter-location" ref={locationRef}>
            <label className="is-filter-label" htmlFor="filter-location-input">Location</label>
            <div className="is-filter-input-container">
              {selectedLocations.map(l => (
                <span key={l} className="is-filter-tag">
                  {l}
                  <button
                    type="button"
                    className="is-filter-tag-remove"
                    onClick={() => setSelectedLocations(selectedLocations.filter(item => item !== l))}
                    aria-label={`Remove ${l}`}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                id="filter-location-input"
                className="is-filter-input"
                placeholder={selectedLocations.length === 0 ? "e.g. Delhi" : ""}
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                autoComplete="off"
              />
            </div>
            {showLocationSuggestions && filteredLocationsSuggestions.length > 0 && (
              <div className="is-filter-suggestions">
                {filteredLocationsSuggestions.map(l => (
                  <div
                    key={l}
                    className="is-filter-suggestion-item"
                    onClick={() => {
                      setSelectedLocations([...selectedLocations, l]);
                      setLocationInput('');
                      setShowLocationSuggestions(false);
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="is-filter-group" id="filter-work-type">
            <label className="is-checkbox-row">
              <input
                type="checkbox"
                id="filter-wfh"
                className="is-checkbox"
                checked={isWFH || false}
                onChange={(e) => setIsWFH && setIsWFH(e.target.checked)}
              />
              <span className="is-checkbox-label">Work from home</span>
            </label>
            <label className="is-checkbox-row" style={{ marginTop: '0.5rem' }}>
              <input
                type="checkbox"
                id="filter-parttime"
                className="is-checkbox"
                checked={isPartTime || false}
                onChange={(e) => setIsPartTime && setIsPartTime(e.target.checked)}
              />
              <span className="is-checkbox-label">Part-time</span>
            </label>
          </div>

          <div className="is-filter-group" id="filter-stipend">
            <label className="is-filter-label">
              Desired minimum monthly stipend (₹)
              {minStipend > 0 && (
                <span className="is-stipend-current">
                  ₹{minStipend >= 1000 ? `${minStipend / 1000}K` : minStipend}
                </span>
              )}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="1000"
              value={minStipend}
              onChange={handleStipendChange}
              className="is-stipend-slider"
              id="stipend-range"
              style={{
                background: `linear-gradient(to right, #008BDC ${stipendPercent}%, #e2e8f0 ${stipendPercent}%)`
              }}
            />
            <div className="is-stipend-labels">
              {STIPEND_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>

          <button
            className="is-view-more-btn"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            id="view-more-filters-btn"
          >
            <span>{showMoreFilters ? 'View less filters' : 'View more filters'}</span>
            {showMoreFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showMoreFilters && (
            <div className="is-more-filters" id="more-filters-section">
              <div className="is-filter-group">
                <label className="is-filter-label" htmlFor="filter-duration-select">Max. duration (months)</label>
                <select
                  id="filter-duration-select"
                  className="is-filter-select"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(Number(e.target.value))}
                >
                  {DURATION_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="is-filter-footer">
          <a href="#" className="is-clear-all-link" onClick={handleClearAll} id="clear-all-filters">
            Clear all
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="is-filter-backdrop" onClick={toggleSidebar} />
      )}
    </>
  );
}
