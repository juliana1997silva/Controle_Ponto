import React, { CSSProperties } from 'react';

import { ButtonToolbar, Button, ButtonProps } from 'rsuite';
import { useAuth } from '../../hooks/hooksAuth';
import { Roles } from '../../types/permissions';

interface ButtonCustomProps extends ButtonProps {
  name?: string;
  role: Roles;
  buttonToolbar?: boolean;
  disabled?: boolean;
  block?: boolean | false;
  color?: 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
  appearance?: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
  style?: CSSProperties;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  children,
  name,
  role,
  buttonToolbar,
  onClick,
  block,
  color,
  appearance,
  style,
  ...rest
}) => {
  const { getRole } = useAuth();
  return (
    <>
      {getRole(role) && (
        <>
          {buttonToolbar ? (
            <>
              <ButtonToolbar>
                <Button appearance={appearance} color={color} block={block} onClick={onClick} style={style} {...rest}>
                  {name}
                </Button>
              </ButtonToolbar>
            </>
          ) : (
            <>
              <Button appearance={appearance} color={color} block={block} onClick={onClick} style={style} {...rest}>
                {name}
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ButtonCustom;
