import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FC } from "react";
import { emailRegex, passwordRegex } from "../../interfaces/regex";
import { useDispatch } from "react-redux";
import { login } from "../../redux/operations";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ILogin } from "../../interfaces";
import GoogleAuthentication from "../../components/GoogleAuthentication";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      emailRegex,
      `Email not supports non-Latin chars, digits, trailing or leading.`
    )
    .email("Invalid email.")
    .required(),
  password: Yup.string()
    .min(8, "Password should have minimum length of 8")
    .max(16, "Password should have maximum length of 16")
    .matches(
      passwordRegex,
      "Password must be more than 8 chars, must have at least 1 number and at least 1 special character."
    )
    .required(),
});

const LoginPage: FC = () => {
  const dispatch: ThunkDispatch<RTCIceConnectionState, void, AnyAction> =
    useDispatch();

  const handleSubmit = (values: ILogin, actions: FormikHelpers<ILogin>) => {
    const { email, password } = values;
    dispatch(login({ email, password }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, touched, setFieldValue }) => (
        <Form>
          <label>
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email..."
              />
              {errors.email && values.email && <span></span>}
              {!errors.email && values.email && <span></span>}
            </div>
            <span>{errors.email}</span>
          </label>
          <label>
            <div>
              <Field
                name="password"
                type="password"
                placeholder="Enter your password..."
              />
              {errors.password && values.password && <span></span>}
              {!errors.password && values.password && <span></span>}
            </div>
            <span>{errors.password}</span>
          </label>
          <button type="submit">Submit</button>
          <GoogleAuthentication />
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
