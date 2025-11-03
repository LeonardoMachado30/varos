import { ContainerProps } from "@/types/formInput.type";

export const Container: React.FC<ContainerProps> = ({
  children,
  label,
  id,
  className,
}) => (
  <div className={`${className || ""}`}>
    {label && (
      <label
        htmlFor={id}
        className="block text-gray-600 mb-1 font-semibold text-sm"
      >
        {label}
      </label>
    )}
    {children}
  </div>
);
