export function getSuffixDate() {
  const date = new Date();
  const sec = date.getSeconds();
  const min = date.getMinutes();
  const hour = date.getHours();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return ` ${day}-${month}-${year}--${hour}:${min}:${sec}`;
}

// ...existing code...

/**
 * Format a date as DD-MM-YYYY, safely handling invalid dates
 * @param dateString The date to format (string, number, or Date object)
 * @returns Formatted date string or fallback for invalid dates
 */
export const formatDateDDMMYY = (
  dateString: string | number | Date,
): string => {
  if (!dateString) return "--/--/----";

  try {
    const date = new Date(dateString);

    // Check if date is invalid
    if (isNaN(date.getTime())) {
      return "--/--/----";
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch (error) {
    return "--/--/----";
  }
};


// export function parseMonth(){
  // new Date(item.month).toLocaleString("default", { month: "short" });
// }
