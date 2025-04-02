import Image from "next/image";
import { useState } from "react";

export default function Logo() {
  const [error, setError] = useState(false);

  if (error) {
    return <span className="text-xl font-bold text-green-600">GP</span>;
  }

  return (
    <Image
      src="/go-pickleball-logo.png"
      alt="Go Pickleball Logo"
      width={150}
      height={40}
      priority
      className="h-10 w-auto"
      onError={() => setError(true)}
    />
  );
}
