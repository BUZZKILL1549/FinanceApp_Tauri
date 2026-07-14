// src/utils/tauriInvoke.ts
// Safe dynamic loader for Tauri's invoke API. Tries a few common subpaths
// and falls back gracefully if none are available (useful for browser dev).

export async function getInvoke() {
  try {
    const m = await import('@tauri-apps/api/core');
    if (m && typeof (m as any).invoke === 'function') return (m as any).invoke;
  } catch (_) {}
  try {
    const m2 = await import('@tauri-apps/api/tauri');
    if (m2 && typeof (m2 as any).invoke === 'function') return (m2 as any).invoke;
  } catch (_) {}
  try {
    const root = await import('@tauri-apps/api');
    if (root && typeof (root as any).invoke === 'function') return (root as any).invoke;
  } catch (_) {}
  return null;
}

export async function safeInvoke<T = any>(cmd: string, payload?: any): Promise<T> {
  const inv = await getInvoke();
  if (!inv) {
    return Promise.reject(new Error('Tauri invoke unavailable (not running inside Tauri or package unresolved).'));
  }
  return inv(cmd, payload);
}
