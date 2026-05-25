import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchInternships } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(36);
  const [minStipend, setMinStipend] = useState(0);

  const [isWFH, setIsWFH] = useState(false);
  const [isPartTime, setIsPartTime] = useState(false);

  const [isWishlistMode, setIsWishlistMode] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedInternships, setAppliedInternships] = useState(() => {
    const saved = localStorage.getItem('applied');
    return saved ? JSON.parse(saved) : [];
  });

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
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('applied', JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const applyForInternship = (id) => {
    if (!appliedInternships.includes(id)) {
      setAppliedInternships(prev => [...prev, id]);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedProfiles([]);
    setSelectedLocations([]);
    setSelectedDuration(36);
    setMinStipend(0);
    setIsWishlistMode(false);
    setIsWFH(false);
    setIsPartTime(false);
  };

  const popularProfiles = useMemo(() => {
    const profiles = internships.map(item => item.profile).filter(Boolean);
    return [...new Set(profiles)].sort();
  }, [internships]);

  const popularLocations = useMemo(() => {
    const locationsList = internships.flatMap(item => item.locations || []).filter(Boolean);
    return [...new Set(locationsList)].sort();
  }, [internships]);

  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      if (isWishlistMode && !wishlist.includes(item.id)) return false;

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          item.title.toLowerCase().includes(query) ||
          item.company.toLowerCase().includes(query) ||
          item.profile.toLowerCase().includes(query) ||
          (item.locations || []).some(loc => loc.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      if (selectedProfiles.length > 0 && !selectedProfiles.includes(item.profile)) return false;

      if (selectedLocations.length > 0) {
        const hasMatch = (item.locations || []).some(loc => {
          if (item.isWorkFromHome) return selectedLocations.includes('Work From Home') || selectedLocations.includes('work from home');
          return selectedLocations.includes(loc);
        }) || (item.isWorkFromHome && (selectedLocations.includes('Work From Home') || selectedLocations.includes('work from home')));
        if (!hasMatch) return false;
      }

      if (isWFH && !item.isWorkFromHome) return false;
      if (isPartTime && !item.isPartTime) return false;
      if (item.durationMonths > selectedDuration) return false;
      if (item.stipendValue < minStipend) return false;

      return true;
    });
  }, [internships, isWishlistMode, wishlist, searchQuery, selectedProfiles, selectedLocations, selectedDuration, minStipend, isWFH, isPartTime]);

  const value = {
    internships,
    filteredInternships,
    loading,
    error,
    
    searchQuery,
    setSearchQuery,
    selectedProfiles,
    setSelectedProfiles,
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

    isWFH,
    setIsWFH,
    isPartTime,
    setIsPartTime,

    popularProfiles,
    popularLocations
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
