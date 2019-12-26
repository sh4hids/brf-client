import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from 'styled-system';

const OnsiteLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  ${color};

  &:active,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    text-decoration: underline;
  }
`;
const OffsiteLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  ${color};

  &:active,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    text-decoration: underline;
  }
`;

const GoTo = ({ children, variant, link, ...props }) => {
  switch (variant) {
    case 'offsite':
      return (
        <OffsiteLink href={link} {...props}>
          {children}
        </OffsiteLink>
      );
    default:
      return (
        <OnsiteLink to={link} {...props}>
          {children}
        </OnsiteLink>
      );
  }
};

export default GoTo;
