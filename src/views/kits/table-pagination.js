import styled from 'styled-components';

const TablePagination = styled.div`
  padding: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  border-top: ${({ theme }) => theme.borders.light};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};

  p {
    margin: 0;
    padding: 0;
    display: inline;

    svg {
      position: relative;
      top: 2px;
      cursor: pointer;
    }
  }

  p.prev {
    margin-right: 24px;
  }

  p.next {
    margin-left: 24px;
  }

  p.table-pagination-info {
    position: relative;

    &.pull-to-top {
      top: -5px;
    }
  }
`;

export default TablePagination;
