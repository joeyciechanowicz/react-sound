import {Component} from 'react';
import {Audio} from '../audio';
import PropTypes from 'prop-types';

export class Gain extends Component {
    static contextTypes = Audio.ContextPropTypes;

    constructor(props, context) {
        super(props, context);

        const amount = parseFloat(props.amount);

        this.gainNode = context.audioContext.createGain();
        this.gainNode.gain.value = amount;

        props.connectAudoNodeToParent(this.gainNode);

        let rampTime = props.rampTime;
        if (!props.rampTime) {
          rampTime = 0.0;
        }

        this.state = {
            amount: props.amount,
            rampTime: rampTime
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.amount === prevState.amount) {
          return null;
        }

        return {
          amount: nextProps.amount
        };
    }
  
    render() {
      const amount = parseFloat(this.state.amount);

      if (amount !== this.gainNode.gain.value) {
        if (this.props.rampTime) {
          const rampTime = parseFloat(this.props.rampTime);
          this.gainNode.gain.linearRampToValueAtTime(amount, this.context.audioContext.currentTime + rampTime);
        } else {
          this.gainNode.gain.setValueAtTime(amount, this.context.audioContext.currentTime);
        }        
      }

      return Audio.mapChildrenWithConnect(
        `Gain ${amount}`,
        this.props.children,
        this.connectAudoNodeToSelf.bind(this)
      );
    }
  
    connectAudoNodeToSelf(audioNode) {
      audioNode.connect(this.gainNode);
    }
}
Gain.propTypes = {
    amount: PropTypes.number.isRequired,
    rampTime: PropTypes.number
};
