import LenisWrapper from "../Wrappers/LenisWrapper";
import { Navbar } from "./layout/Navbar";
import SEO from "./SEO/seo";

const AppLayout = ({ children, seoProps }) => {
  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          <LenisWrapper>{children}</LenisWrapper>
        </main>
      </div>
    </>
  );
};

export default AppLayout;
