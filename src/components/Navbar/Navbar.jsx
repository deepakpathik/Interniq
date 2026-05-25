import React from 'react';
import { Heart, Sun, Moon } from 'lucide-react';
import './Navbar.css';

export default function Navbar({
  listingsCount = 0,
  wishlistCount = 0,
  isWishlistMode = false,
  setWishlistMode,
  isDarkMode = false,
  toggleDarkMode
}) {
  return (
    <header className="navbar-wrapper">
      <div className="container navbar">
        <div className="logo-container" onClick={() => setWishlistMode(false)}>
          <img src="/internshala_og_image.jpg" alt="Internshala Logo" className="navbar-logo-img" />
        </div>

        <div className="nav-actions">
          <div className="listings-badge">
            {listingsCount} {listingsCount === 1 ? 'Internship' : 'Internships'} Available
          </div>

          <button
            className={`nav-btn ${isWishlistMode ? 'active' : ''}`}
            onClick={() => setWishlistMode(!isWishlistMode)}
            title={isWishlistMode ? "Show all internships" : "Show saved internships"}
          >
            <Heart size={18} fill={isWishlistMode ? "currentColor" : "transparent"} />
            <span>Saved</span>
            {wishlistCount > 0 && (
              <span className="wishlist-count">{wishlistCount}</span>
            )}
          </button>

          <button
            className="nav-btn theme-toggle-btn"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
