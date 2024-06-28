import React from "react";
import { TextInput } from "flowbite-react";

const ProfilePicUploader = ({ selectedImage, setSelectedImage }) => {
  const handleImageClick = () => {
    document.getElementById("profilePic").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center">
      <img
        src={selectedImage}
        alt="Profile"
        className="w-[100px] h-[100px] rounded-full cursor-pointer"
        onClick={handleImageClick}
      />
      <div className="hidden">
        <TextInput id="profilePic" type="file" onChange={handleImageChange} />
      </div>
    </div>
  );
};

export default ProfilePicUploader;
