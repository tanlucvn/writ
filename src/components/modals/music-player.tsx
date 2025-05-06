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
import { useDialogStore } from "@/store/dialog-store";
import { useMusicStore } from "@/store/music-store";
import {
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SkipBackIcon,
  SkipForwardIcon,
  XIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Checkbox } from "../ui/checkbox";
import DashedContainer from "../ui/dashed-container";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
const LazyReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

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
    customStations,
    addCustomStation,
    previousStation,
    nextStation,
  } = useMusicStore();
  const { isMusicPlayerOpen, setMusicPlayerOpen } = useDialogStore();

  const [newSongLabel, setNewSongLabel] = useState("");
  const [newSongUrl, setNewSongUrl] = useState("");

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  const handleAddCustomSong = () => {
    if (newSongLabel && newSongUrl) {
      addCustomStation(newSongLabel, newSongUrl);
      setNewSongLabel("");
      setNewSongUrl("");
    }
  };

  // Combine default music stations and custom stations
  const allStations = [...musicStations, ...customStations];

  return (
    <Drawer.Root
      direction="right"
      open={isMusicPlayerOpen}
      onOpenChange={setMusicPlayerOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-20 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 z-40 h-full w-full overflow-hidden rounded-none border bg-background p-1 shadow-xl outline-none sm:w-[450px] sm:max-w-md sm:rounded-tl-xl sm:rounded-bl-xl md:max-w-lg">
          <div className="flex h-full w-full flex-col rounded-tl-xl rounded-bl-xl border-2 border-border border-dashed">
            {/* Header */}
            <div className="relative flex flex-col gap-1 px-4 pt-4">
              <p className="font-mono text-muted-foreground text-xs">
                Your personal radio.
              </p>
              <Drawer.Title className="font-medium text-base text-foreground">
                Music Player
              </Drawer.Title>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 size-8"
                onClick={() => setMusicPlayerOpen(false)}
              >
                <XIcon />
              </Button>

              <Separator />
            </div>

            {/* Scrollable Station List */}

            <ScrollArea id="block-scrollarea" className="relative flex-1">
              {/* Ensure room for popover button */}
              <div className="grid grid-cols-2 gap-4 px-4 py-2">
                {allStations.map(({ label, url }) => {
                  const isSelected = selectedStation === url;
                  return (
                    <div
                      key={url}
                      onClick={() => {
                        setStation(url);
                        if (!isPlaying) togglePlay();
                      }}
                      className={cn(
                        "group w-full cursor-pointer rounded-xl border bg-card p-4 text-center text-xs outline-double outline-2 outline-transparent outline-offset-2 transition-all duration-300 hover:bg-secondary",
                        isSelected && "bg-secondary outline-border",
                      )}
                    >
                      <div className="flex w-full flex-col items-center gap-2">
                        <Checkbox
                          checked={isSelected}
                          className={cn(
                            "size-4",
                            isSelected && "!outline-primary",
                          )}
                        />
                        <span className="mt-1 w-28 truncate">{label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Add Station Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 bottom-2 size-8 outline-double outline-2 outline-border outline-offset-2"
                    data-vaul-no-drag
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="mr-2 w-64 p-1" side="left">
                  <DashedContainer className="flex flex-col gap-2 p-2">
                    <Input
                      type="text"
                      value={newSongLabel}
                      onChange={(e) => setNewSongLabel(e.target.value)}
                      placeholder="Song Title"
                      className="text-xs shadow-none placeholder:text-xs"
                    />
                    <Input
                      type="url"
                      value={newSongUrl}
                      onChange={(e) => setNewSongUrl(e.target.value)}
                      placeholder="YouTube URL"
                      className="text-xs shadow-none placeholder:text-xs"
                    />
                    <Button
                      onClick={handleAddCustomSong}
                      size="sm"
                      variant="secondary"
                      className="flex w-full items-center gap-1 text-xs outline-double outline-1 outline-border outline-offset-2"
                    >
                      <PlusIcon className="size-3" />
                      Add Song
                    </Button>
                  </DashedContainer>
                </PopoverContent>
              </Popover>
            </ScrollArea>

            {/* Footer */}
            <div
              className="flex flex-col space-y-4 border-t p-2"
              data-vaul-no-drag
            >
              {/* Volume */}
              <div className="flex flex-col space-y-2">
                <div className="font-mono text-muted-foreground text-xs">
                  Volume
                </div>
                <Slider
                  value={[volume]}
                  onValueChange={(v) => setVolume(v[0])}
                  max={1}
                  step={0.01}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  onClick={previousStation}
                  size="icon"
                  variant="secondary"
                  className="flex-1 outline-double outline-2 outline-border outline-offset-2"
                >
                  <SkipBackIcon className="h-4 w-4" />
                </Button>
                <Button
                  onClick={togglePlay}
                  size="icon"
                  variant="secondary"
                  className="flex-1 outline-double outline-2 outline-border outline-offset-2"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-4 w-4" />
                  ) : (
                    <PlayIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={nextStation}
                  size="icon"
                  variant="secondary"
                  className="flex-1 outline-double outline-2 outline-border outline-offset-2"
                >
                  <SkipForwardIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Drawer.Content>

        <Drawer.Overlay />
      </Drawer.Portal>

      {isMounted && isPlaying && selectedStation && (
        <Suspense fallback={<div>Loading player...</div>}>
          <LazyReactPlayer
            url={selectedStation}
            playing
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
    </Drawer.Root>
  );
};

export default MusicPlayer;
