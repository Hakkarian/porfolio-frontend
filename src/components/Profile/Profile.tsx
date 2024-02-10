import { Formik, Field } from "formik";
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
import { FormCss } from "./Profile.styled";

// validation schema and initial values will be needed later for Formik

// in addition to server validation, we validate also a username, an email, a birthday, a location and a phone
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

// initial values will be empty string, and photo is null by default
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
  // edit will be needed later as a conditional statement, true or false
  // if true, field is editable
  // if false - Read Only
  const [edit, setEdit] = useState({
    username: false,
    email: false,
    birthday: false,
    location: false,
    phone: false,
    avatar: false,
  });

  const handleSubmit = () => { };

  // in this function we edit values field by field 
  // with respect to the object of Edits(as we've seen before) 

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
    // if the value is an avatar, pass its value the object with its name as a property
    // name as a second parameter
    // setEdit function as third
    // and dispatch as fourth
    if (name === "avatar") {
      handleUpdate({ [name]: avatar }, name, setEdit, dispatch);
      // then make the avatar equal to zero and exit
      setAvatar(null);
      return;
    }
    // if there are no an avatar field, pass inside the object just regular text
    handleUpdate({ [name]: values[name] }, name, setEdit, dispatch);
  };

  // in this function we handle the change of the photo
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    // define the photo value
    const selectedFile = e.target.files?.[0];
    // if it does not equal to zero, set the current state of an avatar to the selected photo
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
          <FormCss>
            {/* It is a form with six fields - name, email, birthday, location, phone and avatar. 
                Each of fields have its own Edit and Confirm button, 
                along with placeholders, textarea and read-only fields (except an avatar field) 
                Is the user is clicked on the Edit button, he can edit the chosen field
                and then press the Confirm button, to finish the action*/}
            <div className="form__avatar">
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
                      width={100}
                      height={100}
                    />
                  )}
                </>
              )}
            </div>
            <div className="form__info">
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
            </div>
          </FormCss> 
        );
      }}
    </Formik>
  )
};

export default Profile;
