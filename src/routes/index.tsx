import {randomRgb, rgb2hsl} from "@/lib/hex-generator";
import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useRef} from "react";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const gridDivRef = useRef<HTMLDivElement>(null);

  const createTiles = () => {
    const tiles: HTMLDivElement[] = [];
    const rgb = randomRgb();
    for (let i = 0; i < 9; i++) {
      const tileDiv = document.createElement("div");
      tileDiv.style.width = "10rem";
      tileDiv.style.height = "10rem";
      tileDiv.id = `tile-${i}`;
      tileDiv.className = "hover:scale-98 hover:cursor-pointer";
      const generatedHsl = rgb2hsl(rgb[0], rgb[1], rgb[2], 0)
      tileDiv.style.backgroundColor = `hsl(${generatedHsl[0]} ${generatedHsl[1]} ${generatedHsl[2]})`;
      tiles.push(tileDiv);
    }

    const newColor = rgb2hsl(rgb[0], rgb[1], rgb[2], 30)
    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    randomTile.style.backgroundColor = `hsl(${newColor[0]} ${newColor[1]} ${newColor[2]})`;
    tiles.forEach(tile => {
      gridDivRef.current?.appendChild(tile)
    })

    randomTile.addEventListener("click", () => {
      alert("Good job");
    })
  }

  useEffect(() => {
    createTiles();
  }, [])

  return (
    <section>
      <h1>Color guessing game</h1>

      <div className="grid grid-cols-3 gap-3" ref={gridDivRef}></div>
    </section>
  )
}
