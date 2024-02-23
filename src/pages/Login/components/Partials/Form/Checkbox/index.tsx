// React
import React from "react";

// Templates 
import MUICheckboxTemplate from "./Templates/MaterialUI";

// Types
import type {
    ControllerRenderProps,
    ControllerFieldState,
    UseFormStateReturn,
    FieldValues
} from "react-hook-form"

import type { MUICheckboxProps } from "./Templates/MaterialUI";

export type ControllerRenderFunction = ({ field, fieldState, formState, }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
}) => React.ReactElement;

export interface MUICheckboxTemplateProps extends MUICheckboxProps {
    template: 'MUI';
}

export type CheckboxProps = MUICheckboxTemplateProps; 

function Checkbox ({ template, ...props}: CheckboxProps) {
    // Methods
    const handleTemplate = () => {
        switch(template) {
            case 'MUI': return <MUICheckboxTemplate {...props} />
        }
    }

    return handleTemplate();
}

export default Checkbox;