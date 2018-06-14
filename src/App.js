import React, {Component} from 'react';

import {
  Audio,
  Wave,
  Speaker,
  Gain,
  Distortion,
  // Delay,
  IIRFilter
} from './audio';

const notes = {
  c4: 261,
  e4: 329,
  g4: 391,
  c5: 523,
  c3: 130
};

class App extends Component {

  constructor(p, c) {
    super(p, c);

    this.state = {
      gain: 0,
      on: false
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.on === false) {
        this.setState({
          on: true,
          gain: 1.0
        });
      } else {
        this.setState({
          on: false,
          gain: 0.0
        });
      }
    }, 1000);
  }
  
  render() {
    return (
        <Audio>
          <Speaker>
            <Distortion amount={50} oversample={'8x'}>
              <IIRFilter forwards={[0.1, 0.2, 0.3, 0.4, 0.5]} backwards={[0.5, 0.4, 0.3, 0.2, 0.1]}>
                <Gain amount={this.state.gain} rampTime={1.0}>
                  <Wave type="triangle" frequency={notes.c3} />
                </Gain>

                <Gain amount={(this.state.gain + 0.1) / 2}>
                  <Wave type="sine" frequency={notes.c4} />
                </Gain>
              </IIRFilter>
            </Distortion>
          </Speaker>
        </Audio>
    );
  }
}

export default App;
