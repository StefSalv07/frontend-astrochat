const Button = ({ className, type, href, onClick, children, px, white }) => {
  // Define base classes for the button
  const baseClasses = `button relative inline-flex items-center justify-center h-11 transition-colors`;
  const hoverClasses = `hover:text-color-1`;
  const paddingClasses = px || "px-7";
  const textClasses = white ? "text-n-8" : "text-n-2";
  const additionalClasses = className || "";

  // Combine all classes
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses} ${textClasses} ${additionalClasses}`;

  // Classes for span element
  const spanClasses = "relative z-10";

  // Function to render button element
  const renderButton = () => (
    <button type={type || "button"} className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
    </button>
  );

  // Function to render link element
  const renderLink = () => (
    <a href={href} className={classes}>
      <span className={spanClasses}>{children}</span>
    </a>
  );

  // Render link if href is provided, otherwise render button
  return href ? renderLink() : renderButton();
};

export default Button;
