import React from "react";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";

import FormField from "../../../components/FormField";
import SocialIcon from "../../../components/SocialIcons";

const LoginForm = (props: any) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting
  } = props;
  return (
    <div>
      <div className="auth__top">
        <h2>Login to account</h2>
        <p>Please log in to your account.</p>
      </div>
      <div className="auth__block">
        <Form onSubmit={handleSubmit}>
          <FormField
            name="email"
            icon="mail"
            placeholder="E-Mail"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            values={values}
          />

          <FormField
            name="password"
            icon="lock"
            placeholder="Password"
            type="password"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            values={values}
          />

          <Form.Item>
            {isSubmitting && !isValid && <span>Error!</span>}
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit}
              type="primary"
              size="large"
            >
              Login to account
            </Button>
          </Form.Item>
          <SocialIcon />
          <Link className="auth__register-link" to="/register">
            Registration
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
