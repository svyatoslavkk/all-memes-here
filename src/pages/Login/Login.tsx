import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValues } from "../../types/types";

export default function Login() {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const onSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="login">
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form className="login-form">
          <div>
            <Field
              className="input-text"
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <Field
              className="input-text"
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit" className="full-width-button">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
