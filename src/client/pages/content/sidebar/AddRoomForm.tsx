import React from 'react';
import { get } from 'lodash-es';
import { Form, Radio, Button, Divider, Icon, Input } from 'antd';

import FormField from "../../../components/FormField";
import { validateField } from "../../../utils/helpers/validateField";

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
    values.email = '';
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
      </Radio.Group>

      {
        (values.roomType === 'public' || values.roomType === 'private')
        && <Form.Item
          validateStatus={validateField("roomName", touched, errors)}
          help={!touched["roomName"] ? "" : errors["roomName"]}
          hasFeedback
        >
          <Input
            id="roomName"
            prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
            size="large"
            placeholder="Room Name"
            value={values["roomName"]}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            maxLength={60}
            addonBefore={<>{values["roomName"].length}<span>/</span>60</>}
          />
        </Form.Item>
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

      <Divider />

      <Form.Item>
        <Button
          disabled={isSubmitting || !isValid}
          loading={isSubmitting}
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
