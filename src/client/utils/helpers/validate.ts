export const Validate = ({ isAuth, values, errors }: any): void => {
  const rules: any = {
    email: (value: string) => {
      if (!value) {
        errors.email = "Write Email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = "Invalid Email";
      }
    },
    password: (value: string) => {
      if (!value) {
        errors.password = "Write Password";
      } else if (
        !isAuth &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
      ) {
        errors.password = "Password is too simple";
      }
    },
    password_2: (value: string) => {
      if (!isAuth && value !== values.password) {
        errors.password_2 = "Passwords do not match";
      }
    },
    fullName: (value: string) => {
      if (!isAuth && !value) {
        errors.fullname = "Write Name";
      }
    }
  };

  Object.keys(values).forEach((key: string) => rules[key] && rules[key](values[key]));
};
