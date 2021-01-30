import { Component, ComponentInterface, h, Prop, Build } from '@stencil/core';
import * as Showdown from 'showdown';
import { MatchResults } from '@stencil/router';
import { Blog } from '../../models/blog';
import { env } from '../../environment';
import hash from 'object-hash';

function debounce(func, wait, runOnFirstCall) {
  let timeout;
  return function () {
    const context = this; // eslint-disable-line consistent-this
    const args = arguments;

    const deferredExecution = function () {
      timeout = null;
      if (!runOnFirstCall)
        func.apply(context, args);
    };

    const callNow = runOnFirstCall && !timeout;

    window.clearTimeout(timeout);
    timeout = setTimeout(deferredExecution, wait);

    if (callNow)
      func.apply(context, args);
  };
}

@Component({
  tag: 'app-blog',
  shadow: false
})
export class AppBlog implements ComponentInterface {
  @Prop() blog: Blog;
  @Prop() match: MatchResults;
  @Prop() pageUrl: string;
  @Prop() pageIdentifier: string;
  @Prop() env: any = env;
  public imgSpecialStyle: string = "";
  public hasImageSet: string = "";

  queueResetCount = debounce(() => {
    const mywindow = window as any;
    if (mywindow && mywindow.DISQUSWIDGETS)
      mywindow.DISQUSWIDGETS.getCount({ reset: true });
  }, 300, false); // eslint-disable-line no-magic-numbers

  componentDidLoad() {
    if(Build.isBrowser) {
      const dqsHeaders = document.head.querySelectorAll('link[rel="prefetch"]');
      if (dqsHeaders) {
        dqsHeaders.forEach((header) => {
          document.head.removeChild(header);
        });
      }
      const dqsHeadersB = document.head.querySelectorAll('script[src^="https://' + env.SHORTNAME + '.disqus.com"]');
      if (dqsHeadersB) {
        dqsHeadersB.forEach((header) => {
          document.head.removeChild(header);
        });
      }
      const gStatic = document.head.querySelectorAll('script[src^="https://www.gstatic.com"]');
      if (gStatic) {
        gStatic.forEach((header) => {
          document.head.removeChild(header);
        });
      }
      if (document.getElementById('dsq-count-scr')) {
        this.queueResetCount();
      }
      if (!document.getElementById('dsq-count-scr')) {
        this.appendDisqusCountScript(`https://` + env.SHORTNAME + `.disqus.com/count.js`, 'dsq-count-scr', document.body);
      }
      if (document.getElementById('gr-exec')) {
        document.body.removeChild(document.getElementById('gr-exec'));
      }
    }
  }

  disconnectedCallback() {
    if (document.getElementById('dsq-count-scr')) {
      document.body.removeChild(document.getElementById('dsq-count-scr'));
    }
  }

  async componentWillRender() {
    if (this.blog) {
      this.hasImageSet = "";
      this.imgSpecialStyle = "";
      if (this.blog.listimage) {
        this.hasImageSet = "listImage-set";
        this.imgSpecialStyle = "has-image";
      }
      this.pageIdentifier = hash({ id: this.blog.id, title: this.blog.Title });
      if (this.blog.canonical_url && this.blog.canonical_url !== null) {
        this.pageUrl = this.blog.canonical_url;
      }
      if (!this.pageUrl && this.blog.identifier && this.blog.identifier !== null) {
        this.pageIdentifier = this.blog.identifier;
      }
    }
  }

  appendDisqusCountScript(url: string, id: string, parentElement) {
    const dqs = document.createElement('script');
    dqs.type = 'text/javascript';
    dqs.src = url;
    dqs.async = true;
    dqs.id = id;
    parentElement.appendChild(dqs);
  }

  render() {
    if (!this.match && this.blog) {
      const converter = new Showdown.Converter();
      this.blog.Description = converter.makeHtml(this.blog.Description).replace(/<\/?[^>]+(>|$)/g, "");
      return [
        <div class="columns is-12 blogListEntry">
          {this.blog.listimage && this.blog.listimage.url
            ?
            <div class="column is-2 listImage">
              <stencil-route-link url={'/blog/' + this.blog.id + '/' + this.blog.cleanedTitle + '/'}>
                <img src={env.DATA_INTERFACE + this.blog.listimage.url} alt={this.blog.Title} />
              </stencil-route-link>
            </div>
            : <span></span>
          }
          <div class={"columns is-multiline blogListTitle " + this.hasImageSet}>
            <div class="bloglist-header">
              <h1 class="is-title is-uppercase">
                <stencil-route-link url={`/blog/${this.blog.id}/${this.blog.cleanedTitle}/`}>
                  {this.blog.Title}
                </stencil-route-link>
              </h1>
            </div>
            <div class="bloglist-subheader">
              {this.blog.publish_date
              ?
              <div class={"bloglist-publishdate " + this.imgSpecialStyle}>{this.blog.publish_date}</div>
              :
              <div class={"bloglist-publishdate " + this.imgSpecialStyle}>{this.blog.created_at}</div>
              }
              <div class="bloglist-comments">
                <i class="far fa-comment"></i>
                {!this.pageUrl
                ?
                <span class="disqus-comment-count" data-disqus-identifier={this.pageIdentifier}>comment</span>
                :
                <span class="disqus-comment-count" data-disqus-url={this.pageUrl}>comment</span>
                }
              </div>
            </div>
            <div class="columns is-multiline bloglist-description">
              <div class="column">
                <stencil-route-link url={'/blog/' + this.blog.id + '/' + this.blog.cleanedTitle + '/'}>
                  <p>{this.blog.Description}</p>
                </stencil-route-link>
              </div>
            </div>
          </div>
        </div>
      ];
    } else if (this.match && !this.blog) {
      return (
        <div class="section">
          <app-blogdetail></app-blogdetail>
        </div>
      );
    }
  }

}
