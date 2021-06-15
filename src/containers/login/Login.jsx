import React from "react";
import { Formik, Form } from "formik";
import InputControl from "../../components/formik/InputControl";
import { sendLoginRequest } from "../../reducers/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(sendLoginRequest(values));
  };
  return (
    <div>
      <Formik
        initialValues={{
          identifier: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <InputControl name={`identifier`} />
            <InputControl name={`password`} />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
