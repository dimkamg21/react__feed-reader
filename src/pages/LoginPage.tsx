import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import cn from "classnames";
import { AuthContext } from "../components/Auth/AuthContext";
import { validateService } from "../helpers/validateService.ts";

export const LoginPage = () => {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validateOnMount={true}
      onSubmit={async ({ email, password }) => {
        try {
          setError("");

          await login(email, password);
        } catch (error) {
          // @ts-ignore
          setError(error.message); // Assuming error is an instance of Error
        }
      }}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="box box-position">
          <h1 className="title">Log in</h1>

          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>

            <div className="control has-icons-left has-icons-right">
              <Field
                validate={validateService.validateEmail}
                name="email"
                type="email"
                id="email"
                placeholder="e.g. bobsmith@gmail.com"
                className={cn("input", {
                  "is-danger": touched.email && errors.email,
                })}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>

              {touched.email && errors.email && (
                <span className="icon is-small is-right has-text-danger">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              )}
            </div>

            {touched.email && errors.email && (
              <p className="help is-danger">{errors.email}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>

            <div className="control has-icons-left has-icons-right">
              <Field
                validate={validateService.validatePassword}
                name="password"
                type="password"
                id="password"
                placeholder="*******"
                className={cn("input", {
                  "is-danger": touched.password && errors.password,
                })}
              />

              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>

              {touched.password && errors.password && (
                <span className="icon is-small is-right has-text-danger">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              )}
            </div>

            {touched.password && errors.password ? (
              <p className="help is-danger">{errors.password}</p>
            ) : (
              <p className="help">At least 6 characters</p>
            )}
          </div>

          <div className="field">
            <button
              type="submit"
              className={cn("button is-success has-text-weight-bold", {
                "is-loading": isSubmitting,
              })}
              disabled={isSubmitting || !!errors.email || !!errors.password}
            >
              Log in
            </button>

            {error && <p className="help is-danger pt-4">{error}</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
};
