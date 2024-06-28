export const guestSignIn = async (formData) => {
  try {
    const response = await fetch("/server/guests/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message;
      console.log("errorMessage:", errorMessage);
      throw new Error(errorMessage || "Guest Sign-In failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Guest Sign-In failed. Please try again later."
    );
  }
};

export const guestOtpVerify = async (otp) => {
  try {
    const response = await fetch("/server/guests/guest/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.errors && data.errors.length > 0
          ? data.errors.join(", ")
          : data.message;
      throw new Error(errorMessage || "otp verified failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "otp verified failed. Please try again later."
    );
  }
};

export const google = async (formData) => {
  try {
    const response = await fetch("/server/users/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Google authentication failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Google authentication failed. Please try again later."
    );
  }
};

export const astrologerSignIn = async (formData) => {
  try {
    const response = await fetch("/server/astrologers/astro/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message;
      console.log("errorMessage:", errorMessage);
      throw new Error(errorMessage || "Astrologer Sign-In failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Astrologer Sign-In failed. Please try again later."
    );
  }
};

export const astrologerSignUp = async (formData) => {
  try {
    const response = await fetch("/server/astrologers/astro/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message;
      console.log("errorMessage:", errorMessage);
      throw new Error(
        errorMessage || "Astrologer Sign-Up failed.Please check all fields"
      );
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Astrologer Sign-Up failed. Please try again later."
    );
  }
};

export const checkAuth = async () => {
  try {
    const response = await fetch("/server/auth/checkAuth", {
      method: "POST",
    });

    const data = await response.json();
    console.log("auth Api checkAuth data:", data);

    if (!response.ok) {
      const errorMessage = data.message;
      console.log("errorMessage:", errorMessage);
      throw new Error(
        errorMessage || "User Authentication failed.Please check all fields"
      );
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "User Authentication failed. Please try again later."
    );
  }
};

export const signOut = async () => {
  try {
    const response = await fetch("/server/auth/logout", {
      method: "POST",
    });

    const data = await response.json();
    console.log("auth Api checkAuth data:", data);

    if (!response.ok) {
      const errorMessage = data.message;
      console.log("errorMessage:", errorMessage);
      throw new Error(
        errorMessage || "User logout failed.Please check all fields"
      );
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "User logout failed. Please try again later."
    );
  }
};
