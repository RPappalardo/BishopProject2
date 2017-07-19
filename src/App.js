import React, { Component } from 'react';
import { observer } from 'mobx-react';
import NRKeyHandler from './NRKeyHandler';
import './App.css';

var words = [
  'like',
  'want',
  'get',
  'make',
  'good',
  'more',
  'not',
  'go',
  'look',
  'turn',
  'help',
  'different',
  'I',
  'he',
  'open',
  'do',
  'put',
  'same',
  'you',
  'she',
  'that',
  'up',
  'all',
  'some',
  'it',
  'here',
  'in',
  'on',
  'can',
  'finish',
  'where',
  'what',
  'why',
  'who',
  'when',
  'stop'
];
console.log(words);

function sayIt(i) {
  var msg = new SpeechSynthesisUtterance(words[i]);
  msg.lang = 'en-US';
  speechSynthesis.speak(msg);
}

class App extends Component {
  render() {
    const store = this.props.store;
    if (store.view === 'landing') {
      return (<Landing store={store} />);
    } else if (store.view === 'core') {
      return (<Core36 store={store} />);
    } else {
      return (<h1>Error</h1>);
    }
  }
}

class _Landing extends Component {
  render() {
    return (<h1><a href="/2/2/1">Landing</a></h1>);
  }
}

const Landing = observer(_Landing);

class _Core36 extends Component {
  render() {
    const store = this.props.store;
    const perpage = store.rows * store.cols;
    var npages = Math.ceil(words.length / perpage);
    console.log('npages', npages);
    const offset = (store.page - 1) * perpage;
    const symbols = [];
    const showback = store.page > 1;
    const shownext = store.page < npages;
    const w = 100 / store.cols;
    const h = 100 / store.rows;
    for (var r = 0; r < store.rows; r++) {
      for (var c = 0; c < store.cols; c++) {
        const i = r * store.cols + c + offset;
        if (i < words.length) {
          const word = words[i];
          const url = process.env.PUBLIC_URL + `/symbols/${word}.png`;
          const style = { width: `${w}%`, height: `${h}%`, 
            background: store.selected===i ? 'red' : 'inherit' };
          symbols.push(
            <button
              key={word}
              className="symbol"
              style={style}
              onClick={() => sayIt(i)}
            >
              <div>
                <h1>{word}</h1>
                <img src={url} alt={word} />
              </div>
            </button>);
        }
      }
    }
    function mover() {
      console.log('mover');
      var s = store.selected + 1;
      if (s === words.length) {
        store.setView(store.rows, store.cols, 1);
        s = -1;
      } else if (store.selected % perpage === perpage - 1) {
        store.nextPage();
      }
      store.setSelected(s);
    }
    function chooser() {
      if (store.selected >= 0) {
        sayIt(store.selected);
      }
    }
    return (
      <div className="App">
        {showback && <button className="nav" >Back</button>}
        <div className="symbols">
          {symbols}
        </div>
        {shownext && 
          <button className="nav" onClick={store.nextPage}>Next</button> }
        <NRKeyHandler keyValue={["ArrowRight"," "]} onKeyHandle={mover} />
        <NRKeyHandler keyValue="ArrowLeft" onKeyHandle={chooser} />
      </div>
    );
  }
}

const Core36 = observer(_Core36);

export default observer(App);
