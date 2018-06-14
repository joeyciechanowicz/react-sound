import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Audio extends Component {
    static ContextPropTypes = {
      audioContext: PropTypes.object,
      registerStart: PropTypes.func
    };
  
    constructor(props, context) {
      super(props, context);

      this.startCbs = [];
  
      this.registerStart = (startCb) => {
        this.startCbs.push(startCb);
      };
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  
    getChildContext() {
      const registerStart = this.registerStart.bind(this);
      return {
        audioContext: this.audioContext,
        registerStart: registerStart
      };
    }
  
    componentDidMount() {
      this.startCbs.forEach(x => x());
    }
    
    render() {
      return this.props.children;
    }

    static mapChildrenWithConnect(name, children, connectFunction) {

      const mappedChildren = React.Children.map(children, x => React.cloneElement(x, {
          connectAudoNodeToParent: connectFunction
        }
      ));

      return (
        <div className="audio-node">
          <span className="node-title">{name}</span>
          <div className="node-children">
            {mappedChildren}
          </div>
        </div>
      );
    }
  }
  Audio.childContextTypes = Audio.ContextPropTypes;