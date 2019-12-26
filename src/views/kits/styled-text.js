import styled, { css } from 'styled-components';
import { color, fontSize, fontWeight } from 'styled-system';

const StyledText = styled.span`
  ${color};
  ${fontSize};
  ${fontWeight};
  ${({ variant }) => {
    switch (variant) {
      case 'url':
        return css`
          cursor: pointer;
          color: ${({ theme }) => theme.colors.primary};

          ${color};

          &:hover {
            text-decoration: underline;
          }
        `;
      default:
        return '';
    }
  }}
`;

export default StyledText;
