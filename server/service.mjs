import { validateInput } from "./validator.mjs";
export const palettes = {
  signal: { warp: "#e9d7b8", weft: "#bd402a", back: "#322920" },
  earth: { warp: "#b8a787", weft: "#354c3d", back: "#e4dcc7" },
  lagoon: { warp: "#9ec8c9", weft: "#334c77", back: "#173743" },
};
export const meta = {
  slug: "urdume",
  title: "URDUME",
  engine: "fets-ajv-weave",
  default_input: {
    weave: "twill",
    columns: 32,
    rows: 28,
    shift: 0,
    palette: "signal",
  },
  palettes,
  presets: [
    {
      name: "Sarja em brasa",
      input: {
        weave: "twill",
        columns: 32,
        rows: 28,
        shift: 0,
        palette: "signal",
      },
    },
    {
      name: "Trama simples",
      input: {
        weave: "plain",
        columns: 24,
        rows: 24,
        shift: 1,
        palette: "earth",
      },
    },
    {
      name: "Cetim azul",
      input: {
        weave: "satin",
        columns: 35,
        rows: 30,
        shift: 2,
        palette: "lagoon",
      },
    },
  ],
  note: "Ligamentos discretos autorais para experimentar. Não representam propriedades físicas, resistência ou especificações industriais de tecido.",
};
export const validate = validateInput;
export function compute(raw) {
  const p = validate(raw),
    matrix = Array.from({ length: p.rows }, (_, y) =>
      Array.from({ length: p.columns }, (_, x) =>
        p.weave === "plain"
          ? +((x + y + p.shift) % 2 === 0)
          : p.weave === "twill"
            ? +((x + y + p.shift) % 4 < 2)
            : +((y * 3 + x + p.shift) % 5 === 0),
      ),
    );
  let longest = 1;
  for (const row of [
    ...matrix,
    ...Array.from({ length: p.columns }, (_, x) => matrix.map((r) => r[x])),
  ]) {
    let run = 1;
    for (let i = 1; i < row.length; i++) {
      run = row[i] === row[i - 1] ? run + 1 : 1;
      longest = Math.max(longest, run);
    }
  }
  return {
    matrix,
    columns: p.columns,
    rows: p.rows,
    colors: palettes[p.palette],
    warp_over: matrix.flat().reduce((a, b) => a + b, 0),
    intersections: p.rows * p.columns,
    longest_float: longest,
    repeat: p.weave === "plain" ? 2 : p.weave === "twill" ? 4 : 5,
  };
}
export function exportResult(input) {
  const r = compute(input),
    unit = 12;
  return {
    type: "image/svg+xml; charset=utf-8",
    extension: "svg",
    text: `<svg xmlns="http://www.w3.org/2000/svg" width="${r.columns * unit}" height="${r.rows * unit}" viewBox="0 0 ${r.columns * unit} ${r.rows * unit}"><title>URDUME · ligamento sintético</title><rect width="100%" height="100%" fill="${r.colors.back}"/>${r.matrix.map((row, y) => row.map((v, x) => `<rect x="${x * unit + 3}" y="${y * unit}" width="6" height="12" fill="${r.colors.warp}"/><rect x="${x * unit}" y="${y * unit + 3}" width="12" height="6" fill="${r.colors.weft}"/>${v ? `<rect x="${x * unit + 3}" y="${y * unit}" width="6" height="12" fill="${r.colors.warp}"/>` : ""}`).join("")).join("")}</svg>`,
  };
}
export const service = { meta, validate, compute, export: exportResult };
