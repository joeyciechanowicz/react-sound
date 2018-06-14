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
              <Distortion amount={400} oversample={'4x'}>
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