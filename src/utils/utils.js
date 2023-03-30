export const milisecondsToTime = (ms) => {
  const dayFactor = 1000 * 60 * 60 * 8;
  const hourFactor = 1000 * 60 * 60;
  const minuteFactor = 1000 * 60;
  const secondFactor = 1000;

  const days = Math.round(10 * ms / dayFactor) / 10;
  const hours = Math.floor(ms / hourFactor);
  const minutes = Math.floor((ms - hours * hourFactor) / minuteFactor);
  const seconds = Math.floor(
    (ms - hours * hourFactor - minutes * minuteFactor) / secondFactor
  );
  return `${hours}:${minutes}:${seconds} (${days}d)`;
};

export const milisecondsToSize = (ms) => {
  const sizes = {
    XS: 1000 * 60 * 60 * 8,
    S: 1000 * 60 * 60 * 16,
    M: 1000 * 60 * 60 * 32,
    L: 1000 * 60 * 60 * 40,
  };
  if (ms < sizes.XS) return 'XS';
  if (ms < sizes.S) return 'S';
  if (ms < sizes.M) return 'M';
  if (ms < sizes.L) return 'L';
  return 'XL';
};

export const formatDate = (date) => {
  return date.toLocaleDateString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};