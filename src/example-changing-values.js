class App extends Component {

    constructor(props, ctx) {
      super(props, ctx);
  
      this.state = {
        frequency: 261.626,
        gain: 1.0,
        started: false
      };
    }
    
    start() {
      this.setState({started: true});
  
      setInterval(() => {
        if (this.state.frequency < 270) {
          this.setState({
            frequency: 391.995,
            gain: 0.0
          });
        } else {
          this.setState({
            frequency: 261.626,
            gain: 1
          })
        }
  
        
      }, 1100);
    }
  
    render() {
      if (!this.state.started) {
        return (
            <button type="button" onClick={() => this.start()}>Start</button>
        );
      }
  
      return (
        <Audio start={false}>
          <Speaker>
              <Gain amount={this.state.gain} rampTime={0.9} >
                <Wave frequency={this.state.frequency} type="sine" rampTime={0.9} />
              </Gain>
          </Speaker>
        </Audio>
      );
    }
  }