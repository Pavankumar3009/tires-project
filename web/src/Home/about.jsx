// About.jsx
import React from 'react';
import './CSS/about.css'; // Import CSS for About component styling
import tireImage from './tire.jpg'; // Import the tire image

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <div className="content">
        <div className="text">
          <h3 >

          Our website is aimed at improving road safety on the Telangana State Turn Pike (TSTP), one crucial component is the Image Analysis Module. This module serves as the backbone for assessing tire conditions captured by the cameras installed at toll plazas. Upon vehicle stops, these cameras swiftly capture tire images, which are then uploaded to the Thread Insights web app. The Image Analysis Module is responsible for processing these images, employing machine learning and computer vision algorithms to evaluate tire conditions accurately. Leveraging image recognition techniques, it assesses the tire tread depth, wear patterns, and potential damages. The analyzed data generates a comprehensive feedback report on the tire&apos;s condition, ranging from optimal to hazardous. This information triggers an automated SMS alert to the vehicle owner, highlighting the tire&apos;s state and emphasizing the urgency for inspection or replacement. This database facilitates regular fortnightly checks, allowing authorities to track the number of vehicles with defective tires on the highway, enabling targeted interventions and fostering a safer road environment for all commuters.
          </h3>
          {/* Add more content as needed */}
        </div>
        <div className="image-container">
          <img src={tireImage} alt="Tire" className="tire-image" />
        </div>
      </div>
    </div>
  );
};

export default About;
