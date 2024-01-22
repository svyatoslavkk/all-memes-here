import { Formik } from "formik";
import { FormValues } from "../../types/types";

export default function SignUp() {
  return (
    <div className="sign-up">
      <h2 style={{ textAlign: "center" }}>SignUp</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values: FormValues) => {
          const errors: Partial<FormValues> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
          } else if (
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/.test(
              values.password,
            )
          ) {
            errors.password =
              "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <input
              className="input-text"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && (
              <p className="small-text">{errors.email}</p>
            )}
            <input
              className="input-text"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div className="check-strength-password">
              <div className={`lines ${values.password ? "valid" : ""}`}>
                <div
                  className={`line-1 ${values.password && /[a-z]/.test(values.password) ? "red" : "gray"}`}
                ></div>
                <div
                  className={`line-2 ${values.password && /[A-Z]/.test(values.password) ? "orange" : "gray"}`}
                ></div>
                <div
                  className={`line-3 ${values.password && /[\d@$!%*?&]/.test(values.password) ? "green" : "gray"}`}
                ></div>
              </div>
              {errors.password && touched.password && (
                <p className="small-text">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="full-width-button"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
