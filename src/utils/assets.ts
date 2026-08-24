export function toAssetUrl(path?: string): string | undefined {
    if (!path) return path;
    return path.startsWith("http") || path.startsWith("/") ? path : `/${path}`;
}
