import useLenis from "../Hooks/useLenis";
const LenisWrapper = ({ children }) => {
  useLenis();
  return <div>{children}</div>;
};

export default LenisWrapper;
