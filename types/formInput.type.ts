import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IMaskInputProps } from "react-imask";

export type CommonProps<T extends FieldValues> = {
  name: Path<T>;
  errors?: FieldErrors<T>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    classNameContainer?: string;
  };
  maskProps?: Omit<
    IMaskInputProps<any>,
    "name" | "value" | "onChange" | "onAccept" | "ref" | "inputRef"
  >;
  orientation?: "vertical" | "horizontal";
  label?: React.ReactNode | string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;

  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  clear?: boolean;
};

export type FormInputProps<T extends FieldValues> =
  | (CommonProps<T> & { control?: Control<T>; register?: never })
  | (CommonProps<T> & { register: UseFormRegister<T>; control?: never })
  | (CommonProps<T> & { control?: never; register?: never });

export type ContainerProps = {
  orientation?: "vertical" | "horizontal";
  children: React.ReactNode;
  label?: React.ReactNode | string;
  id?: string;
  className?: string;
};
