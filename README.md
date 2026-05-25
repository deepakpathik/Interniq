# Interniq 🚀

Interniq is a premium, pixel-perfect replication and enhancement of the **Internshala Internship Search Page** (`https://internshala.com/internships/`). It is designed to fetch, display, and search through internship opportunities dynamically while providing a highly interactive, fast, and modern filtering experience entirely on the client side.

This project was built as part of the **SDE (Web) Internship Assignment**.

---

## ✨ Features & Enhancements

### 1. Replicated Internshala Search UI
* **Clean & Modern Feed**: A card-based layout inspired by Internshala's visual structure, optimized for high readability and premium aesthetic feel.
* **Responsive Layout**: Designed mobile-first, adapting seamlessly from small mobile screens to large desktop monitors.
* **Loading Skeleton States**: Smooth content loading animations (skeletons) that prevent layout shifts and improve the perceived performance.

### 2. Powerful Client-Side Filter Engine
As per the assignment requirements, filtering is handled entirely on the client-side for instant, zero-latency feedback:
* **Profile Filter**: Filter internships by job profile (e.g., Software Development, Web Development, UI/UX Design, Marketing).
* **Location Filter**: Filter by work location (e.g., Work From Home, Bangalore, Mumbai, Delhi, etc.).
* **Duration Filter**: Filter internships by duration (in months) using interactive selector elements.
* **Stipend Filter**: Filter by minimum stipend amount or custom stipend ranges.

### 3. Modern UI/UX Innovations
* **Fuzzy Search & Autocomplete**: Real-time searching across profiles, companies, and locations.
* **Stipend Range Slider**: A custom, interactive slider for a better user experience compared to plain inputs.
* **Glassmorphic Filter Sidebar**: A sticky, modern glass-effect sidebar on desktop that collapses into a drawer on mobile.
* **"Saved" Internships**: A local-storage backed wishlist allowing users to save and view their bookmarked internships later.
* **Interactive Micro-Animations**: Smooth scale transitions, hover effects on cards, and active state indicators to make the app feel alive and responsive.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React.js](https://react.dev/) / [Vite](https://vite.dev/) (or [Next.js](https://nextjs.org/))
* **Styling**: Modern CSS (or Tailwind CSS) with custom CSS variables for design systems, supporting dark/light themes.
* **Icons**: React Icons (Lucide React / FontAwesome)
* **API Endpoint**: `https://internshala.com/hiring/search` (fetches the live internship listings)

---

## 📁 Project Structure

```bash
Interniq/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Logos, images, and visual assets
│   ├── components/          # Reusable UI components
│   │   ├── FilterSidebar/   # Client-side filtering panel
│   │   ├── InternshipCard/  # Individual internship card
│   │   ├── InternshipList/  # List container for cards
│   │   ├── Navbar/          # Navigation header
│   │   └── SearchBar/       # Real-time search bar
│   ├── hooks/               # Custom hooks (e.g., useLocalStorage)
│   ├── services/            # API integration & data fetching logic
│   ├── styles/              # Global styles & design tokens
│   ├── App.jsx              # Main application entry component
│   └── main.jsx             # React DOM rendering
├── README.md                # Project documentation
├── package.json             # Dependencies and scripts
└── vite.config.js           # Development server and bundler config
```

---

## 🚀 Getting Started & Local Setup

Follow these simple steps to run the project locally on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16.0.0 or higher is recommended).

### 1. Clone the Repository
```bash
git clone https://github.com/deepakpathik/Interniq.git
cd Interniq
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
The application will start running locally. Open `http://localhost:5173` (or the port specified in your terminal) in your browser.

### 4. Build for Production
To build a production-ready optimized bundle:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 🧠 Technical Highlights

### ⚡ Efficient Client-Side Filtering
The application fetches the full internship dataset once upon load using React `useEffect` or `react-query` and stores it in memory. Filtering is performed reactively via computed state:

```javascript
const filteredInternships = useMemo(() => {
  return internships.filter((item) => {
    // 1. Profile Match
    const matchesProfile = selectedProfile === '' || 
      item.profile.toLowerCase().includes(selectedProfile.toLowerCase());

    // 2. Location Match
    const matchesLocation = selectedLocation === '' || 
      item.location.toLowerCase().includes(selectedLocation.toLowerCase());

    // 3. Duration Match
    const matchesDuration = !selectedDuration || 
      item.duration === parseInt(selectedDuration);

    // 4. Stipend Match
    const matchesStipend = item.stipend >= minStipend;

    // 5. Search Query Match
    const matchesSearch = searchQuery === '' || 
      item.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProfile && matchesLocation && matchesDuration && matchesStipend && matchesSearch;
  });
}, [internships, selectedProfile, selectedLocation, selectedDuration, minStipend, searchQuery]);
```

This ensures that UI updates happen within milliseconds without additional loading spinners or network overhead, keeping the interface extremely snappy.

---

## 🎯 Code Quality & Best Practices
* **Modular Component Architecture**: Every section (Filters, Cards, Search, Navbar) is isolated into its own reusable component.
* **Semantic HTML**: Proper use of `<header>`, `<main>`, `<section>`, `<aside>`, and `<footer>` tags for accessibility (a11y) and SEO.
* **Error Boundary & Fallbacks**: Handles network failures gracefully when the API fails to load.
