import styled, { css } from 'styled-components';
import { color, height, width, space, textAlign, layout } from 'styled-system';

const Container = styled.div`
  ${({ variant }) =>
    variant === 'main' &&
    css`
      width: 100vw;
      margin: 0 auto;
    `};
  ${({ variant }) =>
    variant === 'card' &&
    css`
      border-radius: 4px;
      background-color: ${({ theme }) => theme.colors.lighter};
    `};

  ${color};
  ${space};
  ${height};
  ${width};
  ${textAlign};
  ${layout};
`;

export default Container;
