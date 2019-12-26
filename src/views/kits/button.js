import React from 'react';
import styled from 'styled-components';
import { space, width } from 'styled-system';

const BaseButton = styled.button`
  outline: none;
  width: 100%;
  height: 48px;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  border: ${({ theme }) => theme.borders.primary};
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.lighter};

  &.btn-small {
    height: 40px;
  }

  ${space};
  ${width};
`;

const PrimaryButton = styled(BaseButton)`
  outline: none;
  border: none;
  color: ${({ theme }) => theme.colors.lighter};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Button = ({ children, variant, ...props }) => {
  switch (variant) {
    case 'primary':
      return <PrimaryButton {...props}>{children}</PrimaryButton>;
    default:
      return <BaseButton {...props}>{children}</BaseButton>;
  }
};

export default Button;
