import React, { useEffect, useState } from "react";
import { defaultUserImage } from "../constants";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Button, Spinner, Rating, Textarea } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAstrologerByIdAsync,
  selectAstrologers,
  selectLoading,
} from "../features/astrologer/astroSlice";
import {
  addRatingAsync,
  getRatingByAstrologerIdAsync,
  selectRatings,
} from "../features/rating/ratingSlice";
import { useForm } from "react-hook-form";
import { selectLoggedInUser, selectError } from "../features/auth/authSlice";

function AstroDetail() {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const loggedInUser = useSelector(selectLoggedInUser);
  const astro = useSelector(selectAstrologers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const allRatings = useSelector(selectRatings);
  const [ratings, setRatings] = useState(allRatings);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onRatingSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        rating: rating,
        astroId: id,
        userId: loggedInUser._id,
      };

      const result = await dispatch(addRatingAsync(formData)).unwrap();
      if (result) {
        setRatings((prevRatings) => [...prevRatings, result.data]);
        reset();
        setRating(0);
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  useEffect(() => {
    dispatch(getAstrologerByIdAsync(id));
    const result = dispatch(
      getRatingByAstrologerIdAsync({ astroId: id })
    ).unwrap();
    console.log("result:", result);
  }, [dispatch, id]);

  useEffect(() => {
    setRatings(allRatings);
  }, [allRatings]);

  return (
    <div className="max-w-5xl mx-auto py-5">
      {loading ? (
        <Spinner aria-label="Extra large spinner example" size="xl" />
      ) : (
        <div>
          <div className="border-2 border-gray-300 py-10 px-6 lg:px-10 xl:px-20">
            {astro && (
              <>
                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center mx-auto">
                  <div className="mb-6 md:mb-0">
                    <img
                      src={astro.image || defaultUserImage}
                      alt=""
                      className="h-36 md:h-60 lg:h-72 w-36 md:w-60 lg:w-72 rounded-full mx-auto md:mx-0"
                    />
                  </div>

                  <div className="text-center md:ml-10 md:text-left">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-red-900">
                      {astro.userName}
                    </p>
                    <p className="text-black text-lg md:text-xl mt-2">
                      {astro.primarySkills?.join(", ")}
                    </p>
                    <p className="text-gray-700 mt-2">
                      {astro.langKnown?.join(", ")}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Exp: {astro.experience} Years
                    </p>
                    <p className="text-gray-600 mt-2">
                      &#8377;{astro.pricePerMin}/min
                    </p>
                    <div className="mt-3">
                      <Button color="gray" pill>
                        <IoChatbubbleEllipsesOutline className="mr-5 h-5 w-5" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col justify-center">
                  <h1 className="font-bold text-xl text-gray-800">About Me</h1>
                  <p className="mt-2 body-2 tracking-wide text-gray-700">
                    {astro.about || "No description available."}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="border-2 border-gray-300 rounded-lg p-5 space-y-3">
              <h1 className="font-bold text-xl">Rating & Reviews</h1>
              <div className="mt-5">
                <Rating>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Rating.Star
                      key={value}
                      filled={value <= rating}
                      onClick={() => handleStarClick(value)}
                    />
                  ))}
                </Rating>
              </div>

              <form
                className="space-y-4"
                onSubmit={handleSubmit(onRatingSubmit)}
              >
                <div>
                  <Textarea
                    id="review"
                    name="review"
                    placeholder="Enter Your Review..."
                    rows={4}
                    {...register("review", { required: true })}
                  />
                  {errors.review && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <Button type="submit" color="warning" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-5">
              {error ? (
                "No review found"
              ) : (
                <>
                  <h1 className="font-bold text-xl">User Reviews</h1>
                  <div className="mt-5 space-y-4">
                    {ratings.map((rating) => (
                      <div
                        key={rating._id}
                        className="border-b-2 border-gray-200 pb-3"
                      >
                        <div className="flex gap-2 items-center">
                          <img
                            src={rating?.user?.profilePic || defaultUserImage}
                            alt="user Profile"
                            className="w-11 h-11 rounded-full"
                          />
                          <p className="text-gray-700 font-semibold">
                            {rating?.user?.userName || "Anonymous"}
                          </p>
                        </div>
                        <div className="mt-2">
                          <Rating>
                            {[1, 2, 3, 4, 5].map((value) => (
                              <Rating.Star
                                key={value}
                                filled={value <= rating.rating}
                              />
                            ))}
                          </Rating>
                        </div>

                        <div className="mt-2">
                          <p className="text-gray-700 font-semibold">
                            {rating.review}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AstroDetail;
