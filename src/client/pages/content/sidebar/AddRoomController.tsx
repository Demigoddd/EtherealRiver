import React from 'react';
import { withFormik } from 'formik';
import AddRoomForm from './AddRoomForm';
import { get } from 'lodash-es';
import store from '../../../utils/state/store';
import { RoomAction } from '../../../utils/state/actions';

const AddRoomController: React.FC<any> = ({ hideModal }) => {
  const CreateFormWithFormik = withFormik({
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

      store.dispatch(RoomAction.fetchCreateRoom(values))
        .then(() => {
          hideModal();
        })
        .finally(() => {
          resetForm();
          setSubmitting(false);
        });
    },
    displayName: "AddRoomForm"
  })(AddRoomForm);

  return <CreateFormWithFormik />;
}

export default AddRoomController;
