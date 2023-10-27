/** minimalitic replacement for 'classnames' to join classes */
export function cls(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function numberRange(start, end) {
  return new Array(end - start).fill(null).map((_, i) => i + start);
}

/** async setTimeout */
export async function waitSome(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
