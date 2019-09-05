import { withFormik } from 'formik';
import AddRoomForm from './AddRoomForm';
import socket from "../../../utils/socket";

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
    socket.emit('ROOMS:Create', values);
    setSubmitting(false);
  },
  displayName: "AddRoomForm"
})(AddRoomForm);

export default AddRoomController;
