import {randomRgb, rgb2hsl} from "@/lib/hex-generator";
import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const gridDivRef = useRef<HTMLDivElement>(null);
  const [numberOfTimesPlayed, setNumberOfTimesPlayed] = useState<number>(1);
  const hueOffsetRef = useRef<number>(100);

  const createTiles = () => {
    const tiles: HTMLDivElement[] = [];
    const rgb = randomRgb();

    for (let i = 0; i < 9; i++) {
      const tileDiv = document.createElement("div");
      tileDiv.id = `tile-${i}`;
      tileDiv.className = "w-20 h-20 lg:w-40 lg:h-40 hover:scale-98 hover:cursor-pointer transition-all";
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
      if (hueOffsetRef.current == 0 && numberOfTimesPlayed == 50) {
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

      {numberOfTimesPlayed == 50 ? (
        <p className={"w-full text-center text-2xl pt-10"}>You win!</p>

      ) : (
        <div className="grid grid-cols-3 gap-3" ref={gridDivRef}></div>
      )}
      <p className={"w-full text-center text-2xl pt-10"}>Round {numberOfTimesPlayed}</p>
    </section>
  )
}
