import "./form.css";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUp } from "../../store/slices/employeeSlice";
import { useDispatch } from "react-redux";
import InputMask from "react-input-mask";
const CustomForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        position_id: "",
        photo: [],
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(2, "min 2").required("required"),
        email: Yup.string().email("email is not valid").required("required"),
        phone: Yup.string().min(12, "min 2").required("required"),
        position_id: Yup.string().required("required"),
        photo: Yup.mixed().required("required"),
      })}
      onSubmit={(body, actions) => {
        dispatch(signUp(body));
        actions.resetForm();
      }}
    >
      {({ setFieldValue, handleChange, handleBlur }) => (
        <div className="form" id="formFocus">
          <h2>Working with POST request</h2>
          <Form>
            <ErrorMessage name="name" className="error" component="div" />
            <Field
              className="form__input"
              type="text"
              placeholder="Your name"
              name="name"
            />

            <ErrorMessage name="email" className="error" component="div" />
            <Field
              className="form__input"
              type="mail"
              placeholder="Email"
              name="email"
            />

            <ErrorMessage name="phone" className="error" component="div" />
            <Field name="phone">
              {({ field }) => (
                <InputMask
                  {...field}
                  mask="+38(099) 999-9999"
                  id="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form__input"
                />
              )}
            </Field>

            <ErrorMessage
              name="position_id"
              className="error"
              component="div"
            />
            <span>Select your position</span>
            <div className="form-select">
              <div className="custom-radio">
                <label>
                  <Field type="radio" name="position_id" value={"1"} />
                  <div className="custom-radio__label">
                    <span> Frontend developer</span>
                  </div>
                </label>
              </div>
              <div className="custom-radio">
                <label>
                  <Field type="radio" name="position_id" value={"2"} />
                  <div className="custom-radio__label">
                    <span>Backend developer</span>
                  </div>
                </label>
              </div>
              <div className="custom-radio">
                <label>
                  <Field type="radio" name="position_id" value={"3"} />
                  <div className="custom-radio__label">
                    <span>Designer</span>
                  </div>
                </label>
              </div>
              <div className="custom-radio">
                <label>
                  <Field type="radio" name="position_id" value={"4"} />
                  <div className="custom-radio__label">
                    <span>QA</span>
                  </div>
                </label>
              </div>
            </div>
            <ErrorMessage name="photo" className="error" component="div" />
            <label className="input-img" htmlFor="photo">
              <div className="input-img__left">
                <span>Upload</span>
              </div>
              <span className="input-img__right">Upload your photo</span>
              <input
                className="form-input__none"
                type="file"
                id="photo"
                name="photo"
                onChange={(event) => {
                  setFieldValue("photo", event.target.files[0]);
                }}
              />
            </label>
            <button className="form__submit buttonAndLink" type="submit">
              Sign up
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default CustomForm;
