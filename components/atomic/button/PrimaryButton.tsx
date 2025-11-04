"use client";
import Link from "next/link";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "font-medium rounded-md flex gap-2 items-center justify-center transition-all duration-200 active:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50",
  variants: {
    color: {
      primary: "bg-[#1B3F1B] text-[#00F700] hover:bg-[#155c15]",
      secondary: "bg-purple-500 text-white hover:bg-purple-600",
    },
    size: {
      sm: "text-sm px-3 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-3",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof button>;

export type PrimaryButtonProps = ButtonVariants & {
  children?: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  loading = false,
  icon,
  className,
  disabled,
  href,
  onClick,
  type = "button",
  color,
  size,
  ...rest
}) => {
  const classes = button({ color, size, className });

  const content = (
    <>
      {icon}
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={loading || disabled ? undefined : onClick}
        aria-disabled={loading || disabled}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={loading || disabled}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};

export const PrimaryButtonWithMoreIcon: React.FC<PrimaryButtonProps> = ({
  children = "Mais opções",
  ...props
}) => (
  <PrimaryButton
    icon={
      <span className="material-icons" style={{ fontSize: 20 }}>
        more_vert
      </span>
    }
    {...props}
  >
    {children}
  </PrimaryButton>
);

export { PrimaryButton };
