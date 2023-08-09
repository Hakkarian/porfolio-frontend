import { Formik, Form, Field } from "formik";
import {
  FC,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import * as Yup from "yup";
import {
  birthdayRegex,
  emailRegex,
  locationRegex,
  nameRegex,
  phoneRegex,
} from "../../interfaces/regex";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { ActionType, IBoolUser, IUpdUser } from "../../interfaces";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {handleUpdate} from "../../shared";

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
};

const initialValues = {
  username: "",
  email: "",
  birthday: "",
  location: "",
  phone: "",
  avatar: null,
};

const Profile: FC = () => {
  const { user } = useSelector(selectUser);
  const dispatch: ThunkDispatch<RTCIceConnectionState, null, AnyAction> =
    useDispatch();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [edit, setEdit] = useState({
    username: false,
    email: false,
    birthday: false,
    location: false,
    phone: false,
    avatar: false,
  });

  const handleSubmit = () => {};

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    setEdit((prevEdit) => ({ ...prevEdit, [name]: true }));
  };

  const handleUpd = (
    e: MouseEvent<HTMLButtonElement>,
    setEdit: Dispatch<SetStateAction<IBoolUser>>,
    dispatch: Dispatch<ActionType>,
    values: IUpdUser
  ) => {
    const { name } = e.target as HTMLButtonElement;

    if (name === "avatar") {
      handleUpdate({ [name]: avatar }, name, setEdit, dispatch);
      setAvatar(null);
      return;
    }

    handleUpdate({ [name]: values[name] }, name, setEdit, dispatch);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setAvatar(selectedFile);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values }) => {
        return (
          <Form>
            {edit.avatar ? (
              <>
                <button
                  type="button"
                  name="avatar"
                  onClick={(e) => handleUpd(e, setEdit, dispatch, values)}
                >
                  Confirm
                </button>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleAvatarChange}
                />
              </>
            ) : (
              <>
                <button type="button" name="avatar" onClick={handleEdit}>
                  Edit
                </button>
                {user?.avatar && (
                  <img
                    src={user?.avatar.url || user?.user.avatar.url}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                )}
              </>
            )}
            <label>
              {edit.username ? (
                <>
                  <button
                    type="button"
                    name="username"
                    onClick={(e) => handleUpd(e, setEdit, dispatch, values)}
                  >
                    Confirm
                  </button>
                  <Field
                    type="name"
                    name="username"
                    placeholder="Enter your name..."
                    defaultValue={user.username}
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
                    value={user.username || ""}
                    readOnly
                  />
                </>
              )}
            </label>
            <label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={user?.email || ""}
                readOnly
              />
            </label>
            <label>
              {edit.birthday ? (
                <>
                  <button
                    type="button"
                    name="birthday"
                    onClick={(e) => handleUpd(e, setEdit, dispatch, values)}
                  >
                    Confirm
                  </button>
                  <Field
                    type="date"
                    name="birthday"
                    placeholder="Enter your birthday..."
                    defaultValue={user.birthday}
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
                    value={user?.birthday || ""}
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
                    onClick={(e) => handleUpd(e, setEdit, dispatch, values)}
                  >
                    Confirm
                  </button>
                  <Field
                    type="name"
                    name="location"
                    placeholder="Enter your location..."
                    defaultValue={user.location}
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
                    value={user?.location || ""}
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
                    defaultValue={user.phone}
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
                    value={user?.phone || ""}
                    readOnly
                  />
                </>
              )}
            </label>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Profile;
