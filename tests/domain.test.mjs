import { test } from "node:test";
import assert from "node:assert/strict";
import { service } from "../server/service.mjs";

test("plain weave alternates across both axes", () => {
  const r = service.compute({ ...service.meta.default_input, weave: "plain" });
  for (let y = 0; y < r.rows; y++)
    for (let x = 0; x < r.columns; x++) {
      assert.equal(r.matrix[y][x], +((x + y) % 2 === 0));
    }
});
test("satin repeat has one raised warp in every five samples", () => {
  const r = service.compute({
    ...service.meta.default_input,
    weave: "satin",
    columns: 35,
  });
  for (const row of r.matrix)
    for (let x = 0; x < 35; x += 5)
      assert.equal(
        row.slice(x, x + 5).reduce((s, v) => s + v, 0),
        1,
      );
});
test("shift is periodic and deterministic", () => {
  const p = { ...service.meta.default_input, weave: "twill", shift: 1 };
  assert.deepEqual(service.compute(p), service.compute(p));
  assert.deepEqual(
    service.compute(p).matrix,
    service.compute({ ...p, shift: 5 }).matrix,
  );
});
test("presets return a bounded binary matrix and exact intersection count", () => {
  for (const p of service.meta.presets) {
    const r = service.compute(p.input);
    assert.equal(r.matrix.length, p.input.rows);
    assert.equal(r.matrix.flat().length, r.intersections);
    assert.ok(r.matrix.flat().every((v) => v === 0 || v === 1));
  }
});
test("real SVG export contains only bounded original geometry", () => {
  const e = service.export(service.meta.default_input);
  assert.equal(e.extension, "svg");
  assert.match(e.text, /<svg xmlns=/);
  assert.ok(!e.text.includes("<script"));
  assert.ok(!e.text.includes("http", e.text.indexOf(">") + 1));
});
test("unknown palette invalid range and extra fields rejected", () => {
  for (const x of [
    { palette: "url(evil)" },
    { columns: 49 },
    { rows: 0 },
    { shift: 1.5 },
    { extra: true },
  ])
    assert.throws(() =>
      service.compute({ ...service.meta.default_input, ...x }),
    );
});
