import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  variant?: string;
  isDisabled?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  variant = "input",
  label,
  size: _,
  isDisabled,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      {variant === "input" ? (
        <Input {...field} id={field.name} {...props} isDisabled={isDisabled} />
      ) : (
        <Textarea size="lg" {...field} id={field.name} {...props}></Textarea>
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
