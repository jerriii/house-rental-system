const CrossIconSVG = ({
  width,
  height,
  fill,
}: {
  width?: string;
  height?: string;
  fill?: string;
}) => {
  return (
    <svg
      width={width || "27"}
      height={height || "27"}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="material-symbols-light:close">
        <path
          id="Vector"
          d="M7.19982 20.5966L6.40332 19.8001L12.7033 13.5001L6.40332 7.20006L7.19982 6.40356L13.4998 12.7036L19.7998 6.40356L20.5963 7.20006L14.2963 13.5001L20.5963 19.8001L19.7998 20.5966L13.4998 14.2966L7.19982 20.5966Z"
          fill={fill || "currentColor"}
        />
      </g>
    </svg>
  );
};

export default CrossIconSVG;
