import "./FooterStyles.css";
import deliLogoOrange from "../../assets/deli-logo-orange.png";


export const Footer = () => {
  return (
    <footer>
      <div className="footerContent">
        <p>Copyright © 2024</p>
        <img src={deliLogoOrange} alt="Footer Image" />
      </div>
    </footer>
  );
};
