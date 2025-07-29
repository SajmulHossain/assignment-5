const degToRad = (deg: number) => {
  return (deg * Math.PI) / 180;
};

export const getDistance = (coordinate: number[]) => {
  const radius = 6371;

  const [lat1, lon1, lat2, lon2] = coordinate;

  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((radius * c * 1000).toFixed(2));
};
