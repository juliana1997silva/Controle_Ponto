// React
import { useState } from "react";

// Material UI
import { IconButton, InputAdornment, TextField } from "@mui/material";
// -- MUI icons
import { Visibility, VisibilityOff } from "@mui/icons-material";

// React Hook form
import { Controller } from "react-hook-form";

// Handlers
import { MaskValue } from "../../../../../../handlers/String/Mask";

// Types
import React from "react";
import type { Control } from "react-hook-form";
import type { ControllerRenderFunction } from "../..";
import type { MaskValueProps } from "../../../../../../handlers/String/Mask";

export type MUIFormFieldProps = {
  control: Control;
  type?: "text" | "password" | "tel";
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  inputMode?:
    | "search"
    | "text"
    | "tel"
    | "none"
    | "email"
    | "url"
    | "numeric"
    | "decimal";

  masked?: MaskValueProps;

  transform?: {
    input?: (value: string) => string;
    output: (
      event: React.ChangeEvent<HTMLInputElement>
    ) => string | number | boolean;
  };

  // MUI Options
  variant?: "outlined" | "filled" | "standard";
  styles?: React.CSSProperties;
  hug?: boolean;
  startAdornment?: React.ReactNode | string;
  error?: string;
};

function MUIFormFieldTemplate({
  control,
  name,
  type,
  label,
  placeholder,
  inputMode,
  value,

  masked,
  transform,

  variant,
  hug,
  styles,
  startAdornment,
  error,
}: MUIFormFieldProps) {
  // Functionin States
  const [showPassword, setShowPassword] = useState<boolean | undefined>(
    type === "password" ? false : undefined
  );

  const handleMask = (value: string) =>
    MaskValue(value, masked as MaskValueProps) as string;

  const maskedTransform = {
    input: (value: string) => handleMask(value),
    output: (event: React.ChangeEvent<HTMLInputElement>) =>
      handleMask(event.target.value),
  };

  const handleInputTranform = () => {
    if (masked) return maskedTransform;
    if (transform) return transform;

    return undefined;
  };

  const handleInputType = () => {
    switch (type) {
      case "password":
        return showPassword ? "text" : "password";
      default:
        return type;
    }
  };

  const handleEndAdornment = () => {
    const handlePasswordIcon = () =>
      showPassword ? (
        <VisibilityOff sx={{ width: "18px" }} />
      ) : (
        <Visibility sx={{ width: "18px" }} />
      );

    switch (type) {
      case "password":
        return (
          <InputAdornment position="end">
            <IconButton
              type="button"
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {handlePasswordIcon()}
            </IconButton>
          </InputAdornment>
        );

      default:
        return undefined;
    }
  };

  const render: ControllerRenderFunction = ({
    field,
    fieldState,
    formState,
  }) => (
    <TextField
      {...field}
      variant={variant ?? "outlined"}
      label={label}
      type={handleInputType()}
      placeholder={placeholder}
      inputMode={inputMode}
      onChange={
        handleInputTranform()
          ? (e) =>
              field.onChange(
                handleInputTranform()?.output(
                  e as React.ChangeEvent<HTMLInputElement>
                )
              )
          : (e) => field.onChange(e.target.value)
      }
      value={
        handleInputTranform()?.input
          ? handleInputTranform()?.input
            ? field.value ?? value ?? masked?.valuePlaceholder
            : field.value
          : field.value
      }
      style={{
        width: hug ? "fit-content" : "100%",
        fontSize: 9,
        ...styles,
      }}
      error={!!error || fieldState.invalid}
      helperText={(error || fieldState.error?.message) ?? " "}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: handleEndAdornment(),
      }}
    />
  );

  return <Controller control={control} name={name} render={render} />;
}

export default MUIFormFieldTemplate;
