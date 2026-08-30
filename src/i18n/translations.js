// Modular translation layer. Add a language by adding a key here —
// no component code needs to change.
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'हिंदी' },
]

const dict = {
  en: {
    nav_dashboard: 'Dashboard', nav_queue: 'My Queue', nav_book: 'Book Slot', nav_procurement: 'Procurement',
    nav_payments: 'Payments', nav_history: 'History', nav_notifications: 'Notifications', nav_grievances: 'Grievances',
    nav_assistant: 'Kisan Sahayak', nav_profile: 'Profile', nav_centres: 'Find Centre',
    greeting: 'Namaste', today_procurement: "Today's Procurement", token: 'Token', queue_position: 'Queue position',
    farmers_ahead: 'Farmers ahead', est_wait: 'Estimated waiting time', expected_turn: 'Expected turn',
    centre: 'Procurement Centre', status: 'Status', waiting: 'Waiting', view_live_queue: 'View Live Queue',
    get_directions: 'Get Directions', reschedule: 'Reschedule Slot', contact_centre: 'Contact Centre',
    disclaimer: 'Prototype developed for Smart India Hackathon 2026 — SIH26032. This application is a demonstration and is not an official Government of India portal.',
  },
  kn: {
    nav_dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', nav_queue: 'ನನ್ನ ಸರದಿ', nav_book: 'ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ', nav_procurement: 'ಖರೀದಿ',
    nav_payments: 'ಪಾವತಿಗಳು', nav_history: 'ಇತಿಹಾಸ', nav_notifications: 'ಅಧಿಸೂಚನೆಗಳು', nav_grievances: 'ದೂರುಗಳು',
    nav_assistant: 'ಕಿಸಾನ್ ಸಹಾಯಕ', nav_profile: 'ಪ್ರೊಫೈಲ್', nav_centres: 'ಕೇಂದ್ರ ಹುಡುಕಿ',
    greeting: 'ನಮಸ್ತೆ', today_procurement: 'ಇಂದಿನ ಖರೀದಿ', token: 'ಟೋಕನ್', queue_position: 'ಸರದಿ ಸ್ಥಾನ',
    farmers_ahead: 'ಮುಂದೆ ಇರುವ ರೈತರು', est_wait: 'ಅಂದಾಜು ಕಾಯುವ ಸಮಯ', expected_turn: 'ನಿರೀಕ್ಷಿತ ಸರದಿ',
    centre: 'ಖರೀದಿ ಕೇಂದ್ರ', status: 'ಸ್ಥಿತಿ', waiting: 'ಕಾಯುತ್ತಿದೆ', view_live_queue: 'ಲೈವ್ ಸರದಿ ವೀಕ್ಷಿಸಿ',
    get_directions: 'ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ', reschedule: 'ಸ್ಲಾಟ್ ಮರುನಿಗದಿ', contact_centre: 'ಕೇಂದ್ರ ಸಂಪರ್ಕಿಸಿ',
    disclaimer: 'ಸ್ಮಾರ್ಟ್ ಇಂಡಿಯಾ ಹ್ಯಾಕಥಾನ್ 2026 — SIH26032 ಗಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾದ ಪ್ರೋಟೋಟೈಪ್. ಇದು ಅಧಿಕೃತ ಭಾರತ ಸರ್ಕಾರದ ಪೋರ್ಟಲ್ ಅಲ್ಲ.',
  },
  hi: {
    nav_dashboard: 'डैशबोर्ड', nav_queue: 'मेरी कतार', nav_book: 'स्लॉट बुक करें', nav_procurement: 'खरीद',
    nav_payments: 'भुगतान', nav_history: 'इतिहास', nav_notifications: 'सूचनाएं', nav_grievances: 'शिकायतें',
    nav_assistant: 'किसान सहायक', nav_profile: 'प्रोफ़ाइल', nav_centres: 'केंद्र खोजें',
    greeting: 'नमस्ते', today_procurement: 'आज की खरीद', token: 'टोकन', queue_position: 'कतार स्थिति',
    farmers_ahead: 'आगे किसान', est_wait: 'अनुमानित प्रतीक्षा समय', expected_turn: 'अपेक्षित बारी',
    centre: 'खरीद केंद्र', status: 'स्थिति', waiting: 'प्रतीक्षारत', view_live_queue: 'लाइव कतार देखें',
    get_directions: 'दिशा प्राप्त करें', reschedule: 'स्लॉट पुनर्निर्धारित करें', contact_centre: 'केंद्र से संपर्क करें',
    disclaimer: 'स्मार्ट इंडिया हैकाथॉन 2026 — SIH26032 के लिए विकसित प्रोटोटाइप। यह एक प्रदर्शन है और आधिकारिक भारत सरकार पोर्टल नहीं है।',
  },
}

export function t(lang, key) {
  return dict[lang]?.[key] ?? dict.en[key] ?? key
}
