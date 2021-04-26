import {Facebook, Linkedin, Twitter} from "../Icons/Incons";

export default function Footer() {
  return <footer>
    <div className="icons">
      <Facebook />
      <Twitter />
      <Linkedin />
    </div>

    <div className="contact-us">
      <ul>
        <li>email@gmail.com</li>
        <li>FAQ</li>
        <li>הסדנא לידע ציבורי</li>
      </ul>
      <p>Contact us</p>
    </div>
  </footer>
}
