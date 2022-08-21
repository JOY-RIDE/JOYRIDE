export function calculateRemainingDays(startDate: Date, endDate: Date) {
  if (startDate > endDate) {
    throw new Error();
  }
  return Math.round(
    (Number(endDate) - Number(startDate)) / 1000 / 60 / 60 / 24
  );
}
