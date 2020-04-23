export default function importer(path: string): string {
  const parts = path.split('/');
  const last = parts.pop() || parts.pop(); // handle potential trailing slash
  return `/assets/${last}`;
}
