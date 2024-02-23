import MuiButton, { ButtonOwnProps } from '@mui/material/Button';

// Components
import Loading from '../Loading';

type Props = {
    hug?: boolean;
    label: string;
    type?: 'button' | 'reset' | 'submit';
    action?: () => void;

    disabled?: boolean;
    loading?: boolean;

    variant?: "contained" | "text" | "outlined";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;

    color?: ButtonOwnProps['color'];
}

function Button ({ 
    label, 
    type, 
    action, 
    variant, 
    startIcon, 
    endIcon, 
    disabled,
    loading,
    color,
    hug
}: Props) {
    return (
        <MuiButton
            style={{ width: hug ? 'fit-content' : '100%' }}
            variant={variant ?? 'contained'}
            startIcon={!loading && startIcon}
            endIcon={!loading && endIcon}
            type={type ?? 'button'}
            disabled={disabled || loading}
            onClick={action}
            color={color}
        >   
            {loading ? <Loading /> : label}
        </MuiButton>
    )
}

export default Button;