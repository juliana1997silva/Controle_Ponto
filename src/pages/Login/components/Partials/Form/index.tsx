// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Handlers
import { GenerateZodSchema } from "./Handlers";

// Components
import Checkbox from "./Checkbox";
import FormField from "./FormField";

// Types
import type { ContainerStyleProps, FormStyleProps } from "./styles";

import type { MaskValueProps } from "../../../handlers/String/Mask";
import type { FormFieldProps as FormFieldConfig } from "./FormField";

import type { CheckboxProps as CheckboxConfig } from "./Checkbox";

// Styles
import React from "react";
import { ButtonsContainer, Container, FormEl } from "./styles";

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

export interface FormFieldProps extends Omit<FormFieldConfig, 'control' | 'template'> {
  template?: 'MUI';
  validate?: Validate[];
  masked?: MaskedFormFieldProps;
}

export interface CheckboxProps
  extends Omit<CheckboxConfig, "control" | "template"> {
  template?: "MUI";
}

export interface FormGrid extends ContainerStyleProps {
  children?: (
    | {
        type: "field";
        content: FormFieldProps;
      }
    | {
        type: "checkbox";
        content: CheckboxProps;
      }
    | {
        type: "container";
        content: FormGrid;
      }
  )[];
}

export type FormProps = {
  onSubmit: (data: any) => void;
  formGrid: FormGrid;
  template: "MUI";
  styles?: FormStyleProps;
  buttons?: React.ReactElement | React.ReactElement[];
};

function Form({ onSubmit, formGrid, template, styles, buttons }: FormProps) {
  const resolver = zodResolver(GenerateZodSchema(formGrid));
  const { handleSubmit, control } = useForm({ resolver });

  const handleContainerProps = (formGrid: FormGrid) => ({
    ...formGrid,
    children: undefined,
  });

  const handleChildren = (childs: FormGrid["children"]) => {
    const content: React.ReactNode[] = [];

    childs?.forEach((child, index) => {
      switch (child.type) {
        case "field":
         content.push(
           <FormField key={child.content.name} control={control} {...child.content} template={child.content.template ?? template} />
         );
        break;

        case "checkbox":
          content.push(
            <Checkbox
              key={child.content.name}
              control={control}
              {...child.content}
              template={child.content.template ?? template}
            />
          );
          break;

        case "container":
          content.push(
            <Container
              key={`container-${index}`}
              {...handleContainerProps(child.content)}
            >
              {handleChildren(child.content.children)}
            </Container>
          );
          break;
      }
    });

    return content;
  };
  return (
    <FormEl onSubmit={handleSubmit(onSubmit)} {...styles}>
      <Container {...handleContainerProps(formGrid)}>
        {handleChildren(formGrid.children)}
      </Container>

      <ButtonsContainer>{buttons}</ButtonsContainer>
    </FormEl>
  );
}

export default Form;
