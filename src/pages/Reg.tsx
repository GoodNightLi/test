import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";
const Reg = () => {
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  /* 思路一：在表单值发生改变时候通过changeValue进行判断后校验 */
  /* 思路二：对时间组件进行onChange的时机进行校验判断 */
  const changeDate = async (changedValues, allValues) => {
    try {
      await form.validateFields(["startDate", "endDate"]);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };
  const validateDateRange = (_, value) => {
    const { startDate, endDate } = form.getFieldsValue(["startDate", "endDate"]);
    if (startDate && endDate) {
      const startTime = moment(startDate.toString());
      const endTime = moment(endDate.toString());
      if (startTime.isAfter(endTime)) {
        return Promise.reject("开始日期不能晚于结束日期!");
      }
    }
    return Promise.resolve();
  };
  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      onValuesChange={changeDate}
    >
      <Form.Item
        label="手机号"
        name="phone"
        rules={[
          {
            pattern: /1[3-9]\d{9}$/,
            required: true,
            message: "请输入正确手机号",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="开始日期"
        name="startDate"
        rules={[
          {
            required: true,
            message: "请选择开始日期",
          },
          {
            validator: validateDateRange,
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        label="结束日期"
        name="endDate"
        rules={[
          {
            required: true,
            message: "请选择结束日期",
          },
          {
            validator: validateDateRange,
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DD"/>
      </Form.Item>
    </Form>
  );
};

export default Reg;
