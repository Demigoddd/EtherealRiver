import { withFormik } from "formik";

import RegisterForm from "./register/RegisterForm";

import { Validate } from "../../utils/helpers/validate";
import { fetchUserRegister } from '../../utils/state/actions/index';

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
    fetchUserRegister(values)
      .then(({ status }: any) => {
        if (status === "success") {
          setTimeout(() => {
            props.history.push("/");
          }, 50);
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
  displayName: "RegisterForm"
})(RegisterForm);

export default Register;
