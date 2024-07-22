import React, { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import {
  Button,
  Label,
  Modal,
  TextInput,
  Spinner,
  Alert,
} from "flowbite-react";
import {
  guestSignInAsync,
  selectGuestSignInError,
  selectLoading,
  guestOtpVerifyAsync,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CustomOtpInput from "../design/CustomOtpInput";
import {useNavigate} from "react-router-dom"

function GuestSignInModal({ show, onClose }) {
  const navigate=useNavigate();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectGuestSignInError);

  const handleBackButton = () => {
    setShowOtpForm(false);
  };

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const result = await dispatch(guestSignInAsync(formData)).unwrap();
      if (result.status === 200) {
        setShowOtpForm(true);
        reset();
      }
    } catch (error) {
      console.error("Sign-in error: ", error);
    }
  };

  const handleOtpFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("otp value:", otp);
      const result = await dispatch(guestOtpVerifyAsync({ otp })).unwrap();
      if (result) {
        setShowOtpForm(false);
        onClose();
        reset();
        navigate("/chat-with-astro")
      }
    } catch (error) {
      console.error("OTP submission error: ", error);
    }
  };

  // Custom handler for OTP change
  const handleOtpChange = (otpValue) => {
    console.log(otpValue);
    setOtp(otpValue);
  };

  return (
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
              Sign in As Guest to our platform
            </h3>
            {error && <Alert color="failure">{error}</Alert>}

            {!showOtpForm ? (
              <form
                className="flex max-w-md flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="userName"
                      value="Your Name"
                      className="text-n-2"
                    />
                  </div>
                  <TextInput
                    id="userName"
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("userName", { required: true })}
                  />
                  {errors.userName && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email"
                      value="Your email"
                      className="text-n-2"
                    />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="phone"
                      value="Your phone"
                      className="text-n-2"
                    />
                  </div>
                  <TextInput
                    id="phone"
                    type="tel"
                    placeholder="Enter Your phone"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
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
              </form>
            ) : (
              <>
                <form
                  className="flex max-w-md flex-col gap-4"
                  onSubmit={handleOtpFormSubmit}
                >
                  <div>
                    <p className="text-xl font-medium text-n-2">
                      Please Check Your Inbox
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="otp"
                        value="Your OTP"
                        className="text-n-2"
                      />
                    </div>

                    <CustomOtpInput
                      value={otp}
                      onChange={handleOtpChange}
                      id="otp"
                      type="text"
                      numInputs={6}
                      separator=""
                      inputStyle={{
                        width: "3rem",
                        height: "3rem",
                        margin: "0 0.2rem",
                        fontSize: "2rem",
                        borderRadius: "8px",
                        border: "2px solid #000",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="text-black"
                    />
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
                      "Submit OTP"
                    )}
                  </Button>
                  <Button onClick={handleBackButton}>
                    <HiOutlineArrowLeft className="h-5 w-5 mr-2 hover:mr-4" />
                    Go Back
                  </Button>
                </form>
              </>
            )}
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default GuestSignInModal;
