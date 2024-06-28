export const getAllAstrologers = async () => {
  try {
    const response = await fetch("/server/astrologers/astro", {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message;
      throw new Error(errorMessage || "get all astrologer failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "get all astrologer failed. Please try again later."
    );
  }
};

export const getAstrologerById = async (id) => {
  try {
    const response = await fetch(`/server/astrologers/astro/${id}`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message;
      throw new Error(errorMessage || "get astrologer failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "get astrologer failed. Please try again later."
    );
  }
};
