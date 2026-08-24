const TOKEN_PATTERN = /\{\{tags:\s*([^{}]+?)\s*\}\}/gi;

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

export function hueForTag(tag) {
    let hash = 0x811c9dc5;
    for (const character of tag.trim().toLocaleUpperCase("en-US")) {
        hash ^= character.codePointAt(0);
        hash = Math.imul(hash, 0x01000193);
    }

    // Avalanche the hash so similarly named labels (for example CCF-A and
    // CCF-B) do not end up with nearly identical hues.
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x85ebca6b);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 0xc2b2ae35);
    hash ^= hash >>> 16;

    return (hash >>> 0) % 360;
}

export function renderTierTags(rawTags) {
    const seen = new Set();
    const tags = rawTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .filter((tag) => {
            const key = tag.toLocaleUpperCase("en-US");
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

    if (tags.length === 0) return "";

    const badges = tags.map((tag) => {
        const safeTag = escapeHtml(tag);
        return `<span class="tier-tag" style="--tier-hue: ${hueForTag(tag)}">${safeTag}</span>`;
    }).join("");

    return `<span class="tier-tags">${badges}</span>`;
}

function expandText(value) {
    const nodes = [];
    let cursor = 0;

    for (const match of value.matchAll(TOKEN_PATTERN)) {
        const start = match.index;
        if (start > cursor) {
            nodes.push({ type: "text", value: value.slice(cursor, start) });
        }

        const html = renderTierTags(match[1]);
        nodes.push(html
            ? { type: "html", value: html }
            : { type: "text", value: match[0] });
        cursor = start + match[0].length;
    }

    if (cursor < value.length) {
        nodes.push({ type: "text", value: value.slice(cursor) });
    }

    return nodes.length > 0 ? nodes : [{ type: "text", value }];
}

function transformChildren(node) {
    if (!Array.isArray(node.children)) return;

    const children = [];
    for (const child of node.children) {
        if (child.type === "text" && child.value.includes("{{")) {
            children.push(...expandText(child.value));
            continue;
        }

        transformChildren(child);
        children.push(child);
    }

    node.children = children;
}

export default function remarkTierTags() {
    return (tree) => transformChildren(tree);
}
