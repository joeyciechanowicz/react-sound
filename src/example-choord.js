class App extends Component {
  
    render() {
      return (
        <Audio start={true}>
          <Speaker>
  
            <Gain amount={0.1}>
              <Wave frequency={261.626} type="sine" />
            </Gain>

            <Gain amount={0.5}>
              <Wave frequency={311.127} type="sine" />
            </Gain>
  
            <Wave frequency={391.995} type="sine" />
          </Speaker>
        </Audio>
      );
    }
  }