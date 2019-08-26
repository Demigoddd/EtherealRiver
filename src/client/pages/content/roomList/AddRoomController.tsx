import { withFormik } from 'formik';
import AddRoomForm from './AddRoomForm';

const AddRoomController = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    roomName: '',
    userName: '',
    password: '',
    roomType: 'public'
  }),
  validate: values => {
    let errors: any = {};
    let roomTypes: any[] = ['public', 'private', 'personal'];

    if (!values.roomName && (values.roomType === 'public' || values.roomType === 'private')) {
      errors.roomName = 'Required';
    }
    if (!values.userName && (values.roomType === 'personal')) {
      errors.userName = 'Required';
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
    // addRoom(values.roomName, values.userName, values.password, values.roomType);
    console.log("Redux Dispatch", values.roomName, values.userName, values.password, values.roomType);
    setSubmitting(false);
  },
  displayName: "AddRoomForm"
})(AddRoomForm);

export default AddRoomController;
