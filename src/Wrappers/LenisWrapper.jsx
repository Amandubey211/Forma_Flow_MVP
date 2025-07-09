import useLenis from "../hooks/useLenis";
const LenisWrapper = ({ children }) => {
  useLenis();
  return <div>{children}</div>;
};

export default LenisWrapper;
