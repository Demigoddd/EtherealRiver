import React from 'react';
import { get } from 'lodash-es';
import { Form, Radio, Button, Divider } from 'antd';

import FormField from "../../../components/FormField";

const AddRoomForm = (props: any) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setValues,
    resetForm,
    isValid,
    handleSubmit,
    isSubmitting
  } = props;

  const changeType = (e: any) => {
    let newRoomType = get(e, 'target.value', 'public');

    // Reset Form
    values.roomName = '';
    values.password = '';
    values.userName = '';
    resetForm();

    // Set values
    values.roomType = newRoomType;
    setValues(values);
  }

  return (
    <Form className="add-room-form">
      <Radio.Group size="large" defaultValue={values.roomType} buttonStyle="solid" onChange={changeType}>
        <Radio.Button value="public">Public</Radio.Button>
        <Radio.Button value="private">Private</Radio.Button>
        <Radio.Button value="personal">Personal</Radio.Button>
      </Radio.Group>

      {
        (values.roomType === 'public' || values.roomType === 'private')
        && <FormField
          name="roomName"
          icon="home"
          placeholder="Room Name"
          type="text"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          values={values}
        />
      }
      {
        (values.roomType === 'private')
        && <FormField
          name="password"
          icon="lock"
          placeholder="Password"
          type="password"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          values={values}
        />
      }
      {
        (values.roomType === 'personal')
        && <FormField
          name="userName"
          icon="user"
          placeholder="Username"
          type="text"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          values={values}
        />
      }

      <Divider />

      <Form.Item>
        <Button
          disabled={isSubmitting || !isValid}
          onClick={handleSubmit}
          type="primary"
          size="large"
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddRoomForm;
