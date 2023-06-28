import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FC } from 'react';
import { emailRegex, nameRegex, passwordRegex } from '../../interfaces/regex';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/operations';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { IRegisterPage } from '../../interfaces';


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Name should be at least 4 characters.")
    .max(16, "Name should be not more than 16 characters")
    .matches(
      nameRegex,
      "Name must contain alphanumeric, numbers and underscores only."
    ),
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required(),
});



const RegisterPage: FC = () => {
  const dispatch: ThunkDispatch<RTCIceConnectionState, void, AnyAction> =
    useDispatch();

  const handleSubmit = (values: IRegisterPage, actions: FormikHelpers<IRegisterPage>) => {
    const { username, email, password } = values;
    // dispatch(register({ username, email, password }))
    dispatch(register({ username, email, password }));
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, touched, setFieldValue }) => (
        <Form>
          <label>
            <div>
              <Field name="username" type="name" placeholder="Enter your name..." />
              {errors.username && values.username && <span></span>}
              {!errors.username && values.username && <span></span>}
            </div>
            <span>{errors.username}</span>
          </label>
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
          <label>
            <div>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password..."
              />
              {errors.confirmPassword && values.confirmPassword && (
                <span></span>
              )}
              {!errors.confirmPassword && values.confirmPassword && (
                <span></span>
              )}
            </div>
            <span>{errors.confirmPassword}</span>
          </label>
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterPage;