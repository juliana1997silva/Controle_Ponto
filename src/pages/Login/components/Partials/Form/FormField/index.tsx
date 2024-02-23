// React
import React from "react";

// Templates 
import MUIFormFieldTemplate from "./Templates/MaterialUI";

// Types
import type {
    ControllerRenderProps,
    ControllerFieldState,
    UseFormStateReturn,
    FieldValues
} from "react-hook-form"

import type { MUIFormFieldProps } from "./Templates/MaterialUI";

export type ControllerRenderFunction = ({ field, fieldState, formState, }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
}) => React.ReactElement;

export interface MUIFormFieldTemplateProps extends MUIFormFieldProps {
    template: 'MUI';
}

export type FormFieldProps = MUIFormFieldTemplateProps; 

function FormField ({ template, ...props}: FormFieldProps) {
    // Methods
    const handleTemplate = () => {
        switch(template) {
            case 'MUI': return <MUIFormFieldTemplate {...props} />
        }
    }

    return handleTemplate();
}

export default FormField;