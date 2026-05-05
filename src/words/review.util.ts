export function getNextReviewDate(reviewCount: number): Date {
  const now = new Date();

  const intervals = [1, 3, 7, 15, 30]; // 天数

  const days = intervals[reviewCount] || 30;

  const next = new Date(now);
  next.setDate(now.getDate() + days);

  return next;
}
