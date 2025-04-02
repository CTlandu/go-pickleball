import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/go-pickleball-logo.png"
      alt="Go Pickleball Logo"
      width={150}
      height={40}
      priority
      className="h-10 w-auto"
    />
  );
}
