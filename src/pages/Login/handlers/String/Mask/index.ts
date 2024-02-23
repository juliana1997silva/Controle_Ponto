// Functions
import { MaskValue as MaskValueFn } from "./MaskValue";
import { UnmaskValue as UnmaskValueFn } from "./UnmaskValue";
import { onChangeMask as OnChangeMaskFn } from "./onChangeMask";

// Types
import type { MaskValueProps as MaskValueConfig } from "./MaskValue";
import type { UnmaskValueProps as UnmaskValueConfig } from "./UnmaskValue";

export const MaskValue = MaskValueFn;
export const UnmaskValue = UnmaskValueFn;
export const onChangeMask = OnChangeMaskFn;

export type MaskValueProps = MaskValueConfig;
export type UnmaskValueProps = UnmaskValueConfig;