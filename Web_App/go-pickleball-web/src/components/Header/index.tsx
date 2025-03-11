"use client";
import Link from "next/link";
import Logo from "@/components/Logo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-center h-12 px-4">
        <Link href="/" className="flex items-center gap-2">
          <h1
            className="text-xl font-bold"
            style={{
              background: "linear-gradient(45deg, #40B37C 30%, #F7D794 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Go Pickleball!
          </h1>
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default Header;
