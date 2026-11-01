import { mount } from "svelte";
import App from "./App.svelte";
import { canvasStage } from "./canvas";
import { motionToggle } from "./client";
let cached: any, texture: HTMLCanvasElement;
const stage = canvasStage(
  document.querySelector<HTMLCanvasElement>("#cloth")!,
  (ctx, w, h, t, r) => {
    ctx.clearRect(0, 0, w, h);
    if (!r) return;
    if (cached !== r) {
      cached = r;
      texture = document.createElement("canvas");
      texture.width = r.columns * 16;
      texture.height = r.rows * 16;
      const c = texture.getContext("2d")!;
      c.fillStyle = r.colors.back;
      c.fillRect(0, 0, texture.width, texture.height);
      for (let y = 0; y < r.rows; y++)
        for (let x = 0; x < r.columns; x++) {
          const warp = () => {
            const g = c.createLinearGradient(x * 16 + 2, 0, x * 16 + 14, 0);
            g.addColorStop(0, "#0009");
            g.addColorStop(0.25, r.colors.warp);
            g.addColorStop(0.55, r.colors.warp);
            g.addColorStop(1, "#0007");
            c.fillStyle = g;
            c.fillRect(x * 16 + 2, y * 16, 12, 16);
          };
          const weft = () => {
            const g = c.createLinearGradient(0, y * 16 + 2, 0, y * 16 + 14);
            g.addColorStop(0, "#0009");
            g.addColorStop(0.35, r.colors.weft);
            g.addColorStop(0.6, r.colors.weft);
            g.addColorStop(1, "#0008");
            c.fillStyle = g;
            c.fillRect(x * 16, y * 16 + 2, 16, 12);
          };
          if (r.matrix[y][x]) {
            weft();
            warp();
          } else {
            warp();
            weft();
          }
          c.fillStyle = "#fff2";
          c.fillRect(x * 16 + 4, y * 16 + 4, 1, 9);
        }
    }
    const scale = Math.min(w / texture.width, h / texture.height) * 0.83,
      x = (w - texture.width * scale) / 2,
      y = (h - texture.height * scale) / 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = "#27120a66";
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 20;
    ctx.drawImage(texture, 0, 0, texture.width * scale, texture.height * scale);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    const tw = texture.width * scale,
      th = texture.height * scale,
      shine = ((t * 0.025) % (tw + 140)) - 140,
      g = ctx.createLinearGradient(shine, 0, shine + 140, th);
    g.addColorStop(0, "#fff0");
    g.addColorStop(0.5, "#fff2");
    g.addColorStop(1, "#fff0");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, tw, th);
    const row = (t * 0.0006) % r.rows,
      scan = y + row * 16 * scale;
    ctx.restore();
    if (t) {
      ctx.strokeStyle = "#c14227";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 15, scan);
      ctx.lineTo(x + tw + 15, scan);
      ctx.stroke();
      const shuttle = x + (Math.sin(t * 0.0015) * 0.5 + 0.5) * tw;
      ctx.fillStyle = "#f3bd79";
      ctx.beginPath();
      ctx.ellipse(shuttle, scan, 36, 8, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#672b16";
      ctx.stroke();
    }
  },
);
window.addEventListener("urdume:result", (e) =>
  stage.set((e as CustomEvent).detail),
);
const target = document.querySelector("#app-root")!;
target.replaceChildren();
mount(App, { target });
motionToggle((v) => stage.pause(v));
if (new URL(location.href).searchParams.has("record"))
  document.querySelector("#controls")?.scrollIntoView();
