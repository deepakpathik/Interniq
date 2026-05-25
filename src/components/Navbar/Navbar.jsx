import React, { useState } from 'react';
import { Heart, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Navbar.css';

export default function Navbar({
  listingsCount = 0,
  wishlistCount = 0,
  isWishlistMode = false,
  setWishlistMode,
  isDarkMode = false,
  toggleDarkMode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    setSelectedProfiles,
    setSelectedLocations,
    setIsWFH,
    setSearchQuery
  } = useApp();

  const filterByProfile = (profile, e) => {
    e.preventDefault();
    setSelectedProfiles([profile]);
    setWishlistMode(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const filterByLocation = (loc, e) => {
    e.preventDefault();
    if (loc.toLowerCase() === 'work from home') {
      setIsWFH(true);
    } else {
      setSelectedLocations([loc]);
    }
    setWishlistMode(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setSelectedProfiles([]);
    setSelectedLocations([]);
    setIsWFH(false);
    setWishlistMode(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  return (
    <header className="is-navbar-wrapper">
      <div className="is-navbar">
        <div className="is-navbar-left">
          <button className="is-hamburger" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <a href="https://internshala.com/" className="is-logo-link" target="_blank" rel="noopener noreferrer">
            <img
              src="/internshala_og_image.jpg"
              alt="Internshala"
              className="is-logo-img"
            />
          </a>
        </div>

        <nav className="is-nav-links">
          <div className="is-nav-item is-nav-dropdown-trigger">
            <span className="is-nav-label">
              Internships <ChevronDown size={12} className="is-chevron" />
            </span>
            {listingsCount > 0 && <div className="is-nav-badge">{listingsCount}</div>}
            
            <div className="is-dropdown-panel">
              <div className="is-dropdown-cols">
                <div className="is-dropdown-col">
                  <div className="is-dropdown-heading">Top Categories</div>
                  <a href="#" onClick={(e) => filterByLocation('Work from home', e)} className="is-dropdown-link">Work from home</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); }} className="is-dropdown-link">Part-time</a>
                  <a href="#" onClick={(e) => filterByProfile('Web Development', e)} className="is-dropdown-link">Engineering</a>
                  <a href="#" onClick={(e) => filterByProfile('Marketing', e)} className="is-dropdown-link">MBA</a>
                  <a href="#" onClick={(e) => filterByProfile('Graphic Design', e)} className="is-dropdown-link">Media</a>
                </div>
                <div className="is-dropdown-col">
                  <div className="is-dropdown-heading">Trending Profiles</div>
                  <a href="#" onClick={(e) => filterByProfile('Web Development', e)} className="is-dropdown-link">Web Development</a>
                  <a href="#" onClick={(e) => filterByProfile('Mobile App Development', e)} className="is-dropdown-link">Android Development</a>
                  <a href="#" onClick={(e) => filterByProfile('Graphic Design', e)} className="is-dropdown-link">Graphic Design</a>
                  <a href="#" onClick={(e) => filterByProfile('Content Writing', e)} className="is-dropdown-link">Content Writing</a>
                  <a href="#" onClick={(e) => filterByProfile('Digital Marketing', e)} className="is-dropdown-link">Digital Marketing</a>
                </div>
                <div className="is-dropdown-col">
                  <div className="is-dropdown-heading">Popular Cities</div>
                  <a href="#" onClick={(e) => filterByLocation('Delhi', e)} className="is-dropdown-link">Delhi</a>
                  <a href="#" onClick={(e) => filterByLocation('Mumbai', e)} className="is-dropdown-link">Mumbai</a>
                  <a href="#" onClick={(e) => filterByLocation('Bangalore', e)} className="is-dropdown-link">Bangalore</a>
                  <a href="#" onClick={(e) => filterByLocation('Pune', e)} className="is-dropdown-link">Pune</a>
                  <a href="#" onClick={(e) => filterByLocation('Kolkata', e)} className="is-dropdown-link">Kolkata</a>
                </div>
              </div>
            </div>
          </div>

          <div className="is-nav-item is-nav-dropdown-trigger">
            <span className="is-nav-label">
              Courses <ChevronDown size={12} className="is-chevron" />
            </span>
            <div className="is-nav-offer-tag">OFFER</div>

            <div className="is-dropdown-panel">
              <div className="is-dropdown-cols">
                <div className="is-dropdown-col">
                  <div className="is-dropdown-heading">Programming</div>
                  <a href="#" className="is-dropdown-link">Web Development</a>
                  <a href="#" className="is-dropdown-link">Python Programming</a>
                  <a href="#" className="is-dropdown-link">Java Programming</a>
                  <a href="#" className="is-dropdown-link">C++ Programming</a>
                  <a href="#" className="is-dropdown-link">Android Development</a>
                </div>
                <div className="is-dropdown-col">
                  <div className="is-dropdown-heading">Data Science</div>
                  <a href="#" className="is-dropdown-link">Machine Learning</a>
                  <a href="#" className="is-dropdown-link">Data Science</a>
                  <a href="#" className="is-dropdown-link">Tableau & Power BI</a>
                </div>
                <div className="is-dropdown-col">
                  <div className="is-dropdown-heading">Business & Creative</div>
                  <a href="#" className="is-dropdown-link">Digital Marketing</a>
                  <a href="#" className="is-dropdown-link">Financial Modeling</a>
                  <a href="#" className="is-dropdown-link">Advanced Excel</a>
                  <a href="#" className="is-dropdown-link">Graphic Design</a>
                </div>
              </div>
            </div>
          </div>

          <div className="is-nav-item is-nav-dropdown-trigger">
            <span className="is-nav-label">
              Jobs <ChevronDown size={12} className="is-chevron" />
            </span>

            <div className="is-dropdown-panel">
              <div className="is-dropdown-cols">
                <div className="is-dropdown-col">
                  <div className="is-dropdown-heading">By Profile</div>
                  <a href="#" className="is-dropdown-link">Software Engineer</a>
                  <a href="#" className="is-dropdown-link">Full Stack Developer</a>
                  <a href="#" className="is-dropdown-link">Android Developer</a>
                  <a href="#" className="is-dropdown-link">Digital Marketing Manager</a>
                  <a href="#" className="is-dropdown-link">Graphic Designer</a>
                </div>
                <div className="is-dropdown-col">
                  <div className="is-dropdown-heading">By Location</div>
                  <a href="#" className="is-dropdown-link">Work from home</a>
                  <a href="#" className="is-dropdown-link">Delhi NCR</a>
                  <a href="#" className="is-dropdown-link">Mumbai</a>
                  <a href="#" className="is-dropdown-link">Bangalore</a>
                  <a href="#" className="is-dropdown-link">Pune</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="is-navbar-right">
          <button
            className={`is-saved-btn ${isWishlistMode ? 'is-saved-active' : ''}`}
            onClick={() => setWishlistMode(!isWishlistMode)}
            title={isWishlistMode ? 'Show all internships' : 'Show saved internships'}
          >
            <Heart size={16} fill={isWishlistMode ? 'currentColor' : 'none'} />
            <span>Saved</span>
            {wishlistCount > 0 && (
              <span className="is-wishlist-count">{wishlistCount}</span>
            )}
          </button>

          <button className="is-login-btn">Login</button>
          <button className="is-register-btn">Register</button>

          <button
            className="is-theme-btn"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="is-mobile-menu">
          <div className="is-mobile-menu-item" onClick={clearFilters}>Internships <span className="is-mobile-count">{listingsCount}</span></div>
          <div className="is-mobile-menu-item">Courses <span className="is-nav-offer-tag">OFFER</span></div>
          <div className="is-mobile-menu-item">Jobs</div>
          <div className="is-mobile-menu-divider" />
          <button
            className={`is-mobile-saved-btn ${isWishlistMode ? 'is-saved-active' : ''}`}
            onClick={() => { setWishlistMode(!isWishlistMode); setMobileMenuOpen(false); }}
          >
            <Heart size={16} fill={isWishlistMode ? 'currentColor' : 'none'} /> Saved Internships {wishlistCount > 0 && `(${wishlistCount})`}
          </button>
          <div className="is-mobile-auth-row">
            <button className="is-login-btn">Login</button>
            <button className="is-register-btn">Register</button>
          </div>
        </div>
      )}
    </header>
  );
}
