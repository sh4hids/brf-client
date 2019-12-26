import styled from 'styled-components';
import {
  border,
  borderBottom,
  borderRadius,
  height,
  space,
  textAlign,
} from 'styled-system';

const InputContainer = styled.div`
  padding: 8px 16px;
  border-radius: 4px;
  border: ${({ theme }) => theme.borders.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.lighter};

  ${border};
  ${borderBottom};
  ${borderRadius}
  ${height};
  ${space};

  input,
  textarea {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding-bottom: 4px;
    background-color: ${({ theme }) => theme.colors.lighter};
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.lightDark};

    ${textAlign};

    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }
  }

  textarea {
    resize: none;
    height: 95%;
  }
`;

export default InputContainer;
