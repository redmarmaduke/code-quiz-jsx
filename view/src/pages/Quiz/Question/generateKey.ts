/**
 * quickly generate a key for use in React
 * @param {string} prefix
 * @return {string}
 */
export default function generateKey(prefix : string) {
  return `${prefix}-${Date.now()}`;
}
