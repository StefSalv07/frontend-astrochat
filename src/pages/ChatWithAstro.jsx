import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { categories, languages, gender } from "../constants";
import { Button, Modal, Rating, Spinner, Toast } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAstrologersAsync,
  selectAstrologers,
  selectLoading,
} from "../features/astrologer/astroSlice";
import { img } from "../assets";

function ChatWithAstro() {
  const dispatch = useDispatch();
  const chatWithAstro = useSelector(selectAstrologers);
  const loading = useSelector(selectLoading);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [filteredAstros, setFilteredAstros] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showFilter, setShowFilter] = useState("Categories");

  useEffect(() => {
    dispatch(getAllAstrologersAsync());
  }, [dispatch]);

  useEffect(() => {
    filterData();
  }, [
    searchQuery,
    sortBy,
    selectedCategories,
    selectedLanguages,
    selectedGender,
    chatWithAstro,
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (setter, value) => (e) => {
    const checked = e.target.checked;
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const filterData = () => {
    let filteredData = Array.isArray(chatWithAstro)
      ? chatWithAstro.filter((astro) =>
          astro.userName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    if (sortBy) {
      const sortKey = sortBy.includes("pricePerMin")
        ? "pricePerMin"
        : "experience";
      const sortOrder = sortBy.includes("LowToHigh") ? 1 : -1;
      filteredData = filteredData.sort(
        (a, b) => (a[sortKey] - b[sortKey]) * sortOrder
      );
    }

    if (selectedCategories.length > 0) {
      filteredData = filteredData.filter((astro) =>
        selectedCategories.some((category) =>
          astro.primarySkills.includes(category)
        )
      );
    }

    if (selectedLanguages.length > 0) {
      filteredData = filteredData.filter((astro) =>
        selectedLanguages.some((lang) => astro.langKnown.includes(lang))
      );
    }

    if (selectedGender.length > 0) {
      filteredData = filteredData.filter((astro) =>
        selectedGender.includes(astro.gender)
      );
    }

    setFilteredAstros(filteredData);
  };

  const FilterOptions = ({ options, selected, setter }) => (
    <div className="flex flex-col justify-center space-y-3">
      {options.map((option, index) => (
        <div key={index} className="flex items-center mr-4">
          <input
            type="checkbox"
            id={`${option}-${index}`}
            value={option}
            checked={selected.includes(option)}
            onChange={handleFilterChange(setter, option)}
            className="mr-2"
          />
          <label htmlFor={`${option}-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );

  const handleChatClick = () => {
    alert(
      "this service is temporary  not available contact admin for the service."
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {loading ? (
        <Spinner aria-label="Loading astrologers" size="xl" />
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="heading mb-4 md:mb-0">
              <p>Astrologers</p>
            </div>
            <div className="flex items-center mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search Name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 border border-gray-300 rounded-md mr-2"
              />
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 border border-gray-300 rounded-md mr-2"
              >
                <option value="">Sort By</option>
                <option value="expLowToHigh">Exp: Low to High</option>
                <option value="expHighToLow">Exp: High to Low</option>
                <option value="pricePerMinLowToHigh">Price: Low to High</option>
                <option value="pricePerMinHighToLow">Price: High to Low</option>
              </select>
              <Button onClick={() => setOpenModal(true)}>Filter</Button>
            </div>
          </div>

          {/* Astrologers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
            {filteredAstros.length > 0 ? (
              filteredAstros.map((astro) => (
                <div
                  key={astro._id}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <Link to={`/astro-Details/${astro._id}`}>
                      <img
                        // src={
                        //   astro.image ||
                        //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        // }
                        src={astro.image || img}
                        alt={astro.userName}
                        className="h-32 w-32 rounded-full shadow-lg mb-4 sm:mb-0 sm:mr-6"
                      />
                    </Link>
                    <div className="text-center sm:text-left">
                      <p className="text-2xl font-semibold text-gray-800">
                        {astro.userName}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {astro.primarySkills.join(", ")}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {astro.langKnown.join(", ")}
                      </p>
                      <p className="my-2">Exp: {astro.experience} Years</p>
                      <p className="text-gray-600 mt-2">
                        &#8377;{astro.pricePerMin}/min
                      </p>
                      <Button
                        pill
                        outline
                        gradientDuoTone="purpleToBlue"
                        size="lg"
                        className="mt-3 rounded-3xl"
                        onClick={handleChatClick}
                      >
                        Chat{" "}
                        <IoChatbubbleEllipsesOutline className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No astrologers found.</p>
            )}
          </div>

          {/* Filter Modal */}
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Filters</Modal.Header>
            <Modal.Body>
              <div className="flex flex-row">
                <div className="flex flex-col flex-1 space-y-2 text-md">
                  <p
                    onClick={() => setShowFilter("Categories")}
                    className="hover:cursor-pointer hover:text-green-900"
                  >
                    Categories
                  </p>
                  <p
                    onClick={() => setShowFilter("Languages")}
                    className="hover:cursor-pointer hover:text-green-900"
                  >
                    Languages
                  </p>
                  <p
                    onClick={() => setShowFilter("Gender")}
                    className="hover:cursor-pointer hover:text-green-900"
                  >
                    Gender
                  </p>
                </div>
                <div className="flex flex-1">
                  {showFilter === "Categories" && (
                    <FilterOptions
                      options={categories}
                      selected={selectedCategories}
                      setter={setSelectedCategories}
                    />
                  )}
                  {showFilter === "Languages" && (
                    <FilterOptions
                      options={languages}
                      selected={selectedLanguages}
                      setter={setSelectedLanguages}
                    />
                  )}
                  {showFilter === "Gender" && (
                    <FilterOptions
                      options={gender}
                      selected={selectedGender}
                      setter={setSelectedGender}
                    />
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ChatWithAstro;
