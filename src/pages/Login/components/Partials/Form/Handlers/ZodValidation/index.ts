import type { FormGrid } from "../..";
import type { ZodFieldChain } from "./Field";
import type { FormFieldProps, CheckboxProps } from "../../../Form";
import type { ZodOptional, ZodBoolean, ZodDefault } from "zod";

import { z } from 'zod';

import { generateFieldZodValidationChain } from "./Field";

type ZodObjectValidate = ZodFieldChain | ZodDefault<ZodOptional<ZodBoolean>>

export const GenerateZodSchema = (grid: FormGrid) => {
    const object = {} as {[key: string]: ZodObjectValidate};

    const searchValidationsRecursive = (grid: FormGrid) => {
        const children = grid.children;

        if(children) for(const i in children) switch(children[i].type) {
            case 'field':
                const field = children[i].content as FormFieldProps;

                object[field.name as string] = field.validate ? 
                generateFieldZodValidationChain(field.validate, field.masked) :
                z.string().optional();
            break;

            case 'checkbox':
                const checkbox = children[i].content as CheckboxProps;

                object[checkbox.name as string] = z.boolean().optional().default(checkbox.value || false); 
            break;

            case 'container':
                searchValidationsRecursive(children[i].content as FormGrid);
            break;
        }

        return object;
    }

    return z.object(searchValidationsRecursive(grid))
}