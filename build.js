import dts from "bun-plugin-dts";

await Bun.build({
  entrypoints: ["index.ts"],
  outdir: "./dist",
  minify: true,
  naming: "[dir]/[name].mjs",
  plugins: [dts()],
});
