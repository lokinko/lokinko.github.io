import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const SCHOLAR_ID = process.env.SCHOLAR_ID || "kzBPdVgAAAAJ";
const PROFILE_URL = `https://scholar.google.com/citations?user=${encodeURIComponent(SCHOLAR_ID)}&hl=en`;
const FALLBACK_URL = process.env.SCHOLAR_FALLBACK_URL
    || `https://cse.bth.se/~fer/googlescholar-api/googlescholar.php?user=${encodeURIComponent(SCHOLAR_ID)}`;
const BIO_PATH = fileURLToPath(new URL("../src/content/bio.md", import.meta.url));
const MARKER = /(<span\s+data-scholar-citations>)([\d,]+)(<\/span>)/;

async function fetchWithTimeout(url, options = {}) {
    return fetch(url, {
        ...options,
        signal: AbortSignal.timeout(30_000),
    });
}

async function fetchFromScholar() {
    const response = await fetchWithTimeout(PROFILE_URL, {
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        },
    });

    if (!response.ok) {
        throw new Error(`Google Scholar returned HTTP ${response.status}`);
    }

    const html = await response.text();
    const match = html.match(
        /<td[^>]*class=["']gsc_rsb_sc1["'][^>]*>[\s\S]*?Citations[\s\S]*?<\/td>\s*<td[^>]*class=["']gsc_rsb_std["'][^>]*>([\d,]+)<\/td>/i,
    );

    if (!match) {
        throw new Error("Citation total was not found in the Scholar profile");
    }

    return Number.parseInt(match[1].replaceAll(",", ""), 10);
}

async function fetchFromFallback() {
    const response = await fetchWithTimeout(FALLBACK_URL);
    if (!response.ok) {
        throw new Error(`Fallback service returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const citations = Number.parseInt(String(data.total_citations), 10);
    if (!Number.isSafeInteger(citations) || citations < 0) {
        throw new Error("Fallback service returned an invalid citation total");
    }

    return citations;
}

async function getLatestCitations() {
    try {
        const citations = await fetchFromScholar();
        return { citations, source: "Google Scholar" };
    } catch (primaryError) {
        console.warn(`Primary lookup failed: ${primaryError.message}`);
        const citations = await fetchFromFallback();
        return { citations, source: "fallback service" };
    }
}

async function main() {
    const bio = await readFile(BIO_PATH, "utf8");
    const cachedMatch = bio.match(MARKER);
    if (!cachedMatch) {
        throw new Error(`Citation marker is missing from ${BIO_PATH}`);
    }

    const cached = Number.parseInt(cachedMatch[2].replaceAll(",", ""), 10);
    const { citations: latest, source } = await getLatestCitations();
    const next = Math.max(cached, latest);

    if (next === cached) {
        console.log(`Citation count remains ${cached} (${source} reported ${latest}).`);
        return;
    }

    const updated = bio.replace(MARKER, `$1${next}$3`);
    await writeFile(BIO_PATH, updated, "utf8");
    console.log(`Updated citation count from ${cached} to ${next} via ${source}.`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
