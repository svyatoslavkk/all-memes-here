import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValues } from "../../types/types";
import { app } from '../../firebase/firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Loader from "../../components/loader/Loader";

export default function Login() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        console.log(user);
        user.getIdToken()
          .then((accessToken) => {
            sessionStorage.setItem('Token', accessToken);
            navigate('/main');
          })
          .catch((error) => {
            console.error('getIdToken error', error);
          });
      })
      .catch((error) => {
        console.error('signIn error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

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
      <form className="login-form">
        <div className="primary-input-section">
          <input
            className="input-text"
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </div>
        <div className="primary-input-section">
          <input
            className="input-text"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="full-width-button" onClick={signIn}>
          <span className="mid-header">Login</span>
        </button>
      </form>
      {/* <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form className="login-form">
          <div className="primary-input-section">
            <Field
              className="input-text"
              type="email"
              name="email"
              placeholder="Email"
            />
            <div>
              <ErrorMessage name="email" component="div" className="error" />
            </div>
          </div>
          <div className="primary-input-section">
            <Field
              className="input-text"
              type="password"
              name="password"
              placeholder="Password"
            />
            <div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
          </div>
          <button type="submit" className="full-width-button">
            <span className="mid-header">Login</span>
          </button>
        </Form>
      </Formik> */}
      {loading && (
        <div className="overlay">
          <span className="absolute">
            <Loader />
          </span>
        </div>
      )}
    </div>
  );
}
