import styled from 'styled-components';
import Grid from 'styled-components-grid';
import { height, space } from 'styled-system';

const CustomGrid = styled(Grid)`
  ${height};

  > div {
    ${space};
  }
`;

export default CustomGrid;
