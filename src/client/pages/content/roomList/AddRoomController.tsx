import { withFormik } from 'formik';
import AddRoomForm from './AddRoomForm';
import store from "../../../utils/state/store";
import { createRoom } from '../../../utils/state/actions/index';

const AddRoomController = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    roomName: '',
    email: '',
    password: '',
    roomType: 'public'
  }),
  validate: values => {
    let errors: any = {};
    let roomTypes: any[] = ['public', 'private', 'personal'];

    if (!values.roomName && (values.roomType === 'public' || values.roomType === 'private')) {
      errors.roomName = 'Required';
    }
    if (!values.email && (values.roomType === 'personal')) {
      errors.email = 'Required';
    }
    if (!values.password && (values.roomType === 'private')) {
      errors.password = 'Required';
    }
    if (!roomTypes.includes(values.roomType)) {
      errors.roomType = 'Incorrect Type';
    }
    return errors;
  },
  handleSubmit: (values: any, { setSubmitting, props }: any) => {
    store.dispatch(createRoom(values))
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
  displayName: "AddRoomForm"
})(AddRoomForm);

export default AddRoomController;
