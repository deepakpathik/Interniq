import { MOCK_INTERNSHIPS_DATA } from './mockData';

/**
 * Service to handle data fetching from Internshala API and formatting the response
 */

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Parses and maps the raw API response into a standard format
 * @param {object} data - Raw JSON response from the API
 * @returns {Array} List of formatted internship objects
 */
export function processAPIResponse(data) {
  const { internships_meta, internship_ids } = data;
  if (!internship_ids || !internships_meta) {
    return [];
  }

  return internship_ids
    .map(id => internships_meta[id])
    .filter(Boolean)
    .map(item => {
      // Clean and normalize stipend values
      const stipendVal = item.stipend?.salaryValue1 || 0;
      
      // Determine if it is a remote internship
      const isWFH = item.work_from_home || false;

      return {
        id: item.id,
        title: item.title || 'Internship',
        company: item.company_name || 'Company',
        // Internshala serves uploaded logos from this uploads/logo path
        companyLogo: item.company_logo ? `https://internshala.com/uploads/logo/${item.company_logo}` : null,
        profile: item.profile_name || 'Other',
        isWorkFromHome: isWFH,
        locations: item.location_names && item.location_names.length > 0 
          ? item.location_names 
          : (isWFH ? ['Work From Home'] : ['Office']),
        startDate: item.start_date || 'Starts Immediately',
        duration: item.duration || 'Flexible',
        // Extract numeric duration in months (e.g. "3 Months" -> 3)
        durationMonths: item.duration ? parseInt(item.duration) || 1 : 1,
        stipendText: item.stipend?.salary || 'Unpaid',
        stipendValue: stipendVal,
        isPremium: !!(item.is_premium || item.is_premium_internship),
        isPpo: !!item.is_ppo,
        ppoLabel: item.ppo_label_value || 'With job offer',
        postedOn: item.posted_on || 'Recently',
        deadline: item.application_deadline || 'Apply soon',
        expiringIn: item.expiring_in || '',
        labels: item.labels_app_in_card || []
      };
    });
}

/**
 * Fetches internship listings from Internshala search API
 * @returns {Promise<Array>} Promise resolving to list of internships
 */
export async function fetchInternships() {
  try {
    if (!API_URL) {
      throw new Error('API URL is not defined in environment variables.');
    }
    // Attempt standard fetch request
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return processAPIResponse(data);
  } catch (error) {
    console.warn(
      'Failed to fetch from live Internshala API (possibly due to CORS or network issues). Falling back to mock local data.',
      error
    );
    // Fall back to processed local mock data
    return processAPIResponse(MOCK_INTERNSHIPS_DATA);
  }
}

