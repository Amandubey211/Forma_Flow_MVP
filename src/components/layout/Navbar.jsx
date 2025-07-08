import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { landingPageConfig } from "../../config/landingPage";
import ThemeToggle from "../ui/ThemeToggle";

export const Navbar = () => {
  const { navbar } = landingPageConfig;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Link to="/" className="font-bold text-lg">
          {navbar.logo}
        </Link>
        {/* <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navbar.links.map((link, index) => (
            <Link key={index} to={link.path} className="hover:text-foreground">
              {link.name}
            </Link>
          ))}
        </nav> */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navbar.links.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          {/* <Link to={navbar.cta.login.path}>
            <Button variant="ghost">{navbar.cta.login.text}</Button>
          </Link> */}
          {/* <Link to={navbar.cta.getStarted.path}>
            <Button variant="ghost">
              {navbar.cta.getStarted.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
};
