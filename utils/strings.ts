export function capitalize (str?: string, full: boolean = false) {
  if (!str) return str;
  return !full
    ? str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : str.toUpperCase();
}