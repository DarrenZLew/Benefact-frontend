import React, { RefObject } from "react";
import "./StyledSelect.scss";
import { InputWrapper, InputProps } from "components/UI/PageComponents/Form/InputWrapper";

interface SelectOption {
  title: string;
  value: any;
}

interface Props extends InputProps {
  id?: string;
  disabled?: boolean;
  options?: Array<SelectOption>;
  className?: string;
  label?: string;
  ref?: RefObject<HTMLSelectElement>;
}

export const StyledSelect = InputWrapper<Props>(
  class extends React.Component<Props> {
    render = () => {
      const { id, disabled, options = [] } = this.props;
      const { onChange, value } = this.props;
      const result = !disabled ? (
        <select
          id={id}
          className="styled-select editable"
          onChange={e => {
            const value = options.find(o => String(o.value) === e.target.value) || options[0];
            onChange && onChange(value.value);
          }}
        >
          {options.map(option => {
            return (
              <option
                key={option.value}
                value={String(option.value)}
                selected={option.value === value}
              >
                {option.title}
              </option>
            );
          })}
        </select>
      ) : (
        <div className="styled-select">
          {(options.find(o => o.value === value) || options[0]).title}
        </div>
      );
      return result;
    };
  }
);