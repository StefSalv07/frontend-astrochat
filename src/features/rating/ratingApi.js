export const addRating = async (formData) => {
  try {
    const response = await fetch("/server/ratings/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Add Rating failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Add Rating failed. Please try again later."
    );
  }
};

export const getRatingByAstrologerId = async (astroId) => {
  try {
    const response = await fetch(`/server/ratings/rate/${astroId}`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Get Rating failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Get Rating failed. Please try again later."
    );
  }
};
