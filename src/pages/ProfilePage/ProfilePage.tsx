import { Formik, Form, Field } from 'formik'
import { FC, useState, MouseEvent, Dispatch, SetStateAction } from 'react'
import * as Yup from 'yup';
import { birthdayRegex, emailRegex, locationRegex, nameRegex, phoneRegex } from '../../interfaces/regex';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { ActionType, IBoolUser, IUpdUser } from '../../interfaces';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import handleUpdate from '../../shared';


const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .min(4, "Name should be more than 4 chars")
        .max(16, "Name should be less than 16 chars")
        .matches(
          nameRegex,
          "Name must contain alphanumeric, numbers and underscores only."
        ),
      email: Yup.string()
        .email()
        .matches(
          emailRegex,
          "Email not supports non-Latin chars, digits, trailing or leading."
        ),
      birthday: Yup.string().matches(
        birthdayRegex,
        "Only 31/09/1925 or 31-09-1925 dates are allowed."
      ),
      location: Yup.string().matches(
        locationRegex,
        "Example of right location: Schevchenka Street, 123"
      ),
      phone: Yup.string().matches(
        phoneRegex,
        "Number must match the format +380XXXXXXXXX or 0XXXXXXXXX"
      ),
    });
}

const initialValues = {
    username: "",
    email: "",
    birthday: "",
    location: "",
    phone: ""
}

const ProfilePage: FC = () => {
  const { user } = useSelector(selectUser);
  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> = useDispatch();
  console.log('user id', user)
  const [edit, setEdit] = useState({
        username: false,
        email: false,
        birthday: false,
        location: false,
        phone: false
  })
   console.log("editState", edit);
    const handleSubmit = () => {

  }
  
  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement
    console.log('name bool', name);
    setEdit((prevEdit) => ({ ...prevEdit, [name]: true }));

  }

  const handleUpd = (e: MouseEvent<HTMLButtonElement>,
    setEdit: Dispatch<SetStateAction<IBoolUser>>,
    dispatch: Dispatch<ActionType>,
    values: IUpdUser
  ) => {
    const { name } = e.target as HTMLButtonElement;

    if (values[name] === "") {
      alert(`${name} must not be empty`)
    }

    handleUpdate({ [name]: values[name] }, name, setEdit, dispatch);
    
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values }) => {
        console.log('form', values)
        return (
          <Form>
            <label>
              <Field type="file" name="avatar" />
            </label>
            <label>
              {edit.username ? (
                <>
                  <button
                    type="button"
                    name="username"
                    onClick={(e) =>
                      handleUpd(e, setEdit, dispatch, values)
                    }
                  >
                    Confirm
                  </button>
                  <Field
                    type="name"
                    name="username"
                    placeholder="Enter your name..."
                    value={values.username || user.username}
                  />
                </>
              ) : (
                <>
                  <button type="button" name="username" onClick={handleEdit}>
                    Edit
                  </button>
                  <Field
                    type="name"
                    name="username"
                    placeholder="Enter your name..."
                    value={values.username || user.username}
                    readOnly
                  />
                </>
              )}
            </label>
            <label>
              {edit.email ? (
                <>
                  <button
                    type="button"
                    name="email"
                    onClick={(e) =>
                      handleUpd(e, setEdit, dispatch, values)
                    }
                  >
                    Confirm
                  </button>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={values.email || user.email}
                  />
                </>
              ) : (
                <>
                  <button type="button" name="email" onClick={handleEdit}>
                    Edit
                  </button>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={values.email || user.email}
                    readOnly
                  />
                </>
              )}
            </label>
            <label>
              {edit.birthday ? (
                <>
                  <button
                    type="button"
                    name="birthday"
                    onClick={(e) =>
                      handleUpd(e, setEdit, dispatch, values)
                    }
                  >
                    Confirm
                  </button>
                  <Field
                    type="date"
                    name="birthday"
                    placeholder="Enter your birthday..."
                    value={values.birthday || user.birthday}
                  />
                </>
              ) : (
                <>
                  <button type="button" name="birthday" onClick={handleEdit}>
                    Edit
                  </button>
                  <Field
                    type="date"
                    name="birthday"
                    placeholder="Enter your birthday..."
                    value={values.birthday || user.birthday}
                    readOnly
                  />
                </>
              )}
            </label>
            <label>
              {edit.location ? (
                <>
                  <button
                    type="button"
                    name="location"
                    onClick={(e) =>
                      handleUpd(e, setEdit, dispatch, values)
                    }
                  >
                    Confirm
                  </button>
                  <Field
                    type="name"
                    name="location"
                    placeholder="Enter your location..."
                    value={values.location || user.location}
                  />
                </>
              ) : (
                <>
                  <button type="button" name="location" onClick={handleEdit}>
                    Edit
                  </button>
                  <Field
                    type="name"
                    name="location"
                    placeholder="Enter your location..."
                    value={values.location || user.location}
                    readOnly
                  />
                </>
              )}
            </label>
            <label>
              {edit.phone ? (
                <>
                  <button
                    type="button"
                    name="phone"
                    onClick={(e) => handleUpd(e, setEdit, dispatch, values)}
                  >
                    Confirm
                  </button>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Enter your phone..."
                    value={values.phone || user.phone}
                  />
                </>
              ) : (
                <>
                  <button type="button" name="phone" onClick={handleEdit}>
                    Edit
                  </button>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Enter your phone..."
                    value={values.phone || user.phone}
                    readOnly
                  />
                </>
              )}
            </label>
          </Form>
        );
      }
      }
    </Formik>
  );
}

export default ProfilePage