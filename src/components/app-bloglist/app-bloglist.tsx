import { Component, ComponentInterface, h, Prop, Build } from '@stencil/core';
import { fetchData } from '../../libs/fetch';
import { Blog } from '../../models/blog';
import { MatchResults } from '@stencil/router';
import { env } from '../../environment';
import { paginate } from '../../libs/paginate';

@Component({
  tag: 'app-bloglist',
  shadow: false
})
export class AppBloglist implements ComponentInterface {
  @Prop({ mutable: true }) allBlogs: Blog[] = [];
  @Prop({ mutable: true }) blogs: Blog[] = [];
  @Prop() match: MatchResults;
  @Prop({ mutable: true }) blogCount: number = 0;
  @Prop({ mutable: true }) pageNums: number[] = [];
  @Prop() env: any = env;
  max_per_page: number = env.BLOG_NUM;

  async fillData() {
    if (await this.blogCount === 0) {
      const fetcher = new fetchData();
      await fetcher.returnDataSorted().then(() => {
        if (fetcher.receivedBlogs) {
          this.allBlogs = [].concat(...fetcher.receivedBlogs).reverse() as Blog[];
        }
      }).then(() => {
        this.blogCount = this.allBlogs.length;
      });
    }
  }

  async componentWillRender() {
    await this.fillData().then(() => {
      if (this.blogCount && this.match && this.match.params) {
        let matchnum: unknown = this.match.params.number;
        let curpage: number = matchnum as number;
        const pageInfo = paginate(this.blogCount, curpage, this.max_per_page);
        this.pageNums = pageInfo.pages;
        this.blogs = [];
        if (pageInfo) {
          this.allBlogs.forEach((blog, idx) => {
            if (idx >= pageInfo.startIndex && idx <= pageInfo.endIndex) {
              this.blogs.push(blog);
            }
          });
        }
      }
    });
  }

  componentDidLoad() {
    if (Build.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (this.blogs && this.pageNums && this.match && this.match.params) {
      return [
        <div class="section-light bloglist">
          <app-breadcrumbs breadcrumb_title="Home"></app-breadcrumbs>
          {this.blogs.map((blog) =>
            <app-blog blog={blog}></app-blog>
          )}
          <section class="section-light">
            {this.pageNums && this.pageNums.length > 1
            ?
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
              <ul class="pagination-list">
                {this.pageNums.map((num) =>
                  this.match.params.number === num.toString() || !this.match.params.number && num === 1
                    ? <li><stencil-route-link url={'/' + num} class="pagination-link is-current" anchorRole="link">{num}</stencil-route-link></li>
                    : <li><stencil-route-link url={'/' + num} class="pagination-link" anchorRole="link">{num}</stencil-route-link></li>
                )}
              </ul>
            </nav>
            : <span></span>
            }
          </section>
        </div>
      ];
    }
  }

}
