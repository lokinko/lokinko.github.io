const rawIcons = import.meta.glob("./icons/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

export const ICONS = Object.fromEntries(
    Object.entries(rawIcons).map(([filePath, content]) => [
        filePath.replace("./icons/", "").replace(".svg", ""),
        content,
    ]),
);
