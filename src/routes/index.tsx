import {randomRgb, rgb2hsl} from "@/lib/hex-generator";
import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const gridDivRef = useRef<HTMLDivElement>(null);
  const [numberOfTimesPlayed, setNumberOfTimesPlayed] = useState<number>(0);
  const hueOffsetRef = useRef<number>(100);

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

    const newColor = rgb2hsl(rgb[0], rgb[1], rgb[2], hueOffsetRef.current)
    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    randomTile.style.backgroundColor = `hsl(${newColor[0]} ${newColor[1]} ${newColor[2]})`;
    tiles.forEach((tile) => {
      gridDivRef.current?.appendChild(tile)
    })

    randomTile.addEventListener("click", () => {
      gridDivRef.current!.innerHTML = "";
      setNumberOfTimesPlayed((prev) => {
        const newCount = prev + 1;
        if (newCount % 5 === 0) {
          hueOffsetRef.current = hueOffsetRef.current - 10;
        }
        return newCount;
      });
      if (hueOffsetRef.current == 0) {
        toast("Congratulations!");
      } else {
        createTiles();
      }
    });
  }

  useEffect(() => {
    createTiles();
  }, [])

  return (
    <section>
      <h1>Color guessing game</h1>

      <div className="grid grid-cols-3 gap-3" ref={gridDivRef}></div>
      <p className={"w-full text-center text-2xl pt-10"}>{numberOfTimesPlayed}</p>
    </section>
  )
}
