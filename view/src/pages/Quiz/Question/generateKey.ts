export default function generateKey(prefix : string) {
    return `${prefix}-${Date.now()}`;
}
 