import { Component, h, Prop } from '@stencil/core';
import { fetchData } from '../../libs/fetch';
import { Title } from '../../models/title';
import { Blog } from '../../models/blog';
import { Page } from '../../models/page';
import { env } from '../../environment';

@Component({
  tag: 'app-root',
  // styleUrl: '../../assets/styles/showcase.css',
  shadow: false
})
export class AppRoot {
  @Prop() titles: Title[] = [];
  @Prop() blog: Blog;
  @Prop() page: Page;

  async componentWillLoad() {
    const fetcher = new fetchData();
    await fetcher.returnTitles().then(() => {
      this.titles = fetcher.receivedTitles as Title[];
      return;
    });
  }

  componentDidRender() {
    const menu = document.getElementById('topMenu');
    menu.classList.add('sticky');
  }

  toggleBurger() {
    let burgerIcon = document.getElementById('navbar-burger');
    let dropMenu = document.getElementById('mobile-nav');
    burgerIcon.classList.toggle('is-active');
    dropMenu.classList.toggle('is-active');
  }

  render() {
    if (this.titles) {
      return [
          <div class="header-wrapper" id="home">
            <section class="hero is-large">
              <nav class="navbar is-transparent is-hidden-desktop">
                <div class="navbar-brand">
                  <button name="menu" class="navbar-burger burger" data-target="mobile-nav" id="navbar-burger" onClick={this.toggleBurger}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
                <div id="mobile-nav" class="navbar-menu">
                  <div class="navbar-end">
                    <stencil-route-link url="/#ptop" onClick={this.toggleBurger} anchorRole="link" anchorTitle="Home">
                      <div class="navbar-item">
                        Home
                    </div>
                    </stencil-route-link>
                    {this.titles.map((title) =>
                      !title.hidden
                        ?
                        <stencil-route-link url={'/page/' + title.id + '/' + title.cleanedTitle + '/#ptop'} anchorRole="link" anchorTitle={title.Title}>
                          <div class="navbar-item">
                            {title.Title}
                          </div>
                        </stencil-route-link>
                        : <span />
                    )}
                    <stencil-route-link url={'/contact/#ptop'}>
                      <div class="navbar-item">
                        Contact
                    </div>
                    </stencil-route-link>
                  </div>
                </div>
              </nav>
              <div class="hero-body">
                <div class="container has-text-centered banner-text">
                  <stencil-route-link url='/#ptop' anchorRole="link" anchorTitle="Home" exact={true}>
                    <h1 class="subtitle">{env.INTRO}</h1>
                    <h1 class="title">{env.SITENAME}</h1>
                    <h1 class="subtitle profession">{env.SLOGAN}</h1>
                  </stencil-route-link>
                </div>
              </div>
              <div class="hero-foot" id="topMenu">
                <div class="hero-foot--wrapper">
                  <div class="columns">
                    <div class="column is-12 is-size-5 hero-menu-desktop">
                      <ul>
                        <li>
                          <stencil-route-link url="/#ptop" anchorRole="link" anchorTitle="Home" exact={true}>
                            <i class="fas fa-home fa-2x"></i>
                          </stencil-route-link>
                        </li>
                        {this.titles.map((title) =>
                          !title.hidden
                            ?
                            <li>
                              <stencil-route-link class="centermenu" url={'/page/' + title.id + '/' + title.cleanedTitle + '/#ptop'} anchorRole="link" anchorTitle={title.Title} activeClass="is-active" exact={true}>{title.Title}</stencil-route-link>
                            </li>
                            : <span />
                        )}
                        <li><stencil-route-link class="centermenu" url={'/contact/#ptop'} anchorRole="link" anchorTitle="Contact" activeClass="is-active" exact={false}>Contact</stencil-route-link></li>
                      </ul>
                      <div class="social">
                        <a rel="noreferrer" href="https://twitter.com/OliverNBLOG" target="_blank" title="Oliver Leitner Twitter"><i class="fab fa-twitter-square fa-2x"></i></a>
                        <a rel="noreferrer" href="https://github.com/OliverLeitner" target="_blank" title="Oliver Leitner Github"><i class="fab fa-github-square fa-2x"></i></a>
                        <a rel="noreferrer" href="https://www.xing.com/profile/Oliver_Leitner3" target="_blank" title="My Xing profile"><i class="fab fa-xing-square fa-2x"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>,
          <div class="main-content">
            <main>
              <stencil-router>
                <stencil-route-switch scrollTopOffset={0}>
                  <stencil-route url='/:number' component='app-bloglist' exact={true} />
                  <stencil-route url='/page/:id/:title/' component='app-page' componentProps={{ titles: this.titles }} exact={true} />
                  <stencil-route url='/blog/:id/:title/' component='app-blogdetail' componentProps={{ blog: this.blog }} exact={true} />
                  <stencil-route url='/contact/' component='app-contact' exact={true} />
                  <stencil-route component='app-bloglist'></stencil-route>
                </stencil-route-switch>
              </stencil-router>
            </main>
          </div>,
          <footer class="footer has-text-centered">
            <div class="container">
              <div class="columns is-multiline is-12">
                <div class="column is-4">
                  <h2 class="subtitle">Contact</h2>
                  <ul>
                    <li>
                      <stencil-route-link url={'/contact/#ptop'} anchorRole="link" anchorTitle="Contact" activeClass="is-active" exact={false}><i class="fa fa-envelope fa-2x" aria-hidden="true"></i>Get in touch with me</stencil-route-link>
                    </li>
                  </ul>
                </div>
                <div class="column is-4">
                  <h2 class="subtitle">Social Media</h2>
                  <ul>
                    <li><a rel="noreferrer" href="https://github.com/OliverLeitner" target="_blank" title="My Github repository"><i class="fab fa-github-square fa-2x"></i>Github</a></li>
                    <li><a rel="noreferrer" href="https://twitter.com/OliverNBLOG" target="_blank" title="My Twitter account"><i class="fab fa-twitter-square fa-2x"></i>Twitter</a></li>
                    <li><a rel="noreferrer" href="https://www.xing.com/profile/Oliver_Leitner3" target="_blank" title="My Xing profile"><i class="fab fa-xing-square fa-2x"></i>Xing</a></li>
                  </ul>
                </div>
                <div class="column is-4">
                  <h2 class="subtitle">General</h2>
                  <ul>
                    <li><stencil-route-link url={'/page/1/about_me/#ptop'} anchorRole="link" anchorTitle="About me" exact={true}>About me</stencil-route-link></li>
                    <li><stencil-route-link url={'/page/3/imprint/#ptop'} anchorRole="link" anchorTitle="Imprint / Privacy policy" exact={true}>Imprint / Privacy policy</stencil-route-link></li>
                  </ul>
                </div>
              </div>
              <div class="columns is-12">
                <div class="column is-12">
                  <p class="is-size-7">&copy; Oliver Leitner 2020</p>
                </div>
              </div>
            </div>
          </footer>
      ];
    }
  }
}
