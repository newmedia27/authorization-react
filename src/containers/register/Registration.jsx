import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./form.module.sass";
import InputControl from "../../components/formik/InputControl";
import { sendRegisrationRequest } from "../../reducers/auth";
import jwt_decode from "jwt-decode";
import { format } from "date-fns";
// jwt
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIzMzUwNzMzLCJleHAiOjE2MjU5NDI3MzN9.zEkIyQa1abGQCpqVEQr0dMnP_IAkVF-x2LThc-7wnBA

const Registration = () => {
  const dispatch = useDispatch();
  const submitForm = (values) => {
    const formValues = { ...values, role: "Author" };
    dispatch(sendRegisrationRequest(formValues));
  };

  /**
 * без jwt_decode

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIzMzUwNzMzLCJleHAiOjE2MjU5NDI3MzN9.zEkIyQa1abGQCpqVEQr0dMnP_IAkVF-x2LThc-7wnBA'.split('.')[1]

const tokenInfo = atob(token)
 */

  const decoded = jwt_decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIzMzUwNzMzLCJleHAiOjE2MjU5NDI3MzN9.zEkIyQa1abGQCpqVEQr0dMnP_IAkVF-x2LThc-7wnBA"
  );
  console.log(decoded);
  const { iat, exp } = decoded;
  console.log(format(iat * 1000, "PPPpp"));
  return (
    <div>
      <RegisterForm onSubmit={submitForm}>
        <Step
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .min(3, "Должно быть минимум 3 символа")
              .required(),
          })}
        >
          <InputControl name="username" label="name" />
        </Step>
        <Step
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
          })}
        >
          <InputControl name="email" label="email" />
        </Step>
        <Step
          validationSchema={Yup.object().shape({
            password: Yup.string().min(3),
          })}
        >
          <InputControl name="password" label="password" type="password" />
        </Step>
      </RegisterForm>
    </div>
  );
};

export default Registration;

const RegisterForm = ({ children, onSubmit }) => {
  const [step, setStep] = useState(0);
  const childrenToArray = React.Children.toArray(children);
  const currentChild = childrenToArray[step];
  const lastStep = childrenToArray.length - 1;
  const buttonValue = step !== lastStep ? "next" : "submit";
  const handleSubmit = (values) => {
    if (step !== lastStep) {
      setStep((s) => s + 1);
    } else {
      onSubmit(values);
    }
  };
  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={currentChild.props.validationSchema}
      >
        {({ values }) => {
          return (
            <Form>
              {currentChild}
              <button type="submit">{buttonValue}</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

function Step({ children }) {
  return <>{children}</>;
}
