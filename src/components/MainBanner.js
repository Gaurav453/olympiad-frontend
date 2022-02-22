

import MainBanner from '../assets/images/about-usbanner.jpg';

const AboutPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${MainBanner})`,
        height:"100%"
      }}
      className="main-banner"
    ></div>
  );
};

export default AboutPage;
