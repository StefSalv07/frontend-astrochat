const MenuSvg = ({ openNavigation }) => {
  return (
    <svg
      className="overflow-visible"
      width="20"
      height="12"
      // viewBox="0 0 20 12"
    >
      {/* arrow 1(-) */}
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill="white"
        //tranfrom to = to x
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      {/* arrow 2(-) */}
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "10"}
        width="20"
        height="2"
        rx="1"
        fill="white"
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
      {/* both coombination()=*/}
    </svg>
  );
};

export default MenuSvg;
