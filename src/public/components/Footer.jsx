import { Link } from "react-router-dom";
import { Heart, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import PsychoTalkLogoTrans from "../../public/assets/psychotalk_logo_trans.webp";
const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: "About",    path: "/about"   },
    { name: "Experts",  path: "/experts" },
    { name: "Contact",  path: "/contact" },
    { name: "FAQ",      path: "/faq"     },
    { name: "Privacy",  path: "/privacy" },
    { name: "Terms",    path: "/terms"   },
  ];

  const socials = [
    { icon: <Twitter size={15} />,   href: "#", label: "Twitter"   },
    { icon: <Instagram size={15} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={15} />,  href: "#", label: "LinkedIn"  },
    { icon: <Youtube size={15} />,   href: "#", label: "YouTube"   },
  ];

  return (
    <footer
      className="w-full"
      style={{ background: "linear-gradient(135deg,#4f1a8a 0%,#3C9BF9 60%,#9100BD 100%)" }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 py-5">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg  flex items-center justify-center">
              <span className="text-xs font-bold"><img src={PsychoTalkLogoTrans} alt="P" /></span>
            </div>
            <span className="text-white font-bold text-lg">MindMate</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {links.map(({ name, path }) => (
              <Link key={path} to={path}
                className="text-white/70 hover:text-white text-xs font-medium transition-colors duration-150">
                {name}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2 shrink-0">
            {socials.map((s, i) => (
              <a key={i} href={s.href} aria-label={s.label}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/25
                           flex items-center justify-center
                           text-white/70 hover:text-white
                           transition-all duration-150">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-4 pt-4 border-t border-white/15
                        flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="text-white/50 text-[11px]">
            © {year} MindMate. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-white/50 text-[11px]">
            Made with <Heart size={10} className="text-pink-300 fill-pink-300" /> for mental wellness
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;