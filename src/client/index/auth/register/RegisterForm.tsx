import React from "react";
import { Form, Button, Icon } from "antd";
import { Link } from "react-router-dom";

import FormField from "../../../components/FormField";
import SocialIcon from "../../../components/SocialIcons";

const success = false;

const RegisterForm: React.FC = (props: any) => {
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
        <h2>Registation</h2>
        <p>To enter the chat, you need to register.</p>
      </div>
      <div className="auth__block">
        {!success ? (
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
              name="fullname"
              icon="user"
              placeholder="Your name"
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

            <FormField
              name="password_2"
              icon="lock"
              placeholder="Password again"
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
                Registation
              </Button>
            </Form.Item>
            <SocialIcon />
            <Link className="auth__register-link" to="/login">
              Login to account
            </Link>
            <Link className="auth__register-link" to="/">
              Back to Home
            </Link>
          </Form>
        ) : (
            <div className="auth__success-block">
              <div>
                <Icon type="info-circle" theme="twoTone" />
              </div>
              <h2>Verify your account</h2>
              <p>
                An email has been sent to your mail with a link to a confirmation account.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default RegisterForm;
