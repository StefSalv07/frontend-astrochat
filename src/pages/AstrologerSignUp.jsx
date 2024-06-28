import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { HiMail, HiUser } from "react-icons/hi";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProfilePicUploader from "../components/design/ProfilePicUploader";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  FileInput,
  Alert,
  Spinner,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  astrologerSignUpAsync,
  selectAstroSignUpError,
  selectLoading,
} from "../features/auth/authSlice";
import { categories } from "../constants";

function AstrologerSignUp() {
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const error = useSelector(selectAstroSignUpError);
  const loading = useSelector(selectLoading);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control, // Add control from useForm for useFieldArray
    watch,
  } = useForm();

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value) => {
    setPhone(value); // Update phone state with new value
  };
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  console.log("phone", phone);
  console.log("countryName", countryName);
  console.log("stateName", stateName);
  console.log("cityName", cityName);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links", // Name for the array field
  });

  // Watch for changes in the allSkills field to update the form data
  const allSkills = watch("allSkills");

  // Regular expression for validating URL format
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  const onSubmit = async (data) => {
    try {
      data.qualifications = data.qualifications
        .split(",")
        .map((qual) => qual.trim());

      const formData = {
        ...data,
        profilePic: selectedImage,
        pinCode: Number(data.pinCode),
        expirence: Number(data.expirence),
        hoursContribution: Number(data.hoursContribution),
        pricePerMin: Number(data.pricePerMin),
        minExpSal: Number(data.minExpSal),
        phone: phone,
        country: countryName,
        state: stateName,
        city: cityName,
      };

      const result = await dispatch(astrologerSignUpAsync(formData)).unwrap();
      console.log("result: " + result);
      if (result.status === 200) {
        navigate("/astrologer-signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Astrologer Sign Up</h2>
      {errors.submit && <Alert color="failure">{errors.submit.message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <>
            <div>
              <ProfilePicUploader
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>
            <div>
              <Label htmlFor="userName" value="User Name" />
              <TextInput
                id="userName"
                icon={HiUser}
                {...register("userName", { required: true })}
              />
              {errors.userName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
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
              <Label htmlFor="phone" value="Phone" />

              <PhoneInput
                id="phone"
                country={"in"}
                value={phone}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  border: "round",
                  height: "41px",
                  borderRadius: "8px",
                }}
              />
              {errors.phone && <span>{errors.phone.message}</span>}
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

            <div className="flex gap-5">
              <div className="flex-1">
                <Label htmlFor="gender" value="Gender" />
                <Select id="gender" {...register("gender", { required: true })}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
                {errors.gender && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="dateOfBirth" value="Date of Birth" />
                <TextInput
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", { required: true })}
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="langKnown" value="Languages Known" />
              <Select
                id="langKnown"
                {...register("langKnown", { required: true })}
                multiple
              >
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Bhojpuri">Bhojpuri</option>
              </Select>
              {errors.langKnown && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex justify-end">
              <Button outline pill onClick={() => setStep(2)}>
                <HiOutlineArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </>
        )}

        {/* Address */}
        {step === 2 && (
          <>
            <div className="flex gap-5">
              <div className="flex-1">
                <Label htmlFor="country" value="Country" />
                {/* <TextInput
                  id="country"
                  {...register("country", { required: true })}
                /> */}
                <CountrySelect
                  onChange={(e) => {
                    setCountryid(e.id);
                    setCountryName(e.name);
                  }}
                  placeHolder="Select Country"
                />
                {errors.country && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="state" value="State" />
                {/* <TextInput
                  id="state"
                  {...register("state", { required: true })}
                /> */}
                <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setstateid(e.id);
                    setStateName(e.name);
                  }}
                  placeHolder="Select State"
                />
                {errors.state && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              <div>
                <Label htmlFor="city" value="City" />
                {/* <TextInput
                  id="city"
                  {...register("city", { required: true })}
                /> */}
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(e) => {
                    console.log(e);
                    setCityName(e.name);
                  }}
                  placeHolder="Select City"
                />
                {errors.city && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div>
                <Label htmlFor="pinCode" value="Pin Code" />
                <TextInput
                  id="pinCode"
                  type="number"
                  {...register("pinCode", { required: true })}
                />
                {errors.pinCode && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="address" value="Address" />

              <Textarea
                id="address"
                placeholder=" Address..."
                {...register("address", { required: true })}
                rows={4}
              />
              {errors.address && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex justify-between">
              <Button outline pill onClick={() => setStep(1)}>
                <HiOutlineArrowLeft className="h-6 w-6" />
              </Button>
              <Button outline pill onClick={() => setStep(3)}>
                <HiOutlineArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </>
        )}

        {/* Qualification */}
        {step === 3 && (
          <>
            <div>
              <Label htmlFor="primarySkills" value="Primary Skills" />
              <Controller
                name="primarySkills"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    id="primarySkills"
                    multiple={true}
                    value={field.value || []}
                    onChange={(e) =>
                      field.onChange(
                        [...e.target.selectedOptions].map(
                          (option) => option.value
                        )
                      )
                    }
                    className="mt-1 block w-full"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.primarySkills && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="allSkills" value="All Skills" />
              <Controller
                name="allSkills"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    id="allSkills"
                    multiple={true}
                    value={field.value || []}
                    onChange={(e) =>
                      field.onChange(
                        [...e.target.selectedOptions].map(
                          (option) => option.value
                        )
                      )
                    }
                    className="mt-1 block w-full"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.allSkills && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <Label
                htmlFor="qualifications"
                value="Qualifications (ex. Bcom, Mcom)"
              />
              <TextInput
                id="qualifications"
                {...register("qualifications", { required: true })}
              />
              {errors.qualifications && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="expirence" value="Experience (in years)" />
              <TextInput
                id="expirence"
                type="number"
                {...register("expirence", { required: true })}
              />
              {errors.expirence && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* handle links */}
            <div className="gap-2 space-y-2">
              <Label htmlFor="links" value="Links" />
              {fields.map((field, index) => (
                <div key={field.id}>
                  <TextInput
                    id={`links${index}`}
                    type="url" // Set input type to URL
                    {...register(`links[${index}]`, {
                      required: true,
                      pattern: urlRegex,
                    })}
                  />
                  {errors.links?.[index] && (
                    <span className="text-red-500">
                      Please enter a valid URL
                    </span>
                  )}
                  {index > 0 && (
                    <Button type="button" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={() => append("")}>
                Add URL
              </Button>
            </div>

            <div>
              <Label htmlFor="longBio" value="Long Bio" />
              <Textarea
                id="longBio"
                placeholder="Enter Your Bio..."
                {...register("longBio", { required: true })}
                rows={4}
              />
              {errors.longBio && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex justify-between">
              <Button outline pill onClick={() => setStep(2)}>
                <HiOutlineArrowLeft className="h-6 w-6" />
              </Button>
              <Button outline pill onClick={() => setStep(4)}>
                <HiOutlineArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <Label htmlFor="hoursContribution" value="Hours Contribution" />
              <TextInput
                id="hoursContribution"
                type="number"
                {...register("hoursContribution", { required: true })}
              />
              {errors.hoursContribution && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="pricePerMin" value="Price Per Minute" />
              <TextInput
                id="pricePerMin"
                type="number"
                {...register("pricePerMin", { required: true })}
              />
              {errors.pricePerMin && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <Label htmlFor="serviceType" value="Your Service Type" />
              <TextInput id="serviceType" {...register("serviceType")} />
              {/* {errors.serviceType && (
                <span className="text-red-500">This field is required</span>
              )} */}
            </div>
            <div>
              <Label htmlFor="whyOnBoard" value="Why On Board" />
              <TextInput
                id="whyOnBoard"
                {...register("whyOnBoard", { required: true })}
              />
              {errors.whyOnBoard && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <Label
                htmlFor="mainSourceOfIncome"
                value="Main Source of Income"
              />
              <TextInput
                id="mainSourceOfIncome"
                {...register("mainSourceOfIncome", { required: true })}
              />
              {errors.mainSourceOfIncome && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="refFrom" value="Referred From" />
              <TextInput
                id="refFrom"
                {...register("refFrom", { required: true })}
              />
              {errors.refFrom && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <Label
                htmlFor="learnedAstrologyFrom"
                value="Learned Astrology From"
              />
              <TextInput
                id="learnedAstrologyFrom"
                {...register("learnedAstrologyFrom", { required: true })}
              />
              {errors.learnedAstrologyFrom && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <Label htmlFor="minExpSal" value="Minimum Expected Salary" />
              <TextInput
                id="minExpSal"
                type="number"
                {...register("minExpSal", { required: true })}
              />
              {errors.minExpSal && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex justify-start">
              <Button outline pill onClick={() => setStep(3)}>
                <HiOutlineArrowLeft className="h-6 w-6" />
              </Button>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            {error && <Alert color="failure">{error}</Alert>}
          </>
        )}
      </form>
    </div>
  );
}

export default AstrologerSignUp;
