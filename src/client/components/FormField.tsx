import React from "react";
import { Form, Icon, Input } from "antd";

import { validateField } from "../utils/helpers/validateField";

const FormField = ({
  name,
  placeholder,
  icon,
  type,
  handleChange,
  handleBlur,
  touched,
  errors,
  values
}: FormField) => {
  return (
    <Form.Item
      validateStatus={validateField(name, touched, errors)}
      help={!touched[name] ? "" : errors[name]}
      hasFeedback
    >
      <Input
        id={name}
        prefix={<Icon type={icon} style={{ color: "rgba(0,0,0,.25)" }} />}
        size="large"
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    </Form.Item>
  );
};

interface FormField {
  name: string;
  placeholder: string;
  icon: any;
  type?: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
  values: any;
}

export default FormField;
