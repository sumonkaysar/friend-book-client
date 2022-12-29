import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {

  return (
    <section className="footer p-10 bg-neutral text-neutral-content">
      <div className="flex items-center">
        <img className="w-12" src={logo} alt="" />
        <h2 className="text-xl font-semibold">FriendBook</h2>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a href='https://www.facebook.com/sumon.kaysar.sk' target='_blank'>
            <FaFacebook className="text-2xl" />
          </a>
          <a href='https://facebook.com/sumon.kaysar.sk' target='_blank'>
            <FaYoutube className="text-2xl" />
          </a>
          <a href='https://www.linkedin.com/in/sumon-kaysar-5543781b8/' target='_blank'>
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
