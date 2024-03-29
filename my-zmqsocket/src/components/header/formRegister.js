import { Button, DatePicker, Form, Input, Select, notification  } from 'antd';
import axios from 'axios';
import React from 'react';
import { URL_API } from '../../utils/common';
const { Option } = Select;

export const FormRegister = (props) => {

  const { setIsOpenFormRegister } = props;
  const [form] = Form.useForm();

  const onDobChange = (date, dateString) => {
    form.setFieldsValue({
      dob: dateString,
    });
  };

  const onGenderChange = (value) => {
    switch (value) {
      case true:
        form.setFieldsValue({
          gender: true,
        });
        return;
      case false:
        form.setFieldsValue({
          gender: true,
        });
        return;
    }
  };
  const onFinish = (values) => {
    const payload = {
      username: values.username,
      password: values.password,
      email: values.email,
      gender: values.gender,
      dob: values.dob,
      address: values.address,
      phoneNumber: values.phoneNumber
    }
    axios.post(`${URL_API}/User/create-user`, payload , {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    })
      .then(res => {
        // register success
        if(res.status) {
          notification.success({
            message: 'Bạn đã đăng ký thành công',
          });
          setIsOpenFormRegister(false);
        } else {
          notification.error({
            message: 'Bạn đã đăng ký thất bại',
          });
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Tên tài khoản"
        name="username"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên tài khoản!',
          },
        ]}
      >
        <Input placeholder='Vui lòng nhập tài khoản' />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!',
          },
        ]}
      >
        <Input.Password placeholder='Vui lòng nhập Mật khẩu' />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Nhập lại mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập lại mật khẩu!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },                                                                                  
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      {/* <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="SDT"
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
        ]}
      >
        <Input type='number' />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value={true}>Nam</Option>
          <Option value={false}>Nữ</Option>
        </Select>
      </Form.Item>
      <Form.Item label="DatePicker" name="dob">
        <DatePicker format="YYYY/MM/DD" onChange={onDobChange}/>
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input your address!',
          },
        ]}
      >
        <Input placeholder='Vui lòng nhập địa chỉ' />
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng kí
        </Button>
      </Form.Item>
    </Form>
  );
};
