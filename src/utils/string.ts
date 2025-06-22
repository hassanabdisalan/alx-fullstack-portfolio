export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}   

export function getUserInitials(user: { Fname?: string | null; Sname?: string | null }): string {
    const initials =
      user?.Fname && user?.Sname
        ? user?.Fname?.charAt(0)?.toUpperCase() +
          user?.Sname?.charAt(0)?.toUpperCase()
        : "N/A";
    return initials;
}
