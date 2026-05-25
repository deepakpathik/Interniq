import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import InternshipList from './components/InternshipList/InternshipList';
import SearchBar from './components/SearchBar/SearchBar';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import InternshipDetail from './components/InternshipDetail/InternshipDetail';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import './App.css';

function AppContent() {
  const {
    filteredInternships,
    loading,
    isWishlistMode,
    setIsWishlistMode,
    isDarkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    popularProfiles,
    popularLocations,
    wishlist,
    toggleWishlist,
    selectedInternship,
    isDetailOpen,
    setIsDetailOpen,
    appliedInternships,
    applyForInternship,
  } = useApp();

  React.useEffect(() => {
    document.title = `${filteredInternships.length} Internships: Summer Internships 2026 | Paid Internships... Interniq`;
  }, [filteredInternships.length]);

  const handleCloseDetail = () => setIsDetailOpen(false);

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

      <main className="is-app-main">
        <div className="is-main-container">
          <nav className="is-breadcrumb" aria-label="Breadcrumb">
            <span className="is-breadcrumb-item"><a href="/">Home</a></span>
            <span className="is-breadcrumb-sep">›</span>
            <span className="is-breadcrumb-item is-breadcrumb-active">Internships</span>
          </nav>

          <div className="is-page-heading">
            <h1 className="is-page-title">
              {loading ? 'Loading internships…' : `${filteredInternships.length} Total Internships`}
            </h1>
            <p className="is-page-subtitle">Latest Internships in India</p>
          </div>

          <div className="is-layout">
            <aside className="is-sidebar">
              <FilterSidebar />
            </aside>

            <section className="is-feed">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                popularProfiles={popularProfiles}
                popularLocations={popularLocations}
              />
              <InternshipList />
            </section>
          </div>

          <FAQ />
        </div>
      </main>

      <Footer />

      {isDetailOpen && selectedInternship && (
        <InternshipDetail
          internship={selectedInternship}
          onClose={handleCloseDetail}
          isSaved={wishlist.includes(selectedInternship.id)}
          onSave={toggleWishlist}
          isApplied={appliedInternships.includes(selectedInternship.id)}
          onApply={applyForInternship}
        />
      )}
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
