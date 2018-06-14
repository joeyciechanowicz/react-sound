import {Component} from 'react';
import {Audio} from '../audio';
import PropTypes from 'prop-types';

export class IIRFilter extends Component {
    static contextTypes = Audio.ContextPropTypes;

    constructor(props, context) {
        super(props, context);

        const fowards = props.forwards.map(x => parseFloat(x));
        const backwards = props.backwards.map(x => parseFloat(x));

        this.iirFilterNode = context.audioContext.createIIRFilter(fowards, backwards);

        props.connectAudoNodeToParent(this.iirFilterNode);
    }
  
    render() {
        const name = `IIRFilter forwards: [${this.props.forwards.join(',')}] backwards: [${this.props.backwards.join(',')}]`;

        return Audio.mapChildrenWithConnect(
            name,
            this.props.children,
            this.connectAudoNodeToSelf.bind(this)
        );
    }
  
    connectAudoNodeToSelf(audioNode) {
      audioNode.connect(this.iirFilterNode);
    }
}
IIRFilter.propTypes = {
    forwards: PropTypes.arrayOf(PropTypes.number).isRequired,
    backwards: PropTypes.arrayOf(PropTypes.number).isRequired,
};
