import { Field, Form, Formik } from 'formik'
import { ChangeEvent, FC, useState } from 'react';
import * as Yup from 'yup';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/operations';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Title should be more than 4 chars")
    .max(10, "Title should be no more than 10 chars")
    .required(),
  decription: Yup.string()
        .max(200, "Title should be no more than 200 chars"),
});

const initialValues = {
    title: "",
    description: "",
    avatar: null
}

const AddProjectPage: FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const dispatch: ThunkDispatch<RTCIceConnectionState, void, AnyAction> = useDispatch();
  console.log('avatar', photo)
  const handleSubmit = (values: any) => {
    const payload = {
      title: values.title,
      description: values.description,
      image: photo
      }
        dispatch(addProject(payload))
    }

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