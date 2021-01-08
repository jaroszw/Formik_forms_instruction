import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import { TextError } from './TextError';

const initialValues = {
  name: '',
  email: '',
  // channel: '',
  // comments: '',
  // address: '',
  // social: {
  //   facebook: '',
  //   twitter: '',
  // },
  // phoneNumbers: ['', ''],
  phNumbers: [''],
};

const onSubmit = (values) => {
  console.log('Form data:', values);
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  // channel: Yup.string().required('Required'),
  // address: Yup.string().required('Required'),
});

const YoutubeForm = () => {
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field name="name" id="name" type="text" />
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage name="email">
            {(props) => {
              console.log(props);
              return <div className="error">{props}</div>;
            }}
          </ErrorMessage>
        </div>

        {/* 
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            name="channel"
            id="channel"
            placeholder="Youtube Channel Name"
          />
          <ErrorMessage name="channel" />
        </div>
        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field name="comments" id="comments" as="textarea" />
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>


        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <Field type="text" id="facebook" name="social.facebook" />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>

        <div className="form-control">
          <label htmlFor="phoneNumbers">Phone 1</label>
          <Field type="text" name="phoneNumbers[0]" id="phoneNumbers" />
        </div>

        <div className="form-control">
          <label htmlFor="phoneNumbers">Phone 2</label>
          <Field type="text" id="phoneNumbers" name="phoneNumbers[1]" />
          </div> */}

        <div className="from-control">
          <label>List of phone numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { phNumbers } = values;

              return (
                <div>
                  {phNumbers.map((phNumber, index) => (
                    <div key={index}>
                      <Field type="text" name={`phNumbers[${index}]`} />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          -
                        </button>
                      )}

                      <button type="button" onClick={() => push('')}>
                        +
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
