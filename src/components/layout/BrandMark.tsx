import Image from "next/image";

/** Geometric E mark only — scales cleanly at large sizes */
const MARK_SRC = "/images/branding/EMAGINE_64_64 icon-02.svg";

const sizes = {
  nav: {
    mark: "h-12 w-12 md:h-14 md:w-14",
    name: "text-2xl md:text-[1.75rem]",
    studio: "text-[10px] md:text-[11px]",
    gap: "gap-3",
  },
  hero: {
    mark: "h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24",
    name: "text-4xl md:text-5xl lg:text-6xl",
    studio: "text-xs md:text-sm",
    gap: "gap-4 md:gap-5",
  },
  footer: {
    mark: "h-12 w-12 md:h-14 md:w-14",
    name: "text-2xl md:text-3xl",
    studio: "text-[10px] md:text-xs",
    gap: "gap-3",
  },
  admin: {
    mark: "h-10 w-10",
    name: "text-xl",
    studio: "text-[9px]",
    gap: "gap-2.5",
  },
} as const;

type BrandMarkProps = {
  variant?: "onLight" | "onDark";
  size?: keyof typeof sizes;
  withStudio?: boolean;
  className?: string;
  priority?: boolean;
};

export default function BrandMark({
  variant = "onLight",
  size = "nav",
  withStudio = true,
  className = "",
  priority = false,
}: BrandMarkProps) {
  const dim = sizes[size];
  const onDark = variant === "onDark";
  const invert = onDark ? "brightness-0 invert" : "";

  return (
    <span className={`inline-flex items-center ${dim.gap} ${className}`}>
      <Image
        src={MARK_SRC}
        alt=""
        width={96}
        height={96}
        priority={priority}
        aria-hidden
        className={`${dim.mark} object-contain shrink-0 ${invert}`}
        unoptimized
      />
      <span className="flex flex-col leading-none min-w-0">
        <span
          className={`font-serif font-semibold tracking-[-0.02em] ${dim.name} ${
            onDark ? "text-[#FBFBFA]" : "text-[var(--text-primary)]"
          }`}
        >
          Emagine
        </span>
        {withStudio && (
          <span
            className={`uppercase tracking-[0.28em] font-semibold mt-1.5 md:mt-2 ${dim.studio} ${
              onDark
                ? "text-[var(--accent-gold-bright)]"
                : "text-[var(--accent-gold)]"
            }`}
          >
            Design Studio
          </span>
        )}
      </span>
    </span>
  );
}
