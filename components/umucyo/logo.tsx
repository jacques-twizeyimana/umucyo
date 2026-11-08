import Image from "next/image";
import Link from "next/link";

const EMBLEM_W = 670.4;
const EMBLEM_H = 732.2;

/** The national coat of arms of Rwanda. Never recolour, crop or redraw it; show it at 32px tall or more. */
export function Emblem({
  size = 44,
  alt = "Coat of arms of Rwanda",
}: {
  size?: number;
  alt?: string;
}) {
  return (
    <Image
      className="uc-logo-emblem"
      src="/coat-of-arms-rwanda.svg"
      width={Math.round((size * EMBLEM_W) / EMBLEM_H)}
      height={size}
      alt={alt}
      priority
      unoptimized
    />
  );
}

/** Site lockup: coat of arms, hairline rule, `umucyo` wordmark and subtitle. Links home. */
export function Logo({
  href = "/",
  size = 44,
  subtitle = "Public procurement",
}: {
  href?: string;
  size?: number;
  subtitle?: string | null;
}) {
  return (
    <Link
      className="uc-logo"
      href={href}
      aria-label="Umucyo, public procurement portal of Rwanda — home"
    >
      <Emblem size={size} alt="" />
      <span className="uc-logo-rule" aria-hidden="true" />
      <span className="uc-logo-word">
        <span className="uc-logo-name">Umucyo</span>
        {subtitle ? <span className="uc-logo-sub">{subtitle}</span> : null}
      </span>
    </Link>
  );
}
