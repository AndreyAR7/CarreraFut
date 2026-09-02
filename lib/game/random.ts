export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sampleN<T>(items: T[], n: number): T[] {
  return shuffle(items).slice(0, Math.min(n, items.length));
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Weighted sample without replacement — used to make a handful of "marquee" items (e.g. Real
// Madrid/Barcelona among every reputation-5 club) noticeably more likely to be picked without
// making them guaranteed.
export function sampleWeighted<T>(items: T[], weightFn: (item: T) => number, n: number): T[] {
  const pool = items.map((item) => ({ item, weight: Math.max(0.0001, weightFn(item)) }));
  const picked: T[] = [];
  for (let i = 0; i < n && pool.length > 0; i++) {
    const total = pool.reduce((sum, p) => sum + p.weight, 0);
    let roll = Math.random() * total;
    let idx = pool.length - 1;
    for (let j = 0; j < pool.length; j++) {
      roll -= pool[j].weight;
      if (roll <= 0) {
        idx = j;
        break;
      }
    }
    picked.push(pool[idx].item);
    pool.splice(idx, 1);
  }
  return picked;
}
