import Image from "next/image";
import { cn } from "@/lib/cn";

const wordmarks = {
  english: {
    src: "/img/brand/karuppu-english-wordmark.png",
    alt: "Karuppu",
    width: 1254,
    height: 803,
  },
  tamil: {
    src: "/img/brand/karuppu-tamil-wordmark.png",
    alt: "Karuppu in Tamil",
    width: 979,
    height: 687,
  },
};

export function KaruppuWordmark({
  variant = "english",
  priority = false,
  className,
}: {
  variant?: keyof typeof wordmarks;
  priority?: boolean;
  className?: string;
}) {
  const mark = wordmarks[variant];

  return (
    <Image
      src={mark.src}
      alt={mark.alt}
      width={mark.width}
      height={mark.height}
      priority={priority}
      className={cn("block select-none", className)}
      draggable={false}
    />
  );
}
