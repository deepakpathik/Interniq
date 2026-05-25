import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';

function AppContent() {
  const {
    filteredInternships,
    loading,
    wishlist,
    isWishlistMode,
    setIsWishlistMode,
    isDarkMode,
    toggleDarkMode
  } = useApp();

  return (
    <>
      <Navbar
        listingsCount={filteredInternships.length}
        wishlistCount={wishlist.length}
        isWishlistMode={isWishlistMode}
        setWishlistMode={setIsWishlistMode}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="container app-layout">
        <aside className="sidebar-container">
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Filters Section</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Will be added step-by-step in Commits 16 to 21.</p>
          </div>
        </aside>

        <section className="feed-container">
          <div style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>SearchBar</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Will be added in Commit 14.</p>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Feed Listings</h3>
            {loading ? (
              <p>Loading internships...</p>
            ) : (
              <p>Found {filteredInternships.length} internships</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

