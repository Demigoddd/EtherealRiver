import { withFormik } from "formik";
import { store } from "../../utils/state/store";

import LoginForm from "./login/LoginForm";

import { Validate } from "../../utils/helpers/validate";
import { UserAction } from '../../utils/state/actions';

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
    store.dispatch(UserAction.fetchUserLogin(values))
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
