import * as React from 'react';
import { observer } from 'mobx-react';
import KeyHandler from 'react-key-handler';

class NRKeyHandler extends React.Component {
  isDown = false;
  keyDown = (e) => {
    e.preventDefault();
    if (!this.isDown) {
      this.isDown = true;
      this.props.onKeyHandle(e);
    }
  }
  keyUp = (e) => {
    this.isDown = false;
  }
  render() {
    var keyValues = [];
    keyValues = keyValues.concat(this.props.keyValue);
    const handlers = keyValues.map(keyValue => (
      <div key={keyValue} >
        <KeyHandler
          keyEventName={'keydown'}
          keyValue={keyValue}
          onKeyHandle={this.keyDown}
        />
        <KeyHandler
          keyEventName={'keyup'}
          keyValue={keyValue}
          onKeyHandle={this.keyUp}
        />
      </div>)
    );
    return <div>{handlers}</div>;
  }
}

export default observer(NRKeyHandler);
