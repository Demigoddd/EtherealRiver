import { withFormik } from "formik";
import store from "../../utils/state/store";

import RegisterForm from "./register/RegisterForm";

import { Validate } from "../../utils/helpers/validate";
import { fetchUserRegister } from "../../utils/state/actions/index";
import userApi from "../../utils/api/user";

const Register = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: "",
    fullname: "",
    password: "",
    password_2: ""
  }),
  validate: values => {
    let errors = {};
    Validate({ isAuth: false, values, errors });
    return errors;
  },
  handleSubmit: (values: any, { setSubmitting, props }: any) => {
    store.dispatch(fetchUserRegister(values))
      .then(() => {
        userApi.sendVerifyEmail({ email: values.email }).then(() => {
          setTimeout(() => {
            props.history.push("/register/verify");
          }, 50);
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
  displayName: "RegisterForm"
})(RegisterForm);

export default Register;
