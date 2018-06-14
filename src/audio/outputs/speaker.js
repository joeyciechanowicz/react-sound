import {Component} from 'react';
import {Audio} from '../audio';

export class Speaker extends Component {
    static contextTypes = Audio.ContextPropTypes;
  
    render() {
      return Audio.mapChildrenWithConnect(
        'Speaker',
        this.props.children,
        this.connectAudoNodeToSelf.bind(this)
      );
    }
  
    connectAudoNodeToSelf(audioNode) {
      audioNode.connect(this.context.audioContext.destination);
    }
  }