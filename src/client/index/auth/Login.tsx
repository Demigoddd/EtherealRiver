import { withFormik } from "formik";

import LoginForm from "./login/LoginForm";

import { Validate } from "../../utils/helpers/validate";
import { fetchUserLogin } from '../../utils/state/actions/index';

const Login = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validate: values => {
    let errors = {};
    Validate({ isAuth: true, values, errors });
    return errors;
  },
  handleSubmit: (values: any, { setSubmitting, props }: any) => {
    fetchUserLogin(values)
      .then(({ status }: any) => {
        if (status === "success") {
          props.history.push("/");
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
  displayName: "LoginForm"
})(LoginForm);

export default Login;
