import * as React from "react";
import { Form } from "react-lifesg-design-system";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  error?: string;
  defaultValue : string;
  disabled? :boolean
  
}

export const Input: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={formatWrapperClass(props)}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <Form.Field type="text"
        defaultValue={props.defaultValue}
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          value={props.value}
          disabled={props.disabled}
          
          onChange={onChangeInput(props)}
        />
      </div>
      <div className="help-block">{props.error}</div>
    </div>
  )
};

const formatWrapperClass = (props: Props) => {
  const wrapperClass = 'form-group';

  return props.error ?
    `${wrapperClass} has-error` :
    wrapperClass;
};

const onChangeInput = (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => { 
  props.onChange(e.target.name, e.target.value);
};
