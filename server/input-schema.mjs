export const inputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["weave", "columns", "rows", "shift", "palette"],
  properties: {
    weave: { type: "string", enum: ["plain", "twill", "satin"] },
    columns: { type: "integer", minimum: 12, maximum: 48 },
    rows: { type: "integer", minimum: 12, maximum: 40 },
    shift: { type: "integer", minimum: 0, maximum: 9 },
    palette: { type: "string", enum: ["signal", "earth", "lagoon"] },
  },
};
