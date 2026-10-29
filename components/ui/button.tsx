import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cx as cn } from "@/lib/cx";

export const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,border-color,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-[0_12px_30px_-12px_rgb(30_99_214/0.75)] hover:from-brand-500 hover:to-brand-600 hover:shadow-[0_16px_40px_-12px_rgb(30_99_214/0.85)]",
        soft: "bg-brandwash text-brand-700 hover:bg-brand-200/60",
        outline: "border border-ink/15 bg-white text-ink hover:border-brand-500 hover:text-brand-700",
        glass:
          "border border-ink/10 bg-white/75 text-ink shadow-[0_8px_24px_-14px_rgb(16_41_74/0.35)] hover:border-brand-500/50 hover:bg-white",
        white: "bg-white text-ink shadow-(--shadow-card) hover:text-brand-700",
        whatsapp: "bg-whatsapp text-white hover:brightness-105",
        link: "h-auto rounded-none px-0 text-brand-600 hover:text-brand-700",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.9375rem]",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  /** Show the animated arrow (default true for primary/link) */
  arrow?: boolean;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

function Inner({ children, icon, arrow }: { children: ReactNode; icon?: ReactNode; arrow?: boolean }) {
  return (
    <>
      {icon ? <span className="-ml-0.5 inline-flex size-[1.15em] items-center justify-center">{icon}</span> : null}
      <span className="relative">{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden
          className="size-[1.05em] transition-transform duration-300 ease-(--ease-out-expo) group-hover/btn:translate-x-1"
        />
      ) : null}
    </>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant, size, className, children, icon, arrow, ...rest } = props;
  const showArrow = arrow ?? (variant === undefined || variant === "primary" || variant === "link");
  // link buttons are inline text links — no height/padding from the size scale
  const classes = cn(buttonVariants({ variant, size: variant === "link" ? null : size }), variant === "link" && "text-sm", className);

  if (typeof rest.href === "string") {
    const { href, ...linkRest } = rest as ButtonAsLink;
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Inner icon={icon} arrow={showArrow}>
            {children}
          </Inner>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        <Inner icon={icon} arrow={showArrow}>
          {children}
        </Inner>
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button className={classes} {...buttonRest}>
      <Inner icon={icon} arrow={showArrow}>
        {children}
      </Inner>
    </button>
  );
}
