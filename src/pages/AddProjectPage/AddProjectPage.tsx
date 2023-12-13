import { Field, Form, Formik } from 'formik'
import { ChangeEvent, FC, useState } from 'react';
import * as Yup from 'yup';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/operations';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';

// here we build validation schema using Yup, in which
// we check if correct title and description of a project

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Title should be more than 4 chars")
    .max(10, "Title should be no more than 10 chars")
    .required(),
  decription: Yup.string()
        .max(200, "Title should be no more than 200 chars"),
});

// initial values both for Formik
const initialValues = {
    title: "",
    description: "",
    avatar: null
}

const AddProjectPage: FC = () => {
  const user = useSelector(selectUser);
  const [photo, setPhoto] = useState<File | null>(null);
  const dispatch: ThunkDispatch<RTCIceConnectionState, void, AnyAction> = useDispatch();

  // here we add a project using payload with title, photo and description
  // if user is not logged in, project can't be added
  const handleSubmit = (values: any) => {
    const payload = {
      title: values.title,
      description: values.description,
      image: photo
    }
    if (!user.token) {
      alert('You must login in order to add projects');
      return;
    }
    
        dispatch(addProject(payload))
  }
  
  // here we check if photo is being changed

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setPhoto(file);
    }
  }
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, setFieldValue }) => (
        // in this form we add a project with a title, an avatar and a description
        <Form>
          <label>
            <Field type="name" name="title" placeholder="Enter your title..." />
          </label>
          <label>
            <Field
              type="text"
              name="description"
              placeholder="Enter your description..."
            />
          </label>
          <label>
            <input type="file" name='avatar' onChange={handleChange} />
                  </label>
                  <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default AddProjectPage;