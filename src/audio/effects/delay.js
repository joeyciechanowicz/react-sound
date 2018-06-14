import {Component} from 'react';
import {Audio} from '../audio';
import PropTypes from 'prop-types';

export class Delay extends Component {
    static contextTypes = Audio.ContextPropTypes;

    constructor(props, context) {
        super(props, context);

        const amount = parseFloat(props.amount);

        this.delayNode = context.audioContext.createDelay(amount);

        props.connectAudoNodeToParent(this.delayNode);
    }
  
    render() {
      return Audio.mapChildrenWithConnect(
        `Delay ${this.props.amount}`,
        this.props.children,
        this.connectAudoNodeToSelf.bind(this)
      );
    }
  
    connectAudoNodeToSelf(audioNode) {
      audioNode.connect(this.delayNode);
    }
}
Delay.propTypes = {
    amount: PropTypes.number.isRequired
};
