import useLocale from "../hook/useLocales";
const TextError = (props) => {
  const { translate } = useLocale();
  return (
    <h3
      style={{ fontSize: ".7rem", fontFamily: "Raleway", fontWeight: "bold" }}
      className="text-red-600"
    >
      {translate(props.error)}
    </h3>
  );
};
export default TextError;
