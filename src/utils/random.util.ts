let sequence = 0;

export function randomIndex(length: number): number {
  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError('Length must be a positive integer.');
  }

  return Math.floor(Math.random() * length);
}

export function uniqueEmail(prefix = 'user'): string {
  sequence += 1;
  return `${prefix}-${Date.now()}-${sequence}@example.com`;
}
