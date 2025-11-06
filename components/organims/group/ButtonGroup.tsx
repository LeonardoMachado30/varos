"use client";

import { useRouter } from "next/navigation";
import HeaderButtonGroup from "./HeaderButtonGroup";

export default function ButtonGroup({ url }: { url: string }) {
  const router = useRouter();

  return (
    <HeaderButtonGroup
      type="consultor"
      buttons={[
        {
          label: "Editar consultor",
          type: "button",
          color: "primary",
          size: "lg",
          onClick: () => router.push(url),
        },
        {
          label: "Remover consultor",
          type: "button",
          color: "secondary",
          size: "lg",
          onClick: () => alert("Remover ainda não implementado"),
        },
      ]}
    />
  );
}
