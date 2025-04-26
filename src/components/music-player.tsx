"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { musicStations } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/store/music-store";
import { CircleIcon, MusicIcon, PauseIcon, PlayIcon } from "lucide-react";
import { Suspense, useEffect } from "react";
import ReactPlayer from "react-player";

const MusicPlayer = () => {
  const {
    isPlaying,
    togglePlay,
    selectedStation,
    setStation,
    volume,
    setVolume,
    isMounted,
    setMounted,
  } = useMusicStore();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="size-8 border outline-2 outline-border outline-offset-2"
          >
            <MusicIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="left"
          className="mr-2 mb-2 w-full space-y-4 rounded-2xl p-1 sm:w-80"
        >
          <div className="flex h-full w-full flex-col space-y-4 rounded-xl border-2 border-border border-dashed p-2">
            <Button
              onClick={togglePlay}
              size="icon"
              variant="secondary"
              className="w-full outline-double outline-2 outline-border outline-offset-2"
            >
              {isPlaying ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </Button>

            {/* Station List */}
            <div className="grid grid-cols-2 gap-3">
              {musicStations.map(({ label, url }) => {
                const isSelected = selectedStation === url;
                return (
                  <div
                    key={url}
                    onClick={() => {
                      setStation(url);
                      if (!isPlaying) togglePlay();
                    }}
                    className={cn(
                      "group cursor-pointer rounded-xl border p-4 text-center text-xs outline-double outline-2 outline-border outline-offset-2 transition",
                      isSelected && "bg-secondary font-medium",
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <CircleIcon
                        className={cn("size-4", isSelected && "fill-current")}
                      />
                      <span className="mt-1">{label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Volume */}
            <div className="space-y-2">
              <div className="text-muted-foreground text-xs">Volume</div>
              <Slider
                value={[volume]}
                onValueChange={(v) => setVolume(v[0])}
                max={1}
                step={0.01}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {isMounted && (
        <Suspense fallback={<div>Loading...</div>}>
          <ReactPlayer
            url={selectedStation}
            playing={isPlaying}
            volume={volume}
            loop
            width="0"
            height="0"
            config={{
              youtube: { playerVars: { controls: 1, start: 1 } },
            }}
          />
        </Suspense>
      )}
    </div>
  );
};

export default MusicPlayer;
