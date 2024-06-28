import React, { useState } from "react";
import { HiMail, HiUser } from "react-icons/hi";
import { defaultUserImage } from "../../constants";
import {
  Button,
  Modal,
  TextInput,
  Spinner,
  Select,
  Alert,
} from "flowbite-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import ProfilePicUploader from "../design/ProfilePicUploader";
import OAuth from "../OAuth";
import {
  userSignUpAsync,
  userSignInAsync,
  selectLoading,
  selectUserSignInError,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function UserSignInModel({ show, onClose }) {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const signInError = useSelector(selectUserSignInError);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(defaultUserImage);
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn },
    reset: signInReset,
  } = useForm();
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
    reset: signUpReset,
  } = useForm();
  const [phone, setPhone] = useState("");

  const handleSignUpSuccess = async (data) => {
    const formData = {
      ...data,
      profilePic: selectedImage,
      phone: phone,
    };
    try {
      const result = await dispatch(userSignUpAsync(formData)).unwrap();
      console.log("signUP result: " + result);
      if (result.status === 200) {
        signUpReset();
        setShowSignUpForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInSuccess = async (formData) => {
    console.log("Sign In Data: ", formData);
    try {
      const result = await dispatch(userSignInAsync(formData)).unwrap();
      console.log("signIn result: " + result);
      if (result.status === 200) {
        onClose();
        setShowSignUpForm(false);
        signInReset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  return (
    <>
      {/* User SignIn Modal */}
      <Modal
        show={show}
        onClose={onClose}
        popup
        size="md"
        className="fixed top-0 right-0 z-50 h-full w-full flex items-center justify-center text-n-2 text-2xl"
      >
        <div className="max-w-md p-6 bg-n-1 rounded-lg shadow-lg">
          <Modal.Header />
          <Modal.Body>
            {signInError && <Alert color="failure">{signInError}</Alert>}
            {showSignUpForm ? (
              <>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-n-2">
                    Sign UP to our platform
                  </h3>
                  <form
                    className="flex max-w-md flex-col gap-4 justify-center"
                    onSubmit={handleSubmitSignUp(handleSignUpSuccess)}
                  >
                    {/* Profile Picture Upload */}
                    <ProfilePicUploader
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                    />

                    {/* User Name */}
                    <div>
                      <TextInput
                        id="userName"
                        name="userName"
                        type="text"
                        icon={HiUser}
                        placeholder="Enter User Name"
                        {...registerSignUp("userName", {
                          required: "User Name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "User Name should contain only alphabets",
                          },
                        })}
                      />
                      {errorsSignUp.userName && (
                        <p className="text-red-500 text-sm">
                          {errorsSignUp.userName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <TextInput
                        id="email"
                        name="email"
                        type="email"
                        icon={HiMail}
                        placeholder="name@flowbite.com"
                        {...registerSignUp("email", { required: true })}
                      />
                      {errorsSignUp.email && (
                        <p className="text-red-500 text-sm">
                          Email is required
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <PhoneInput
                        id="phone"
                        name="phone"
                        country={"in"}
                        value={phone}
                        onChange={handlePhoneChange}
                        inputStyle={{
                          width: "100%",
                          height: "41px",
                          borderRadius: "8px",
                          color: "black",
                        }}
                        dropdownStyle={{
                          color: "black",
                        }}
                      />
                      {errorsSignUp.phone && (
                        <p className="text-red-500 text-sm">
                          Phone number is required
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <TextInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        {...registerSignUp("password", { required: true })}
                      />
                      {errorsSignUp.password && (
                        <p className="text-red-500 text-sm">
                          Password is required
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <Select
                        id="gender"
                        name="gender"
                        {...registerSignUp("gender", { required: true })}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Select>
                      {errorsSignUp.gender && (
                        <p className="text-red-500 text-sm">
                          Gender is required
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      gradientDuoTone="purpleToPink"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" />
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>

                    {/* OAuth Providers */}
                    <OAuth />
                    {/* Sign Up Link */}
                    <div className="flex justify-between text-sm font-medium text-gray-500">
                      If You Have Alredy Account?&nbsp;
                      <p
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setShowSignUpForm(false)}
                      >
                        Login
                      </p>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-n-2">
                    Sign in to our platform
                  </h3>
                  <form
                    className="flex max-w-md flex-col gap-4"
                    onSubmit={handleSubmitSignIn(handleSignInSuccess)}
                  >
                    {/* Email */}
                    <div>
                      <TextInput
                        id="email1"
                        name="email"
                        type="email"
                        icon={HiMail}
                        placeholder="name@flowbite.com"
                        required
                        {...registerSignIn("email", { required: true })}
                      />
                      {errorsSignIn.email && (
                        <p className="text-red-500 text-sm">
                          Email is required
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <TextInput
                        id="password1"
                        name="password"
                        type="password"
                        placeholder="Enter Your Password"
                        required
                        {...registerSignIn("password", { required: true })}
                      />
                      {errorsSignIn.password && (
                        <p className="text-red-500 text-sm">
                          Password is required
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      gradientDuoTone="purpleToPink"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" />
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    {/* OAuth Providers */}
                    <OAuth />

                    {/* Sign Up Link */}
                    <div className="flex justify-between text-sm font-medium text-gray-500">
                      Not registered?&nbsp;
                      <p
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setShowSignUpForm(true)}
                      >
                        Create account
                      </p>
                    </div>
                  </form>
                </div>
              </>
            )}
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default UserSignInModel;
