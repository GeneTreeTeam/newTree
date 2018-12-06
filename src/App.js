import React, { Component } from 'react';
import Carousel from './Components/GUI Components/Carousel';
import NarbarFeature from "./Components/GUI Components/NarbarFeatures";
import FooterPage from "./Components/GUI Components/Footer";
import FormsPage3 from "./Components/Signin Components/Forgotpassword";
class App extends Component {


  render() {
    return(
      <div>
          <NarbarFeature/>
          <FormsPage3/>
          <div>
              <Carousel/>
          </div>
          <FooterPage/>
      </div>
    );
  }
}

export default App;
