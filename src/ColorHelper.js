import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(currentPalette) {
  let newPalette = {
    paletteName: currentPalette.paletteName,
    id: currentPalette.id,
    emoji: currentPalette.emoji,
    colors: {},
  };
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of currentPalette.colors) {
    let scale = generateScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }
  return newPalette;
}
function getRange(hex) {
  const end = `#fff`;
  return [chroma(hex).darken(1.4).hex(), hex, end];
}

function generateScale(hex, number) {
  return chroma.scale(getRange(hex)).mode("lab").colors(number);
}

export { generatePalette };
