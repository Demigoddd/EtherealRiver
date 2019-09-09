import { withFormik } from 'formik';
import AddRoomForm from './AddRoomForm';
import { get } from 'lodash-es';
import store from '../../../utils/state/store';
import { roomsSocket } from "../../../utils/socket";

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
    let roomTypes: any[] = ['public', 'private'];

    if (!values.roomName && (values.roomType === 'public' || values.roomType === 'private')) {
      errors.roomName = 'Required';
    }
    if (!values.password && (values.roomType === 'private')) {
      errors.password = 'Required';
    }
    if (!roomTypes.includes(values.roomType)) {
      errors.roomType = 'Incorrect Type';
    }
    return errors;
  },
  handleSubmit: (values: any, { setSubmitting, resetForm, props }: any) => {
    const state = store.getState();
    values.userId = get(state, 'user.data._id');

    roomsSocket.emit('Create', values);

    resetForm();
    setSubmitting(false);
  },
  displayName: "AddRoomForm"
})(AddRoomForm);

export default AddRoomController;
