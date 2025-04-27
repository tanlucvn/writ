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
import { CircleIcon, PauseIcon, PlayIcon, PlusIcon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Drawer } from "vaul";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

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
        <Drawer.Content className="fixed right-0 bottom-0 z-40 h-full w-[450px] max-w-xs overflow-hidden rounded-tl-xl rounded-bl-xl border bg-background p-1 shadow-xl outline-none sm:max-w-md md:max-w-lg">
          <div className="flex h-full w-full flex-col rounded-tl-xl rounded-bl-xl border-2 border-border border-dashed">
            <div className="flex h-full w-full flex-1 flex-col overflow-hidden">
              <div className="flex flex-col gap-1 p-4">
                <p className="font-mono text-muted-foreground text-xs">
                  Your personal radio.
                </p>
                <Drawer.Title className="font-medium text-base text-foreground">
                  Music Player
                </Drawer.Title>
              </div>

              <div className="h-full flex-1 overflow-hidden">
                <ScrollArea className="relative flex h-full flex-col space-y-2 px-2">
                  <div className="grid grid-cols-2 gap-4 p-2">
                    {allStations.map(({ label, url }) => {
                      const isSelected = selectedStation === url;
                      return (
                        <div
                          key={url}
                          onClick={() => {
                            setStation(url);
                            if (!isPlaying) togglePlay();
                          }}
                          className={`group cursor-pointer rounded-xl border p-4 text-center text-xs outline-double outline-2 outline-border outline-offset-2 transition ${
                            isSelected && "bg-secondary"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <CircleIcon
                              className={cn(
                                "size-4 rounded-full stroke-border outline-double outline-2 outline-border outline-offset-2",
                                isSelected && "fill-current",
                              )}
                            />
                            <span className="mt-1">{label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 bottom-2 size-8 outline-double outline-2 outline-border outline-offset-2"
                      >
                        <PlusIcon className="size-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="mr-2 w-64 rounded-2xl p-1"
                      side="left"
                    >
                      <div className="flex h-full w-full flex-col space-y-2 rounded-xl border-2 border-border border-dashed p-2">
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
                          onClick={() => {
                            handleAddCustomSong();
                          }}
                          size="sm"
                          variant="secondary"
                          className="flex w-full items-center gap-1 text-xs outline-double outline-1 outline-border outline-offset-2"
                        >
                          <PlusIcon className="size-3" />
                          Add Song
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </ScrollArea>
              </div>
            </div>

            <div
              className="flex flex-col space-y-4 border-t-2 border-dashed p-2"
              data-vaul-no-drag
            >
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
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>

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
    </Drawer.Root>
  );
};

export default MusicPlayer;
