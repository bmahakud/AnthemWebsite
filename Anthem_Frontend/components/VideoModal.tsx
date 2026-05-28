"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Play, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button
          size="lg"
          variant="anthem"
          className="rounded-full h-14 px-10 text-lg font-medium shadow-lg group"
        >
          Watch Demo
          <Play className="ml-2 size-5 group-hover:scale-110 transition-transform" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-w-4xl w-full translate-x-[-50%] translate-y-[-50%] bg-black border-none overflow-hidden">
          <div className="relative pt-[56.25%]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <Loader2 className="size-10 text-white animate-spin" />
              </div>
            )}
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
              autoPlay
              playsInline
              muted
              onLoadedData={() => setIsLoading(false)}
            >
              <source src="/Hero Section Video/Anthem Global.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-3 -right-3 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full size-10 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </div>
          <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white/80 text-sm text-center">
              Anthem Global - Transforming Data into Intelligent Solutions
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}