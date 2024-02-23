import styled from 'styled-components';

import { CSSProperties } from 'react';

export type FormStyleProps = {
  padding?: CSSProperties['padding'];

  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];

  border?: CSSProperties['border'];
  borderColor?: CSSProperties['borderColor'];
  borderRadius?: CSSProperties['borderRadius'];

  borderTop?: CSSProperties['borderTop'];
  borderRight?: CSSProperties['borderRight'];
  borderBottom?: CSSProperties['borderBottom'];
  borderLeft?: CSSProperties['borderLeftColor'];

  borderTopColor?: CSSProperties['borderTopColor'];
  borderRightColor?: CSSProperties['borderRightColor'];
  borderBottomColor?: CSSProperties['borderBottomColor'];
  borderLeftColor?: CSSProperties['borderLeftColor'];

  borderTopLeftRadius?: CSSProperties['borderTopLeftRadius'];
  borderTopRightRadius?: CSSProperties['borderTopRightRadius'];
  borderBottomLeftRadius?: CSSProperties['borderBottomLeftRadius'];
  borderBottomRightRadius?: CSSProperties['borderBottomRightRadius'];

  background?: CSSProperties['background'];
  boxShadow?: CSSProperties['boxShadow'];
};

export type ContainerStyleProps = {
  flex?: CSSProperties['flex'];
  width?: CSSProperties['width'];

  padding?: CSSProperties['padding'];

  type: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
};

export type ButtonsContainerProps = {
  direction?: CSSProperties['flexDirection'];
};

export const FormEl = styled.form<FormStyleProps>`
  width: 100%;

  padding: ${({ padding }) => (padding ? `${typeof padding === 'number' ? `${padding}px` : padding}` : '20px')};

  display: flex;

  flex-direction: ${({ direction }) => direction ?? 'column'};

  align-items: ${({ align, direction }) =>
    align ??
    `${
      ['column', 'column-reverse'].includes(direction ?? '')
        ? 'flex-start'
        : ['row', 'row-reverse'].includes(direction ?? '')
        ? 'center'
        : 'flex-start'
    }`};

  justify-content: ${({ justify, direction }) =>
    justify ??
    `${
      ['column', 'column-reverse'].includes(direction ?? '')
        ? 'center'
        : ['row', 'row-reverse'].includes(direction ?? '')
        ? 'flex-start'
        : 'center'
    }`};

  gap: ${({ gap }) => (gap ? `${typeof gap === 'number' ? `${gap}px` : gap}` : '4px')};

  ${({ border }) => (border ? `border: ${border}` : '')};
  ${({ borderColor }) => (borderColor ? `border-color: ${borderColor}` : '')};
  border-radius: ${({ borderRadius }) => borderRadius ?? '5px'};

  ${({ borderTop }) => (borderTop ? `border-top: ${borderTop}` : '')};
  ${({ borderRight }) => (borderRight ? `border-right: ${borderRight}` : '')};
  ${({ borderBottom }) => (borderBottom ? `border-bottom: ${borderBottom}` : '')};
  ${({ borderLeft }) => (borderLeft ? `border-left: ${borderLeft}` : '')};
  ${({ borderTopColor }) => (borderTopColor ? `border-top-color: ${borderTopColor}` : '')};
  ${({ borderRightColor }) => (borderRightColor ? `border-right-color: ${borderRightColor}` : '')};
  ${({ borderBottomColor }) => (borderBottomColor ? `border-bottom-color: ${borderBottomColor}` : '')};
  ${({ borderLeftColor }) => (borderLeftColor ? `border-left-color: ${borderLeftColor}` : '')};
  ${({ borderTopLeftRadius }) => (borderTopLeftRadius ? `border-top-left-radius: ${borderTopLeftRadius}` : '')};
  ${({ borderTopRightRadius }) => (borderTopRightRadius ? `border-top-right-radius: ${borderTopRightRadius}` : '')};
  ${({ borderBottomLeftRadius }) => (borderBottomLeftRadius ? `border-bottom-left-radius:${borderBottomLeftRadius}` : '')};
  ${({ borderBottomRightRadius }) => (borderBottomRightRadius ? `border-bottom-right-radius:${borderBottomRightRadius}` : '')};

  background: ${({ background }) => background ?? '#fff'};

  ${({ boxShadow }) => (boxShadow ? `box-shadow: ${boxShadow};` : '')}
`;

export const Container = styled.div<ContainerStyleProps>`
  flex: ${({ flex }) => flex ?? '1'};

  width: ${({ width }) => (width ? `${typeof width === 'number' ? `${width}px` : width}` : '100%')};

  padding: ${({ padding }) => (padding ? `${typeof padding === 'number' ? `${padding}px` : padding}` : '0px')};

  display: flex;

  flex-direction: ${({ type }) => type ?? 'column'};

  align-items: ${({ align, type }) =>
    align ??
    `${
      ['column', 'column-reverse'].includes(type ?? '')
        ? 'flex-start'
        : ['row', 'row-reverse'].includes(type ?? '')
        ? 'center'
        : 'flex-start'
    }`};

  justify-content: ${({ justify, type }) =>
    justify ??
    `${
      ['column', 'column-reverse'].includes(type ?? '') ? 'center' : ['row', 'row-reverse'].includes(type ?? '') ? 'flex-start' : 'center'
    }`};

  gap: ${({ gap }) => (gap ? `${typeof gap === 'number' ? `${gap}px` : gap}` : '4px')};
`;

export const ButtonsContainer = styled.div<ButtonsContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction ?? 'row'};
  gap: 8px;
`;
