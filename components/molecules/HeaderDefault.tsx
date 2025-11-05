"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function HeaderDefault() {
  const pathname = usePathname();

  const isClientesActive = pathname?.startsWith("/dashboard/cliente");
  const isConsultoresActive = pathname?.startsWith("/dashboard/consultor");

  return (
    <header className="w-full border-b border-gray-800 shadow-sm sticky top-0 z-30 h-[66px]">
      <div className="mx-auto px-6 py-4 flex items-center justify-between text-gray-400 h-full">
        <Image src="/logo.svg" width={100} height={40} alt="logo" />

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link
                href="/dashboard/cliente"
                className={isClientesActive ? "text-white" : "text-gray-400"}
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/consultor"
                className={isConsultoresActive ? "text-white" : "text-gray-400"}
              >
                Consultores
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
