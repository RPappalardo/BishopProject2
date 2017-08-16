import React, { Component } from 'react';
import { observer } from 'mobx-react';
import NRKeyHandler from './NRKeyHandler';
import Swipe from 'react-swipe-component';
import unclogo from './unclogo.png';
import cldslogo from './cldslogo.jpeg';
import SquareNum4 from './4_Square_Book.gif';
import SquareNum9 from './9_Location_Book.gif';
import SquareNum36 from './36_Location_Board.gif';
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
    return (<div id = "home">
           <center>
              <div>
                 <h2 style={{backgroundColor:'skyblue'}}>Universal Core Communication Systems</h2>
                 <img src={unclogo} style={{width: 170, height: 120}} alt=""/>
                 <img src={cldslogo} style={{width: 120, height: 120}} alt=""/>
              </div>
              <table id="table2">
                 <tbody>
                    <tr>
                       <td>
                          <h5>4 Square Universal Core Communication Book</h5>
                          <button>
                          <a href="/2/2/1" style={{ textDecoration: 'none' }}>
                          <img src={SquareNum4} alt="4 Square Book"/>
                          </a>
                          </button>
                       </td>
                       {"\n"}
                       <td>
                          <h5>9 Location Universal Core Communication Book</h5>
                          <button>
                          <a href="/3/3/1" style={{textDecoration: 'none'}}>
                          <img src={SquareNum9} alt="9 Square Book"/>
                          </a>
                          </button>
                       </td>
                       {"\n"}
                       <td>
                          <h5>36 Location Universal Core Communication Board</h5>
                          <button>
                          <a href="/6/6/1" style={{textDecoration: 'none'}}>
                          <img src={SquareNum36} alt="36 Square Board"/>
                          </a>
                          </button>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </center>
        </div>
      );
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
             background: store.selected+offset===i ? 'skyblue' : 'inherit' };
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
      const perpage = store.rows * store.cols;
      var npages = Math.ceil(words.length / perpage);
      const offset = (store.page - 1) * perpage;
      var s = store.selected + 1;
      if (s+offset === words.length) {
        store.setCoreView(store.rows, store.cols, 1);
        } else if (store.selected === perpage - 1) {
  console.log('nextpage');
   store.nextPage();
 } else {
        store.setSelected(s);
      }
    }
    function chooser() {
      const perpage = store.rows * store.cols;
      var npages = Math.ceil(words.length / perpage);
      const offset = (store.page - 1) * perpage;
      if (store.selected >= 0) {
        sayIt(offset + store.selected);
      }
    }
    return (
       <Swipe
              onSwipedLeft={store.backPage}
              onSwipedRight={store.nextPage}
              className="App"
            >
              {showback && <button className="nav" onClick={store.backPage}>Back</button>}
        <div className="symbols">
          {symbols}
        </div>
        {shownext &&
          <button className="nav" onClick={store.nextPage}>Next</button> }
        <NRKeyHandler keyValue={["ArrowRight"," "]} onKeyHandle={mover} />
          <NRKeyHandler keyValue={["ArrowLeft", "Enter"]} onKeyHandle={chooser} />      
    </Swipe>
    );
  }
}

const Core36 = observer(_Core36);

export default observer(App);
