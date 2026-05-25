import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchInternships } from '../services/api';

const AppContext = createContext();

/**
 * AppProvider Component
 * Manages the global state of the Interniq application, including
 * internship data fetching, active filters, search queries, wishlist/bookmark state,
 * application status, and light/dark theme toggle.
 */
export function AppProvider({ children }) {
  // --- Data Fetching State ---
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Filtering & Search State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]); // Array for multi-select
  const [selectedDuration, setSelectedDuration] = useState(6); // Default 6 months max
  const [minStipend, setMinStipend] = useState(0); // Default 0 min stipend

  // --- UI Views & Modal States ---
  const [isWishlistMode, setIsWishlistMode] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // --- Theme State (Persisted in localStorage) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  // --- Wishlist State (Persisted in localStorage) ---
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Applications State (Persisted in localStorage) ---
  const [appliedInternships, setAppliedInternships] = useState(() => {
    const saved = localStorage.getItem('applied');
    return saved ? JSON.parse(saved) : [];
  });

  // Load internship listings on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchInternships();
        setInternships(data);
        setError(null);
      } catch (err) {
        setError('Failed to load internships. Please try again later.');
      } finally {
        // Simulate minor delay to showcase skeleton loader
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    }
    loadData();
  }, []);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync applications to localStorage
  useEffect(() => {
    localStorage.setItem('applied', JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  // Sync dark mode class on document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Toggle Save / Wishlist action
  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Submit mock application
  const applyForInternship = (id) => {
    if (!appliedInternships.includes(id)) {
      setAppliedInternships(prev => [...prev, id]);
    }
  };

  // Reset all filters to their default values
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedProfile('');
    setSelectedLocations([]);
    setSelectedDuration(6);
    setMinStipend(0);
    setIsWishlistMode(false);
  };

  // Helper lists generated dynamically from internships metadata
  const popularProfiles = useMemo(() => {
    const profiles = internships.map(item => item.profile).filter(Boolean);
    return [...new Set(profiles)].sort();
  }, [internships]);

  const popularLocations = useMemo(() => {
    const locationsList = internships.flatMap(item => item.locations || []).filter(Boolean);
    return [...new Set(locationsList)].sort();
  }, [internships]);

  // Compute final filtered internships on client side
  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      // 1. Wishlist Filter
      if (isWishlistMode && !wishlist.includes(item.id)) {
        return false;
      }

      // 2. Search Query Match (fuzzy search across title, company, profile, and locations)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          item.title.toLowerCase().includes(query) ||
          item.company.toLowerCase().includes(query) ||
          item.profile.toLowerCase().includes(query) ||
          item.locations.some(loc => loc.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // 3. Profile Match
      if (selectedProfile !== '' && item.profile !== selectedProfile) {
        return false;
      }

      // 4. Locations Match (selectedLocations is an array of checked options)
      if (selectedLocations.length > 0) {
        const hasMatchingLocation = item.locations.some(loc => {
          // If user selected "Work From Home", match work_from_home status
          if (loc === 'Work From Home' || item.isWorkFromHome) {
            return selectedLocations.includes('Work From Home');
          }
          return selectedLocations.includes(loc);
        });
        if (!hasMatchingLocation) return false;
      }

      // 5. Duration Match (durationMonths must be <= selectedDuration)
      if (item.durationMonths > selectedDuration) {
        return false;
      }

      // 6. Stipend Match (stipendValue must be >= minStipend)
      if (item.stipendValue < minStipend) {
        return false;
      }

      return true;
    });
  }, [internships, isWishlistMode, wishlist, searchQuery, selectedProfile, selectedLocations, selectedDuration, minStipend]);

  // Context value object
  const value = {
    internships,
    filteredInternships,
    loading,
    error,
    
    searchQuery,
    setSearchQuery,
    selectedProfile,
    setSelectedProfile,
    selectedLocations,
    setSelectedLocations,
    selectedDuration,
    setSelectedDuration,
    minStipend,
    setMinStipend,
    
    isWishlistMode,
    setIsWishlistMode,
    wishlist,
    toggleWishlist,
    appliedInternships,
    applyForInternship,
    
    selectedInternship,
    setSelectedInternship,
    isDetailOpen,
    setIsDetailOpen,
    
    isDarkMode,
    toggleDarkMode,
    resetFilters,
    
    popularProfiles,
    popularLocations
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Custom hook to consume AppContext
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
