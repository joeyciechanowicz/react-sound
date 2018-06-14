import React, {Component} from 'react';
import {Audio} from '../audio';
import PropTypes from 'prop-types';

export class Wave extends Component {
    static contextTypes = Audio.ContextPropTypes;
    started = false;
  
    constructor(props, context) {
      super(props, context);
  
      this.oscillatorNode = context.audioContext.createOscillator();
      this.oscillatorNode.type = props.type;
      this.oscillatorNode.frequency.setValueAtTime(props.frequency, this.context.audioContext.currentTime);  // value in hertz
  
      this.context.registerStart(() => {
        this.oscillatorNode.start();
      });

      this.state = {
        frequency: props.frequency
      };

      props.connectAudoNodeToParent(this.oscillatorNode);
    }

    stop() {
      this.oscillatorNode.stop();
      this.setState({stopped: true});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.frequency === prevState.frequency) {
        return null;
      }

      return {
        frequency: nextProps.frequency
      };
    }
  
    render() {
      const amount = parseFloat(this.state.frequency);

      if (amount !== this.oscillatorNode.frequency.value) {
        if (this.props.rampTime) {
          const rampTime = parseFloat(this.props.rampTime);
          this.oscillatorNode.frequency.linearRampToValueAtTime(amount, this.context.audioContext.currentTime + rampTime);
        } else {
          this.oscillatorNode.frequency.setValueAtTime(amount, this.context.audioContext.currentTime);
        }        
      }

      return (
        <div className="audio-node">
          <span className="node-title">{this.props.type} wave @ {this.props.frequency} Hz</span>
          { !this.state.stopped && 
            <button type="button" onClick={() => this.stop()}>Stop</button>
          }
        </div>
      );
    }
  }
  Wave.propTypes = {
    frequency: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['sine', 'square', 'sawtooth', 'triangle']).isRequired,
    rampTime: PropTypes.number
  };