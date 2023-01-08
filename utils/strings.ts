export function capitalize (str?: string, { full, start }: { full?: boolean, start?: boolean; } = {}) {
  if (!str) return str;
  return !full
    ? !start ? str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : str.charAt(0).toUpperCase() + str.slice(1)
    : str.toUpperCase();
}