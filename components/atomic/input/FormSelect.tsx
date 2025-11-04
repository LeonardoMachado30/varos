"use client";

// src/components/input/FormSelect.tsx
import { FormSelectProps } from "@/types/formSelect.type";
import { getError } from "@/utils/getError";
import React from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { Container } from "../input/Container";
import { ErrorMessage } from "./ErrorMessage";

export function FormSelect<T extends FieldValues>({
  name,
  selectProps,
  label,
  orientation = "horizontal",
  placeholder,
  value,
  onChange,
  required,
  children,
  onMenuScrollToBottom,
}: FormSelectProps<T> & {
  onMenuScrollToBottom?: (e: React.UIEvent<HTMLDivElement>) => void;
}) {
  const formContext = useFormContext<T>();
  const control = formContext?.control;
  const errors = formContext?.formState?.errors;

  const errorMessage = getError(errors, name);
  const id = selectProps?.id || name.toString();

  const baseClass =
    "shadow appearance-none border rounded py-2 px-3 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline border transition-all duration-200 disabled:opacity-90 bg-[#131516] text-white";
  const errorClass = errorMessage ? "border-red-500" : "border-[#222729]";

  const { classNameContainer, ...otherSelectProps } = selectProps || {};

  const selectClassName = [baseClass, errorClass, otherSelectProps?.className]
    .filter(Boolean)
    .join(" ");

  const SelectWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) =>
    onMenuScrollToBottom ? (
      <div
        style={{ maxHeight: 240, overflowY: "auto" }}
        onScroll={onMenuScrollToBottom}
        tabIndex={-1}
      >
        {children}
      </div>
    ) : (
      <>{children}</>
    );

  const ControlElement = (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: fieldOnChange, onBlur, value: fieldValue, ref },
      }) => (
        <SelectWrapper>
          <select
            ref={ref}
            id={id}
            className={selectClassName}
            value={fieldValue ?? ""}
            onChange={(e) => fieldOnChange(e.target.value)}
            onBlur={onBlur}
            required={required}
            {...otherSelectProps}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
        </SelectWrapper>
      )}
    />
  );

  const SelectInput = (
    <SelectWrapper>
      <select
        id={id}
        className={selectClassName}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        {...otherSelectProps}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </SelectWrapper>
  );

  return (
    <Container
      id={id}
      label={label}
      orientation={orientation}
      className={classNameContainer}
    >
      <div className="relative">
        {control ? ControlElement : SelectInput}
        <ErrorMessage message={errorMessage ?? null} />
      </div>
    </Container>
  );
}
