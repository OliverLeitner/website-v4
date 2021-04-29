import { Page } from '../models/page';
import { Title } from '../models/title';
import { Blog } from '../models/blog';
import { env } from '../environment';
import * as Shodown from 'showdown';
import showdownHighlight from 'showdown-highlight';

export class fetchData {

  protected converter = null;

  constructor(
    public url: string = env.DATA_INTERFACE,
    public json?: any[],
    public titles?: Title[],
    public blogs?: Blog[],
    public pageData?: Page,
    public blogData?: Blog
  ) {
    this.converter = new Shodown.Converter({extensions: [showdownHighlight({pre: true})]});
  }

  public async returnTitles() {
    let resp = await fetch(this.url + "/graphql?query={pages{id, Title, hidden}}");
    if (resp.ok) {
      return await resp.json().then((ret) => {
        this.titles = ret.data.pages as Title[];
      });
    }
  }

  public async returnSinglePage(id): Promise<any> {
    return await fetch(this.url + "/graphql?query={page(id:" + id + "){ id, Title, Textcontent, Description, Tags, hidden, Image { url } }}")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      }).then((json) => {
        this.pageData = json.data.page as Page;
        if (this.pageData.Textcontent)
          this.pageData.HtmlContent = this.converter.makeHtml(this.pageData.Textcontent);
        return;
      });
  }

  public async returnSingleBlog(id): Promise<any> {
    return await fetch(this.url + "/graphql?query={blog(id:" + id + "){ id, Title, Subtitle, Description, Tags, Content, canonical_url, identifier, publish_date, listimage {url} }}")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      }).then((json) => {
        this.blogData = json.data.blog as Blog;
        if (this.blogData.Content)
          this.blogData.HtmlContent = this.converter.makeHtml(this.blogData.Content);
        return;
      });
  }

  public async returnDataSorted(obj: string = "/graphql?query={blogs(sort: \"publish_date:asc\"){ id, Title, Subtitle, Description, Tags, Content, canonical_url, identifier, publish_date, listimage {url} }}") {
    let resp = await fetch(this.url + obj);
    if (resp.ok && !this.json) {
      this.json = await resp.json().then((data) => {
        return data.data.blogs as Blog[];
      });
    }
    if (!resp.ok) {
      console.error(resp.statusText);
    }
  }

  public async returnData(obj: string = "/pages") {
    let resp = await fetch(this.url + obj);
    if (resp.ok && !this.json) {
      this.json = await resp.json();
    }
    if (!resp.ok) {
      console.error(resp.statusText);
    }
  }

  get receivedData(): Page[] {
    const outPages: Page[] = [];
    for (const page in this.json) {
      outPages.push(this.json[page] as Page);
    }
    return outPages;
  }

  get receivedBlogs(): Blog[] {
    const outBlogs: Blog[] = [];
    for (const blog in this.json) {
      this.json[blog].cleanedTitle = this.json[blog].Title.replace(/[^A-Z0-9]/ig, "_").toLowerCase(); // this.json[blog].Title.toLowerCase().split(' ').join('_');
      outBlogs.push(this.json[blog] as Blog);
    }
    return outBlogs;
  }

  get receivedTitles(): Title[] {
    const outTitles: Title[] = [];
    for (const title in this.titles) {
      this.titles[title].cleanedTitle = this.titles[title].Title.replace(/[^A-Z0-9]/ig, "_").toLowerCase(); // this.titles[title].Title.toLowerCase().split(' ').join('_');
      outTitles.push(this.titles[title] as Title);
    }
    return outTitles;
  }

  get receivedPage(): Page {
    return this.pageData as Page;
  }

  get receivedBlog(): Blog {
    return this.blogData as Blog;
  }

}
