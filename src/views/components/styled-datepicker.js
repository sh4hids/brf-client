import React, { Component, Fragment } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { space } from 'styled-system';
import { Text } from '../kits';

const DatepickerContainer = styled.div`
  padding: 6px 16px;
  border-radius: 4px;
  border: ${({ theme }) => theme.borders.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.lighter};

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    padding-bottom: 4px;
    background-color: ${({ theme }) => theme.colors.lighter};
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
    color: ${({ theme }) => theme.colors.lightDark};

    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }
  }

  ${space};
`;

class StyledDatepicker extends Component {
  handleChange = value => {
    this.props.onChange(this.props.keyName, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.keyName, true);
  };

  render() {
    return (
      <Fragment>
        <DatepickerContainer
          {...this.props.margin}
          {...this.props.padding}
          {...this.props.size}
        >
          <Datepicker
            {...this.props}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            className="date-picker-input"
          />
        </DatepickerContainer>
        {!!this.props.error && this.props.touched && (
          <Text variant="caption" color="error" mt={8} mb={16}>
            {this.props.error}
          </Text>
        )}
      </Fragment>
    );
  }
}

export default StyledDatepicker;
