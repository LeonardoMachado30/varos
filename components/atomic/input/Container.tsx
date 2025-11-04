"use client";

import { ContainerProps } from "@/types/formInput.type";
import React from "react";

export const Container: React.FC<ContainerProps> = ({
  children,
  label,
  orientation = "horizontal",
  id,
  className,
}) => {
  return (
    <div
      className={`${className || ""} flex ${
        orientation === "vertical" ? "flex-col" : "items-center"
      }  gap-2`}
    >
      {label && (
        <label
          htmlFor={id}
          className="block text-[#F2F4F8] font-semibold text-sm text-nowrap"
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};
