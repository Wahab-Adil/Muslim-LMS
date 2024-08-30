import PropTypes from "prop-types";

// ----------------------------------------------------------------------

// eslint-disable-next-line import/extensions
const loadFeatures = () => import("./features.jsx").then((res) => res.default);

MotionLazyContainer.propTypes = {
  children: PropTypes.node,
};

export default function MotionLazyContainer({ children }) {
  return children;
}
