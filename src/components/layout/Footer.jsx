import { Link } from "react-router-dom";
import { landingPageConfig } from "../../config/landingPage";

export const Footer = () => {
  const { footer } = landingPageConfig;

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-full lg:col-span-1 mb-8 lg:mb-0">
            <Link to="/" className="font-bold text-2xl">
              {footer.logo}
            </Link>
            <p className="mt-2 text-muted-foreground">{footer.tagline}</p>
          </div>

          <div className="text-sm">
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              {footer.links.product.map((link, index) => (
                <li key={`product-${index}`}>
                  <Link to={link.path} className="hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              {footer.links.company.map((link, index) => (
                <li key={`company-${index}`}>
                  <Link to={link.path} className="hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-muted-foreground">
              {footer.links.resources.map((link, index) => (
                <li key={`resources-${index}`}>
                  <Link to={link.path} className="hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-muted-foreground">
              {footer.links.legal.map((link, index) => (
                <li key={`legal-${index}`}>
                  <Link to={link.path} className="hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground text-center">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
