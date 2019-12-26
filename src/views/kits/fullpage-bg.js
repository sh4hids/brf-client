import styled from 'styled-components';
import { height } from 'styled-system';

const FullpageBg = styled.div`
  background-image: url(${({ imgSrc }) => imgSrc});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.light};
  ${height};
`;

export default FullpageBg;
