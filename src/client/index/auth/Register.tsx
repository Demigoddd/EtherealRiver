import { withFormik } from "formik";
import { get } from "lodash-es";
import store from "../../utils/state/store";

import RegisterForm from "./register/RegisterForm";
import { Validate } from "../../utils/helpers/validate";
import { UserAction } from "../../utils/state/actions";
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
    const isDevelopment = get(window, "appConfig.DEVELOPMENT");
    const baseUrl = get(window, "appConfig.URL");
    const clientBaseUrl = isDevelopment ? baseUrl.replace(':3003', ':3000') : baseUrl;

    store.dispatch(UserAction.fetchUserRegister(values))
      .then(() => {
        userApi.sendVerifyEmail({ email: values.email, clientBaseUrl: clientBaseUrl })
          .then(() => {
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
