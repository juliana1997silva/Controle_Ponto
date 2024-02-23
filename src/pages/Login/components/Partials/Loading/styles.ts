import styled from 'styled-components';

type SpinnerProps = {
    size?: number | string;
}

export const Spinner = styled.span<SpinnerProps>`
    width: ${({ size }) => {
        if(size) return typeof size === 'number' ? `${size}px` : size;
        else return '24px';
    }};

    height: ${({ size }) => {
        if(size) return typeof size === 'number' ? `${size}px` : size;
        else return '24px';
    }};

        
    border: ${({ size }) => {
        if(size) return typeof size === 'number' ? `${size / 3}px` : `${parseInt(size.replace('px', '')) / 3}px`;
        else return `${24 / 4.6}px`;
    }} solid var(--primary);

    border-right-color: var(--white);
    border-radius: 50%;

    animation-name: spin;
    animation-duration: 2.6s;
    animation-iteration-count: infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;