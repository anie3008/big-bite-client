import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/bigbite-logo.png"
        alt="BigBite"
        width={160}
        height={50}
        priority
      />
    </Link>
  );
}