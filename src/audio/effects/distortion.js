import {Component} from 'react';
import {Audio} from '../audio';
import PropTypes from 'prop-types';

export class Distortion extends Component {
    static contextTypes = Audio.ContextPropTypes;

    constructor(props, context) {
        super(props, context);

        this.distortionNode = context.audioContext.createWaveShaper();
        this.distortionNode.curve = this.makeDistortionCurve(props.amount);
        this.distortionNode.oversample = props.oversample;

        props.connectAudoNodeToParent(this.distortionNode);
    }

    makeDistortionCurve(amount) {
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        let i = 0;
        let x;
        for ( ; i < n_samples; ++i ) {
            x = i * 2 / n_samples - 1;
            curve[i] = ( 3 + amount ) * x * 20 * deg / ( Math.PI + amount * Math.abs(x) );
        }
        return curve;
    };
  
    render() {
      return Audio.mapChildrenWithConnect(
        `Distortion ${this.props.amount}, oversampled @ ${this.props.oversample}`,
        this.props.children,
        this.connectAudoNodeToSelf.bind(this)
      );
    }
  
    connectAudoNodeToSelf(audioNode) {
      audioNode.connect(this.distortionNode);
    }
}
Distortion.propTypes = {
    amount: PropTypes.number.isRequired,
    oversample: PropTypes.string.isRequired
};
