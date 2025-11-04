import { PrimaryButton } from "@/components/atomic/button/PrimaryButton";

export type HeaderButtonConfig = {
  label: string;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary";
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type HeaderButtonGroupProps = {
  buttons: HeaderButtonConfig[];
};

export default function HeaderButtonGroup({ buttons }: HeaderButtonGroupProps) {
  return (
    <header className="w-full border-b border-gray-800 shadow-sm sticky top-0 z-30 py-4">
      <div className="mx-auto px-6 py-4 flex items-center justify-end text-gray-400 h-full gap-1">
        {buttons.map((btn, idx) => (
          <PrimaryButton
            key={idx}
            type={btn.type || "button"}
            color={btn.color || "primary"}
            className={btn.className || "rounded-4xl"}
            size={btn.size || "lg"}
            onClick={btn.onClick as React.MouseEventHandler<Element>}
          >
            {btn.label}
          </PrimaryButton>
        ))}
      </div>
    </header>
  );
}
