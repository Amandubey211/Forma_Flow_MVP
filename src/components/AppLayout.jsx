// import LenisWrapper from "../Wrappers/LenisWrapper";
import { Footer } from "./layout/Footer";
import { Navbar } from "./layout/Navbar";
import SEO from "./SEO/SEO";

const AppLayout = ({ children, seoProps }) => {
  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
          {/* <LenisWrapper>{children}</LenisWrapper> */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
