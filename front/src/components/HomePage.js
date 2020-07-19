import React from 'react';
import Background from '../images/background.jpg';

var sectionStyle = {
  height: `620px`,
  opacity: `85%`,
  backgroundImage: `url(${Background})`,
  backgroundSize: `cover`,
  boxShadow: '10px 20px 30px gray',
};

const HomePage = () => (
  <section style={sectionStyle}>
    <div className="sectionHomePage">
      <h1>Welcome to our Doll's Closet!!</h1>
    </div>
  </section>
);

export default HomePage;
