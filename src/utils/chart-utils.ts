/**
 * Generate an array of the last four months with default values of 0
 * @(param) number provide the default to initialize the 4 months with.
 * @(param) {Boolean} . Whether to include the year in the month label eg "Jan 2023"
 * Return Array<{name: string, value: number }> an array of months object.
 *
 * @example
 * // Retrun the last 4 months with value of 0 as default
 * getLastFourMonths()
 *
 * @example
 * // Return the last 4 months with default value of 100 and full months names
 * getLastFourMonths(100, true)
 *
 */

export function getLastFourMonths(
  defaultValue: number = 0,
  includeYear: boolean = false,
): Array<{ name: string; value: number }> {
  const months = [];
  const date = new Date();

  for (let i = 3; i >= 0; i--) {
    const tempDate = new Date(date);
    tempDate.setMonth(date.getMonth() - i);

    const monthName = tempDate.toLocaleString("default", {
      month: "short",
      ...(includeYear && { year: "numeric" }),
    });

    months.push({
      name: includeYear ? `${monthName} ${tempDate.getFullYear()}` : monthName,
      value: defaultValue,
    });
  }

  return months;
}
