import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import styled from 'styled-components';
import { space, height } from 'styled-system';
import { Text } from '../kits';

const SelectContainer = styled.div`
  ${space};

  .styled__control {
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    ${height};
  }

  .styled__menu {
    z-index: 10;
  }

  .styled__control--is-focused {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: none;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }
  }

  .styled__placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  .styled__placeholder,
  .styled__single-value,
  .styled__menu {
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
  }
`;

const customStyles = {
  indicatorsContainer: (provided, state) => ({
    ...provided,
    borderColor: 'green',
  }),
  option: (provided, state) => ({
    ...provided,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

class SelectInput extends Component {
  handleChange = value => {
    this.props.onChange(this.props.keyName, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.keyName, true);
  };

  render() {
    return (
      <SelectContainer
        {...this.props.margin}
        {...this.props.padding}
        {...this.props.size}
        className={this.props.selectClass}
      >
        {!this.props.async ? (
          <Fragment>
            <Select
              {...this.props}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              styles={customStyles}
              classNamePrefix="styled"
            />
            {!!this.props.error && this.props.touched && (
              <Text variant="caption" color="error" mt={8}>
                {this.props.error}
              </Text>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <AsyncSelect
              {...this.props}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              styles={customStyles}
              classNamePrefix="styled"
            />
            {!!this.props.error && this.props.touched && (
              <Text variant="caption" color="error" mt={8}>
                {this.props.error}
              </Text>
            )}
          </Fragment>
        )}
      </SelectContainer>
    );
  }
}

export default SelectInput;
