// Zod
import { z } from "zod";

// Mask
import { UnmaskValue } from "../../../../../handlers/String/Mask";

// Types
import type { ZodEffects, ZodOptional, ZodString } from "zod";
import type { MaskValueProps } from "../../../../../handlers/String/Mask";

type Validate =
  | { email: string }
  | { url: string }
  | { emoji: string }
  | { uuid: string }
  | { cuid: string }
  | { cuid2: string }
  | { ulid: string }
  | { required: string }
  | { max: { value: number; message: string } }
  | { min: { value: number; message: string } }
  | { length: { value: number; message: string } }
  | { regex: { value: RegExp; message: string } }
  | { includes: { value: string; message: string } }
  | { startsWith: { value: string; message: string } }
  | { endsWith: { value: string; message: string } }
  | { datetime: { offset?: boolean; precision?: number; message: string } }
  | { ip: { version?: "v4" | "v6"; message: string } }
  | { trim: { message: string } }
  | { toLowerCase: { message: string } }
  | { toUpperCase: { message: string } }
  | { refine: { value: (value: string) => boolean; message: string } }
  | { transform: (value: string) => any };

export interface MaskedFormFieldProps extends MaskValueProps {
  return?: "masked" | "unmasked";
}

export type ZodFieldChain =
  | ZodString
  | ZodOptional<ZodString>
  | ZodEffects<ZodString, string, string>;

export const generateFieldZodValidationChain = (
  validations: Validate[],
  masked?: MaskedFormFieldProps
) => {
  const handleValidation = (chain: ZodFieldChain, validation: Validate) => {
    const key = Object.keys(validation)[0];
    const value = Object.values(validation)[0];

    if (typeof value === "string" && key !== "required")
      chain = (chain as ZodString)[key as "email"](value);
    else if (typeof value === "object")
      if (value.value)
        chain = (chain as ZodString)[key as "max"](value.value, {
          message: value.message,
        });
      else chain = (chain as ZodString)[key as "ip"](value.value);
    else if (typeof value === "function")
      chain = chain[key as "transform"](value) as any;

    return chain;
  };

  const handleZodStringValidationChain = (): ZodFieldChain => {
    const required = validations.find((validation) => {
      const key = Object.keys(validation)[0];
      return key === "required"
        ? (validation as { required: string })[key] ?? true
        : false;
    });

    const errorMessage =
      required &&
      typeof (required as { required: string } | boolean) !== "boolean"
        ? (required as { required: string }).required
        : "Campo obrigatório.";

    let chain: ZodFieldChain = z.string({ required_error: errorMessage });

    if (masked?.return === "unmasked")
      chain = chain["transform"]((value) => UnmaskValue(value, masked));

    for (const i in validations)
      chain = handleValidation(chain, validations[i]);

    if (required)
      chain = chain["refine"]((value) => value?.trim() !== "", {
        message: errorMessage,
      }) as ZodFieldChain;
    else chain = chain["optional"]() as ZodFieldChain;

    return chain;
  };

  return handleZodStringValidationChain();
};
