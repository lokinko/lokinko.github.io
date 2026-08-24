import assert from "node:assert/strict";
import test from "node:test";
import remarkTierTags, {
    hueForTag,
    renderTierTags,
} from "../src/utils/remarkTierTags.mjs";

test("the same tag always receives the same hue", () => {
    assert.equal(hueForTag("CCF-A"), hueForTag("ccf-a"));
    assert.equal(hueForTag(" Oral "), hueForTag("oral"));
    assert.notEqual(hueForTag("CCF-A"), hueForTag("CCF-B"));
});

test("multiple tags render as separate, deduplicated badges", () => {
    const html = renderTierTags("CCF-A, Oral, ccf-a");
    assert.match(html, />CCF-A<\/span>/);
    assert.match(html, />Oral<\/span>/);
    assert.equal((html.match(/class="tier-tag"/g) || []).length, 2);
});

test("the remark plugin expands inline tag tokens", () => {
    const tree = {
        type: "root",
        children: [{
            type: "paragraph",
            children: [{ type: "text", value: "Before {{tags: CCF-A, Oral}} after" }],
        }],
    };

    remarkTierTags()(tree);

    assert.deepEqual(tree.children[0].children.map((node) => node.type), [
        "text",
        "html",
        "text",
    ]);
    assert.match(tree.children[0].children[1].value, />CCF-A<\/span>/);
    assert.match(tree.children[0].children[1].value, />Oral<\/span>/);
});
