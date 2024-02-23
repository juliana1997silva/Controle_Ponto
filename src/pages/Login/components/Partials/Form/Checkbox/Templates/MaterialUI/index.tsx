// React Hook Form
import { Controller } from "react-hook-form";

// MUI
import { Checkbox, FormControlLabel } from "@mui/material";

// Types
import type { Control } from 'react-hook-form';
import type { ControllerRenderFunction } from '../..';

export type MUICheckboxProps = {
    control: Control;
    name: string;
    label?: string;
    value?: boolean;
    transform?: {
        input?: (value: string) => string;
        output: (event: React.ChangeEvent<HTMLInputElement>) => string | number | boolean;
    }

    // MUI Options
    styles?: React.CSSProperties;
}

function MUICheckboxTemplate ({ control, name, label, value, transform, styles }: MUICheckboxProps) {
    const handleInputTranform = () => {
        if(transform) return transform;

        return null;
    }

    const render: ControllerRenderFunction = ({ field, fieldState, formState }) => (
        <FormControlLabel
            label={label}
            control={
                <Checkbox 
                    {...field}
                    defaultChecked={value}

                    onChange={handleInputTranform() ? 
                        (e) => field.onChange(handleInputTranform()?.output(e as React.ChangeEvent<HTMLInputElement>)) :
                        (e) => field.onChange(e.target.checked)
                    }
                    value={
                        handleInputTranform()?.input ?
                        handleInputTranform()?.input?(value) :
                        value : value
                    }

                    sx={styles}
                />
            }
        />
    ) 

    return (
        <Controller 
            control={control}
            name={name}
            render={render}
        />
    )
}

export default MUICheckboxTemplate;