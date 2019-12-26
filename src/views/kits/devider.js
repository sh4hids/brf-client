import styled from 'styled-components';
import { borderColor } from 'styled-system';

const Devider = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: ${({ theme }) => theme.borders.light};
  margin: 1em 0;
  padding: 0;

  ${borderColor};
`;

export default Devider;
