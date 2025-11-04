"use client";
import Image from "next/image";

export default function HeaderDefault() {
  return (
    <header className="w-full border-b border-gray-800  shadow-sm sticky top-0 z-30 h-[66px]">
      <div className="mx-auto px-6 py-4 flex items-center justify-between text-gray-400 h-full">
        <Image src="/logo.svg" width={100} height={40} alt="logo" />
      </div>
    </header>
  );
}
