import { MOCK_INTERNSHIPS_DATA } from './mockData';

const API_URL = import.meta.env.VITE_API_URL;

export function processAPIResponse(data) {
  const { internships_meta, internship_ids } = data;
  if (!internship_ids || !internships_meta) {
    return [];
  }

  return internship_ids
    .map(id => Object.prototype.hasOwnProperty.call(internships_meta, id) ? Reflect.get(internships_meta, id) : null)
    .filter(Boolean)
    .map(item => {
      const stipendVal = item.stipend?.salaryValue1 || 0;
      const isWFH = item.work_from_home || false;

      return {
        id: item.id,
        title: item.title || 'Internship',
        company: item.company_name || 'Company',
        companyLogo: item.company_logo ? `https://internshala.com/uploads/logo/${item.company_logo}` : null,
        profile: item.profile_name || 'Other',
        isWorkFromHome: isWFH,
        isPartTime: !!(item.part_time || item.is_part_time),
        locations: item.location_names && item.location_names.length > 0
          ? item.location_names
          : (isWFH ? ['Work From Home'] : ['Office']),
        startDate: item.start_date || 'Starts Immediately',
        duration: item.duration || 'Flexible',
        durationMonths: item.duration ? parseInt(item.duration) || 1 : 1,
        stipendText: item.stipend?.salary || 'Unpaid',
        stipendValue: stipendVal,
        isPremium: !!(item.is_premium || item.is_premium_internship),
        isPpo: !!item.is_ppo,
        ppoLabel: item.ppo_label_value || 'With job offer',
        postedOn: item.posted_on || 'Recently',
        deadline: item.application_deadline || 'Apply soon',
        expiringIn: item.expiring_in || '',
        labels: item.labels_app_in_card || [],
        activelyHiring: !!(item.is_actively_hiring || item.actively_hiring),
        isEarlyApplicant: !!(item.is_early_applicant || item.early_applicant),
        skills: item.skill_sets ? item.skill_sets.map(s => s.skill || s).filter(Boolean) : [],
        about: item.about_internship || item.description || '',
      };
    });
}

export async function fetchInternships() {
  try {
    if (!API_URL) {
      throw new Error('API URL is not defined in environment variables.');
    }
    
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return processAPIResponse(data);
  } catch (error) {
    console.warn('Failed to fetch from live API. Falling back to mock local data.', error);
    return processAPIResponse(MOCK_INTERNSHIPS_DATA);
  }
}
