import { Contact } from 'react-native-contacts';

// Regex helpers
const isEnglish = (text: string) => /^[A-Za-z]/.test(text);
const isHindi = (text: string) => /[\u0900-\u097F]/.test(text);
const isNumber = (text: string) => /^[+0-9]/.test(text);
const isSpecial = (text: string) =>
  !isEnglish(text) && !isHindi(text) && !isNumber(text);

// Priority order
const getPriority = (name: string) => {
  if (isEnglish(name)) return 1;
  if (isHindi(name)) return 2;
  if (isSpecial(name)) return 3;
  if (isNumber(name)) return 4;
  return 5;
};

export const sortContactsSmart = (contacts: Contact[]) => {
  return [...contacts].sort((a, b) => {
    const nameA = a.displayName?.trim() || '';
    const nameB = b.displayName?.trim() || '';

    const priorityA = getPriority(nameA);
    const priorityB = getPriority(nameB);

    // 🔥 First sort by priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // 🔤 If same category → alphabetical
    return nameA.localeCompare(nameB, 'en', { sensitivity: 'base' });
  });
};