export function generatePermutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];
  return arr.flatMap((item, i) =>
    generatePermutations([...arr.slice(0, i), ...arr.slice(i + 1)])
      .map(perm => [item, ...perm])
  );
}
