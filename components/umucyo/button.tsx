import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./icon";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "inverse" | "link";
export type ButtonSize = "sm" | "md" | "lg";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  iconOnly?: boolean;
  full?: boolean;
  href?: string;
  children?: ReactNode;
};

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function buttonClass({
  variant = "secondary",
  size = "md",
  full,
  iconOnly,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  iconOnly?: boolean;
  className?: string;
}) {
  return cx(
    "uc-btn",
    `uc-btn-${variant}`,
    size !== "md" && `uc-btn-${size}`,
    full && "uc-btn-full",
    iconOnly && "uc-iconbtn",
    className,
  );
}

/** Internal routes go through next/link; tel:, mailto:, hashes and external URLs stay plain anchors. */
export function SmartLink({
  href,
  className,
  children,
  ...rest
}: { href: string; className?: string; children?: ReactNode } & Record<string, unknown>) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Button({
  variant = "secondary",
  size = "md",
  icon,
  iconRight,
  iconOnly,
  full,
  href,
  className,
  children,
  type,
  ...rest
}: Props) {
  const cls = buttonClass({ variant, size, full, iconOnly, className });
  const iconSize = size === "lg" ? 20 : 18;
  const kids = (
    <>
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={iconSize} /> : null}
    </>
  );
  if (href) {
    const linkProps: Record<string, unknown> = {};
    for (const key of ["aria-label", "aria-pressed", "title", "style", "onClick"] as const) {
      if (rest[key] !== undefined) linkProps[key] = rest[key];
    }
    return (
      <SmartLink href={href} className={cls} {...linkProps}>
        {kids}
      </SmartLink>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} {...rest}>
      {kids}
    </button>
  );
}
