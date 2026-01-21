export const hexColorGenerator = (offset: number = 0) => {
  const r = Math.floor(Math.random() * (255 - offset));
  const g = Math.floor(Math.random() * (255 - offset));
  const b = Math.floor(Math.random() * (255 - offset));

  return "#" + componentToHexColor(r) + componentToHexColor(g) + componentToHexColor(b);
}

export const randomRgb = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return [r, g, b];
}

const componentToHexColor = (component: number) => {
  const hex = component.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgb2hsl(r: number, g: number, b: number, hueOffset: number = 0) {
  r = r / 255
  g = g / 255
  b = b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let lum = (max + min) / 2;
  let hue = 0;
  let sat = 0;
  if (max != min) {
    const c = max - min;
    sat = c / (1 - Math.abs(2 * lum - 1));
    switch (max) {
      case r:
        hue = (g - b) / c + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / c + 2;
        break;
      case b:
        hue = (r - g) / c + 4;
        break;
    }
  }
  hue = Math.round(hue * 60) + hueOffset;
  sat = Math.round(sat * 100);
  lum = Math.round(lum * 100);

  return [hue, sat + '%', lum + '%'];
}