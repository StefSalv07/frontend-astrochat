import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HiMail, HiUser } from "react-icons/hi";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  astrologerSignInAsync,
  selectError,
  selectLoading,
} from "../features/auth/authSlice";

function AstrologerLogin() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const result = await dispatch(astrologerSignInAsync(formData)).unwrap();
      console.log("result: " + result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg  my-10">
      <h2 className="text-2xl font-bold mb-6">Astrologer Login</h2>
      {errors.submit && <Alert color="failure">{errors.submit.message}</Alert>}
      {error && <Alert color="failure">{error}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            icon={HiMail}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div>
          <Label htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mt-5 flex justify-between">
          <p className="text-n-4">You Doesn't Have An Account?</p>
          <Link
            to={"/astrologer-signup"}
            className="hover:underline text-teal-600 hover:text-teal-900"
          >
            Create Account
          </Link>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}

export default AstrologerLogin;
