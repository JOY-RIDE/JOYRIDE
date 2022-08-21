export function calculateRemainingDays(startDate: Date, endDate: Date) {
  if (startDate > endDate) {
    throw new Error();
  }
  return Math.trunc(
    (Number(endDate) - Number(startDate)) / 1000 / 60 / 60 / 24
  );
}
