export function isAbsoluteUrl(url: string) {
  return /^[a-z][a-z0-9+.-]*:/.test(url);
}
