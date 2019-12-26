import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSize};

  thead {
    border-bottom: ${({ theme }) => theme.borders.light};
  }

  tr {
    border-bottom: ${({ theme }) => theme.borders.light};

    &:last-child {
      border: none;
    }
  }

  th {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }

  td {
    font-weight: 400;
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
  }

  th,
  td {
    padding: 16px;
  }

  th.text,
  td.text {
    text-align: left;
  }

  th.text-centered,
  td.text-centered {
    text-align: center;
  }

  th.number,
  td.number {
    text-align: right;
  }
`;

export default Table;
