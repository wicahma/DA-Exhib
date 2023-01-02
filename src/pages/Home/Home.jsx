import React, { Fragment } from "react";
import { AboutComponent } from "../../components/Home/AboutComponent";
import { Hero } from "../../components/Home/Hero";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <Hero />
        <div className="bg-stone-900 pb-20 px-20 mb-10">
          <h3 className="font-serif text-5xl py-8 text-white text-center">About Creator</h3>
          <div className="w-[80%] mx-auto grid grid-cols-4 gap-4 ">
            <AboutComponent
              role="Product Owner"
              ImgUrl="12"
              name="Teguh Dwi Cahya Kusuma"
            />
            <AboutComponent
              role="Backend Developer"
              ImgUrl="14"
              name="Naufal Firoos Asy Syarif"
            />
            <AboutComponent
              role="Database Designer"
              ImgUrl="11"
              name="Wardah Assifa"
            />
            <AboutComponent
              role="UI/UX Designer"
              ImgUrl="2"
              name="Nur Anisatun Azzizah"
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
