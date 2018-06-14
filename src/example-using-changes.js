class App extends Component {

    componentDidMount() {
      setTimeout(() => {
        this.setState({gain1: 1});
      }, 1000);
    }
  
    render() {
      const gain1 = this.state && this.state.gain1 ? this.state.gain1 : 0.5;
  
      return (
        <Audio start={true}>
          <Speaker>
            {/* <IIRFilter forwards={[0.1, 0.2, 0.3, 0.4, 0.5]} backwards={[0.5, 0.4, 0.3, 0.2, 0.1]}> */}
  
                <Delay amount={10.0}>
                  <Gain amount={gain1}>
                    <Wave frequency={261.626} type="sine" />
                  </Gain>
                </Delay>
  
                <Delay amount={170.0}>
                  <Gain amount={0.5}>
                    <Wave frequency={311.127} type="sine" />
                  </Gain>
                </Delay>
  
                <Wave frequency={391.995} type="sine" />
            {/* </IIRFilter> */}
          </Speaker>
        </Audio>
      );
    }
  }