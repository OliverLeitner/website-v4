import { Component, Host, h, Prop, Build } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Page } from '../../models/page';
import { fetchData } from '../../libs/fetch';
import { env } from '../../environment';

@Component({
  tag: 'app-page',
  shadow: false
})
export class AppPage {
  @Prop() match: MatchResults;
  @Prop() page: Page;
  @Prop() env: any = env;
  @Prop() hasImage: string = "is-full";

  async appendLightbox() {
    const lbscript = await document.querySelectorAll('#lightbox-script');
    lbscript.forEach((lb) => {
      document.body.removeChild(lb);
    });
    const lightbox = await document.createElement('script');
    lightbox.id = "lightbox-script"
    lightbox.innerHTML = `WAMediaBox.bind(document.querySelector(".lightbox"));`;
    await document.body.appendChild(lightbox);
  }

  async componentWillRender() {
      if (!this.page || this.match && this.match.params.id !== this.page.id.toString()) {
        const fetcher = new fetchData();
        await fetcher.returnSinglePage(this.match.params.id).then(() => {
          this.page = fetcher.receivedPage as Page;
          this.hasImage = "is-full";
          if (this.page.Image) {
            this.hasImage = "is-two-thirds";
          }
          if (this.page.Description !== null) {
            const metaDescription = document.querySelector('meta[name=Description]');
            if (metaDescription) {
              metaDescription.setAttribute('content', env.SITENAME + ': ' + this.page.Description);
            }
          }
          if (this.page.Tags !== null) {
            const metaKeywords = document.querySelector('meta[name=keywords]');
            if (metaKeywords) {
              metaKeywords.setAttribute('content', this.page.Tags);
            }
          }
          const title = document.getElementsByTagName('title');
          if (title && title[0]) {
            title[0].innerText = env.SITENAME + ': ' + this.page.Title;
          }
        });
      }
  }

  componentDidRender() {
    // const lbscript = document.querySelectorAll('#lightbox-script');
    if (this.page && this.page.Image && this.page.Image.url/* && lbscript.length === 0*/) {
      this.appendLightbox().then(() => {
        // const image = document.querySelector('.image');
        // image[0].classList.add('lightbox');
      });
    }
  }

  componentDidLoad() {
    if (Build.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (this.page) {
      return (
        <Host>
        <div class="section-light page">
          <app-breadcrumbs breadcrumb_title={this.page.Title}></app-breadcrumbs>
          <div class="column">
            <h1 class="title has-text-centered section-title">{this.page.Title}</h1>
          </div>
          <div class="columns is-multiline is-12">
            <div class={"column " + this.hasImage} innerHTML={this.page.HtmlContent}>
            </div>
            {this.page.Image && this.page.Image.url
              ?
              <div class="column is-3 right-image">
                <a class="image lightbox" href={env.DATA_INTERFACE + this.page.Image.url} title={this.page.Title}>
                  <img width={128} height={128} src={env.DATA_INTERFACE + this.page.Image.url} alt={this.page.Title} />
                </a>
              </div>
              : null
            }
          </div>
        </div>
        </Host>
      );
    }
  }
}
