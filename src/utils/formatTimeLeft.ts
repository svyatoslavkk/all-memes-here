export const formatTimeLeft = (number: number) => {
  if (number >= 86400) {
    return `${Math.floor(number / 86400)}d`;
  } else if (number >= 3600) {
    return `${Math.floor(number / 3600)}h`;
  } else if (number < 3600 && number >= 60) {
    return `${Math.floor(number / 60)}m`;
  } else if (number < 60) {
    return `${Math.floor(number)}s`;
  }
};