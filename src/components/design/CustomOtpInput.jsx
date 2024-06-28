
import React from "react";
import OtpInput from "react-otp-input";

const CustomOtpInput = ({
  value,
  onChange,
  numInputs,
  separator,
  inputStyle, 
}) => {
  return (
    <div className="flex justify-center items-center my-[1rem]">
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        separator={<span>{separator}</span>}
        inputStyle={inputStyle}
        renderInput={(props) => <input {...props} />}
        isInputNum
      />
    </div>
  );
};

export default CustomOtpInput;
