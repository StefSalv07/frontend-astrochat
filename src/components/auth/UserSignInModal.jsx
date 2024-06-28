import React, { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { HiMail, HiUser } from "react-icons/hi";
import { defaultUserImage } from "../../constants";
import {
  Button,
  Label,
  Modal,
  TextInput,
  Spinner,
  Select,
} from "flowbite-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import ProfilePicUploader from "../design/ProfilePicUploader"; // Import ProfilePicUploader
import OAuth from "../OAuth";

function UserSignInModel({ show, onClose }) {
  const [showSignUpModal, setShowSignUpModal] = useState(false); // State to manage SignUp modal visibility
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

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
    onClose(); // Close the SignIn modal when opening SignUp modal
  };

  const handleSignUpSuccess = (data) => {
    const formData = {
      ...data,
      profilePic: selectedImage,
      phone: phone,
    };
    console.log("Sign Up Data: ", formData);
    signUpReset();
    setShowSignUpModal(false);
    // show();
  };

  const handleSignInSuccess = (data) => {
    console.log("Sign In Data: ", data);
    // Add sign-in success handling here
    setShowSignUpModal(false);
    onClose();
    signInReset();
  };

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const loading = false;

  return (
    <>
      {/*  User SignIn Modal */}
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
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-n-2">
                Sign in to our platform
              </h3>
              <form
                className="flex max-w-md flex-col gap-4"
                onSubmit={handleSubmitSignIn(handleSignInSuccess)}
              >
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email1"
                      value="Your email"
                      className="text-n-2"
                    />
                  </div>
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
                    <p className="text-red-500 text-sm">Email is required</p>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="password1"
                      value="Your password"
                      className="text-n-2"
                    />
                  </div>
                  <TextInput
                    id="password1"
                    name="password"
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    {...registerSignIn("password", { required: true })}
                  />
                  {errorsSignIn.password && (
                    <p className="text-red-500 text-sm">Password is required</p>
                  )}
                </div>
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
                <OAuth />
              </form>
              <div className="flex justify-between text-sm font-medium text-gray-500">
                Not registered?&nbsp;
                <p
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={handleSignUpClick}
                >
                  Create account
                </p>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>

      {/* User SignUp Modal */}
      <Modal
        show={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        popup
        size="md"
        className="fixed top-0 right-0 z-50 h-full w-full flex items-center justify-center text-n-2 text-2xl"
      >
        <div className="max-w-2xl p-6 bg-n-1 rounded-lg shadow-lg">
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-n-2">
                Sign UP to our platform
              </h3>
              <form
                className="flex max-w-md flex-col gap-4 justify-center"
                onSubmit={handleSubmitSignUp(handleSignUpSuccess)}
              >
                {/* row 1 */}
                <ProfilePicUploader
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />

                <div>
                  <TextInput
                    id="userName"
                    name="userName"
                    type="text"
                    icon={HiUser}
                    placeholder="Enter User Name"
                    {...registerSignUp("userName", { required: true })}
                  />
                  {errorsSignUp.userName && (
                    <p className="text-red-500 text-sm">
                      User Name is required
                    </p>
                  )}
                </div>

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
                    <p className="text-red-500 text-sm">Email is required</p>
                  )}
                </div>

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

                <div>
                  <TextInput
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    {...registerSignUp("password", { required: true })}
                  />
                  {errorsSignUp.password && (
                    <p className="text-red-500 text-sm">Password is required</p>
                  )}
                </div>
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
                    <p className="text-red-500 text-sm">Gender is required</p>
                  )}
                </div>

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
                <OAuth />
              </form>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default UserSignInModel;
