import React from "react";
import logo from "../assets/logo.png";

const NavLink = ({ children, href, isActive }) => (
  <a
    href={href}
    className={`px-2 py-2.5 text-sm font-medium leading-5 whitespace-nowrap hover:bg-red-800 hover:text-white focus:outline-none focus:underline focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white rounded-md ${
      isActive ? "bg-red-800 text-white" : ""
    }`} // Add active styles conditionally
  >
    {children}
  </a>
);

const navLinks = [
  { label: "Home", href: "/red-dashboard" },
  { label: "Attack", href: "/attack" },
  { label: "Attack-AI", href: "/attack-ai" },
  { label: "Scanner", href: "/scanner" },
  // { label: "Sign Out", href: "/" },
];

function RedHeader() {
  const [activeLink, setActiveLink] = React.useState(window.location.pathname); // Get initial active link based on pathname

  React.useEffect(() => {
    const handleLocationChange = () => setActiveLink(window.location.pathname);
    window.addEventListener("popstate", handleLocationChange); // Update active link on location change

    return () => window.removeEventListener("popstate", handleLocationChange); // Cleanup on unmount
  }, []);

  return (
    <header className="flex gap-0 justify-between self-stretch px-10 py-3 border-b border-gray-200 border-solid max-md:flex-wrap max-md:px-5">
      <div className="flex gap-4 my-auto text-lg font-bold tracking-tight whitespace-nowrap text-neutral-900">
        <img
          loading="lazy"
          src={logo}
          alt="CyberFront-AI"
          className="shrink-0 my-auto w-10"
        />
        <div className="py-2">CyberFront-AI</div>
      </div>
      <nav className="flex gap-4 pl-20 max-md:flex-wrap">
        <div className="flex gap-4 justify-between">
          {navLinks.map((link) => (
            <div key={link.label} className="py-2">
              <NavLink
                href={link.href}
                isActive={activeLink === link.href} // Pass active state to NavLink
              >
                {link.label}
              </NavLink>
            </div>
          ))}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8eef28e1735b01dafdd8b588b52899b218a2922e1f1cd50d95da918222240bb3?apiKey=e75ccc7a17304481abcd8e4795ef34fb&"
            className="shrink-0 w-10 h-10 aspect-square"
            alt="Relevant alt text describing the image"
          />
        </div>
      </nav>
    </header>
  );
}

export default RedHeader;
