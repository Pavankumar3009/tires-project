// // Contact.jsx
// import React from 'react';
// import './CSS/contact.css'; // Import CSS for Contact component styling

// const Contact = () => {
//   return (
//     <div className="contact-container">
//       <h2>Contact Us</h2>
//       <div className="contact-details">
//         <div className="detail">
//           <span>Email:</span>
//           <p>pavankumarbijjala@gmail.com</p>
//         </div>
//         <div className="detail">
//           <span>Phone:</span>
//           <p>+91 9133965525</p>
//         </div>
//         <div className="detail">
//           <span>Instagram:</span>
//           <p>@pavan_kumar3009</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
// Contact.jsx
import React from 'react';
import './CSS/contact.css'; // Import CSS for Contact component styling
import { FaEnvelope, FaPhone, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons library

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <div className="detail">
          <FaEnvelope className="icon" />
          <h3>Email:</h3>
          <p><a href="mailto:pavankumarbijjala@gmail.com">pavankumarbijjala@gmail.com</a></p>
        </div>
        <div className="detail">
          <FaPhone className="icon" />
          <h3>Phone:</h3>
          <p><a href="tel:+1234567890">+1234567890</a></p>
        </div>
        <div className="detail">
          <FaInstagram className="icon" />
          <h3>Instagram:</h3>
          <p><a href="https://www.instagram.com/@pavan_kumar3009/">@pavan_kumar3009</a>
</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

