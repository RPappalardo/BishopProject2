import { extendObservable, computed, action } from 'mobx';

class Store {
  constructor() {
    extendObservable(this, {
      rows: 6,
      cols: 6,
      page: 1,
      
      selected: -1,

      view: 'landing',

      // screen dimensions updated on resize
      width: window.innerWidth,
      height: window.innerHeight

    });
  }

  currentPath = computed(() => {
    if (this.view === 'landing') {
      return '/';
    } else {
      return `/${this.rows}/${this.cols}/${this.page}`;
    }
  });

  setCoreView = action((r, c, p) => {
    this.view='core';
    this.rows = r;
    this.cols = c;
    this.page = p;
    this.selected = -1;
  });

  setLandingView = action(() => this.view = 'landing');

  nextPage = action.bound(() => {this.page += 1; this.selected=-1;});

  setSelected = action((i) => this.selected = i);

  resize = action(() => {
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;
  });
}

export default Store;
