import { Component, ComponentInterface, Host, h, Prop, Build } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Blog } from '../../models/blog';
import { fetchData } from '../../libs/fetch';
import { env } from '../../environment';
import hash from 'object-hash';

@Component({
  tag: 'app-blogdetail',
  shadow: false
})
export class AppBlogdetail implements ComponentInterface {
  @Prop() blog: Blog;
  @Prop() match: MatchResults;
  @Prop() pageUrl: string;
  @Prop() pageIdentifier: string;
  @Prop() pageTitle: string;
  @Prop() env: any = env;

  async componentWillRender() {
    if (!this.blog || this.match && this.match.params && this.match.params.id !== this.blog.id.toString()) {
      const fetcher = new fetchData();
      await fetcher.returnSingleBlog(this.match.params.id).then(() => {
        this.blog = fetcher.receivedBlog;
        if (this.blog.Description !== null) {
          const metaDescription = document.querySelector('meta[name=Description]');
          if (metaDescription) {
            metaDescription.setAttribute('content', this.env["SITENAME"] + ': ' + this.blog.Description);
          }
        }
        if (this.blog.Tags !== null) {
          const metaKeywords = document.querySelector('meta[name=keywords]');
          if (metaKeywords) {
            metaKeywords.setAttribute('content', this.blog.Tags);
          }
        }
        this.pageTitle = this.blog.Title;
        this.pageIdentifier = hash({ id: this.blog.id, title: this.blog.Title });
        // this.pageUrl = env.MORIGIN + this.blog.Title + '/#!' + this.blog.id;
        if (this.blog.canonical_url && this.blog.canonical_url !== null) {
          this.pageUrl = this.blog.canonical_url;
        }
        if (!this.pageUrl && this.blog.identifier && this.blog.identifier !== null) {
          this.pageIdentifier = hash({ id: this.blog.id, title: this.blog.Title });
        }
        const title = document.getElementsByTagName('title');
        if (title && title[0]) {
          title[0].innerText = this.env["SITENAME"] + ': ' + this.blog.Title;
        }
      });
    }
  }

  componentDidLoad() {
    if (Build.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  hashCode(param: string): any {
    var hash = 0, i, chr;
    for (i = 0; i < param.length; i++) {
      chr = param.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  render() {
    if (this.blog) {
      return (
        <Host>
          <article class="main-content">
            <section class="section-light blog">
              <app-breadcrumbs
                breadcrumb_title={this.blog.Title}
              >
                <slot></slot>
              </app-breadcrumbs>
              <div class="columns is-multiline">
                <div class="column is-12">
                  <h1 class="title has-text-centered section-title">
                    {this.blog.Title}
                  </h1>
                  <h2 class="subtitle has-text-centered">
                    {this.blog.Subtitle}
                  </h2>
                  {this.blog.publish_date ? (
                    <h3 class="subtitle is-6">
                      <strong>Published: </strong>
                      {this.blog.publish_date}
                    </h3>
                  ) : (
                    <h3 class="subtitle is-6">
                      <strong>Published: </strong>
                      {this.blog.created_at}
                    </h3>
                  )}
                </div>
                <div class="column is-12">{this.blog.Description}</div>
                <div
                  class="column is-12"
                  innerHTML={this.blog.HtmlContent}
                ></div>
                <div class="column is-12">
                  <app-disqus
                    pageUrl={this.pageUrl}
                    pageIdentifier={this.pageIdentifier}
                    pageTitle={this.pageTitle}
                  >
                    <slot></slot>
                  </app-disqus>
                </div>
              </div>
            </section>
          </article>
          </Host>
      );
    }
  }

}
