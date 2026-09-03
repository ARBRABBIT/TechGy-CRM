/**
 * Date Utility for TechGy CRM Internal
 * Supports parsing multiple date formats and checking if a date falls within
 * preset or custom date ranges.
 */

// Parse various date strings into standard YYYY-MM-DD format or Date object
export function parseDateString(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;

  const trimmed = dateStr.trim();
  if (!trimmed) return null;

  // Format 1: YYYY-MM-DD or YYYY-MM-DD HH:mm...
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return `${y}-${m}-${d}`;
  }

  // Format 2: DD MMM YYYY (e.g., "28 Oct 2024", "10 Dec 2024")
  const textMatch = trimmed.match(/^(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/);
  if (textMatch) {
    const [, day, monthStr, year] = textMatch;
    const months = {
      jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
      jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
    };
    const mKey = monthStr.toLowerCase().slice(0, 3);
    const m = months[mKey] || '01';
    const d = day.padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  return null;
}

// Convert YYYY-MM-DD to timestamp for comparison
function toTimestamp(dateFormattedStr) {
  if (!dateFormattedStr) return null;
  const parts = dateFormattedStr.split('-');
  if (parts.length !== 3) return null;
  return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getTime();
}

/**
 * Filter check: determine if itemDate falls within current filterValue
 * filterValue can be a string (preset) or an object:
 * { type: 'custom', startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', label: '...' }
 */
export function isDateInFilter(dateStr, filterValue) {
  if (!filterValue || filterValue === 'All Time') return true;
  if (!dateStr) return true; // Keep items with unspecified date (e.g. Company Accounts)

  const parsed = parseDateString(dateStr);
  
  // If filter is an object (custom range or custom preset object)
  if (typeof filterValue === 'object' && filterValue !== null) {
    if (filterValue.type === 'custom') {
      if (!parsed) return true; // Keep items with unspecified date
      const itemTs = toTimestamp(parsed);
      if (!itemTs) return true;

      const startTs = filterValue.startDate ? toTimestamp(filterValue.startDate) : null;
      const endTs = filterValue.endDate ? toTimestamp(filterValue.endDate) : null;

      if (startTs && itemTs < startTs) return false;
      if (endTs && itemTs > endTs + (24 * 60 * 60 * 1000 - 1)) return false; // Include full end date day
      return true;
    }
    filterValue = filterValue.preset || filterValue.label || 'All Time';
  }

  // Handle standard string presets
  if (typeof filterValue === 'string') {
    if (filterValue === 'All Time') return true;

    // Check string patterns for mock data compatibility
    const rawLower = (dateStr || '').toLowerCase();

    if (filterValue === 'This Month') {
      if (!parsed) {
        return rawLower.includes('2026-08') || rawLower.includes('2026-09') || rawLower.includes('aug') || rawLower.includes('sep');
      }
      return parsed.startsWith('2026-08') || parsed.startsWith('2026-09');
    }

    if (filterValue === 'This Quarter') {
      if (!parsed) {
        return rawLower.includes('2026-07') || rawLower.includes('2026-08') || rawLower.includes('2026-09') || rawLower.includes('q3');
      }
      return parsed.startsWith('2026-07') || parsed.startsWith('2026-08') || parsed.startsWith('2026-09');
    }

    if (filterValue === 'FY 2025-26') {
      if (!parsed) {
        return rawLower.includes('2025') || rawLower.includes('2026');
      }
      return parsed.startsWith('2025') || parsed.startsWith('2026');
    }

    if (filterValue === 'Last 7 Days') {
      if (!parsed) return true;
      const itemTs = toTimestamp(parsed);
      const refTs = new Date(2026, 8, 2).getTime(); 
      const sevenDaysAgo = refTs - 7 * 24 * 60 * 60 * 1000;
      return itemTs >= sevenDaysAgo && itemTs <= refTs + 86400000;
    }

    if (filterValue === 'Last 30 Days') {
      if (!parsed) return true;
      const itemTs = toTimestamp(parsed);
      const refTs = new Date(2026, 8, 2).getTime(); 
      const thirtyDaysAgo = refTs - 30 * 24 * 60 * 60 * 1000;
      return itemTs >= thirtyDaysAgo && itemTs <= refTs + 86400000;
    }

    if (filterValue === 'Today') {
      if (!parsed) return rawLower.includes('2026-09-02');
      return parsed === '2026-09-02' || parsed === '2026-09-01';
    }

    if (filterValue === 'Yesterday') {
      if (!parsed) return rawLower.includes('2026-09-01');
      return parsed === '2026-09-01';
    }
  }

  return true;
}

// Get user-friendly display string for filter button
export function getFilterLabel(filterValue) {
  if (!filterValue) return 'This Month';
  if (typeof filterValue === 'string') return filterValue;
  if (typeof filterValue === 'object') {
    if (filterValue.label) return filterValue.label;
    if (filterValue.startDate && filterValue.endDate) {
      if (filterValue.startDate === filterValue.endDate) {
        return filterValue.startDate;
      }
      return `${filterValue.startDate} to ${filterValue.endDate}`;
    }
    if (filterValue.startDate) return `From ${filterValue.startDate}`;
    if (filterValue.endDate) return `Until ${filterValue.endDate}`;
  }
  return 'Custom Date';
}
