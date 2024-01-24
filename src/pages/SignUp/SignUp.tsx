import { useState } from "react";
// import { Formik } from "formik";
// import { FormValues } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { app, database } from "../../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SignUp() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const collectionRef = collection(database, "Users Data");

  const handleRegistration = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const currentUser = auth.currentUser;

      if (currentUser) {
        let pictureUrl = null;

        if (avatar) {
          const storage = getStorage(app);
          const storageRef = ref(
            storage,
            "avatars/" + currentUser?.uid + ".jpg",
          );
          await uploadBytes(storageRef, avatar);
          pictureUrl = await getDownloadURL(storageRef);
        }

        await updateProfile(currentUser, {
          displayName: userName,
          photoURL: pictureUrl,
        });

        console.log(response.user);
        const idToken = await currentUser.getIdToken();
        sessionStorage.setItem("Token", idToken);

        const docRef = await addDoc(collectionRef, {
          uid: currentUser.uid,
          userName: userName,
          fullName: fullName,
          email: currentUser.email,
          favoriteGifs: [],
          ...(avatar && { avatar: pictureUrl }),
        });

        const docId = docRef.id;

        await updateDoc(doc(collectionRef, docId), {
          docId: docId,
        });

        navigate("/main");
      }
    } catch (err: any) {
      console.error("Registration error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setAvatar(file);
    }
  };

  return (
    <div className="sign-up">
      <h2 style={{ textAlign: "center" }}>SignUp</h2>
      <form className="sign-up-form" onSubmit={handleRegistration}>
        <div className="primary-input-section">
          <label htmlFor="avatarInput" className="avatar-label">
            Choose Avatar
          </label>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="primary-input-section">
          <input
            className="input-text"
            type="text"
            placeholder="Full Name"
            onChange={handleFullnameChange}
          />
        </div>
        <div className="primary-input-section">
          <input
            className="input-text"
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="primary-input-section">
          <input
            className="input-text"
            type="text"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </div>
        <div className="primary-input-section">
          <input
            className="input-text"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="full-width-button">
          <span className="mid-header">Submit</span>
        </button>
      </form>
      {/* <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values: FormValues) => {
          const errors: Partial<FormValues> = {};

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
          handleRegistration();
          setSubmitting(false);
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
            <div className="primary-input-section">
              <input
                className="input-text"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <span className="message">
                {errors.email && touched.email && (
                  <p className="small-text">{errors.email}</p>
                )}
              </span>
            </div>
            <div className="primary-input-section">
              <input
                className="input-text"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <span className="message">
                {errors.password && touched.password && (
                  <p className="small-text">{errors.password}</p>
                )}
              </span>
            </div>
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
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="full-width-button"
            >
              <span className="mid-header">Submit</span>
            </button>
          </form>
        )}
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
