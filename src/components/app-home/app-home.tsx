import { Component, h, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Title } from '../../models/title';

@Component({
  tag: 'app-home',
  shadow: false
})
export class AppHome {
  @Prop() titles: Title[];
  @Prop() match: MatchResults;

  componentWillRender() {
    // main page title
    const title = document.getElementsByTagName('title');
    if (title && title[0]) {
      title[0].innerText = 'Neverslair Blog: home';
    }
  }

  render() {
    if (this.match) {
      return (
        <div class="app-home hero-body">
          <div class="routePath">
            You are here: <ul><li>home</li><li>first subpage</li></ul>
          </div>
          {(() => {
            switch (this.match.url) {
              case '/page': <app-page title={this.match.params.title} id={this.match.params.id}><slot></slot></app-page>;
              case '/blog': <app-blogdetail><slot></slot></app-blogdetail>
              case '/contact': <app-contact><slot></slot></app-contact>
              default: <app-bloglist match={this.match}></app-bloglist>;
            }
          })()}
        </div>
      );
    }
  }
}
