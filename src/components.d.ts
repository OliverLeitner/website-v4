/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Blog } from "./models/blog";
import { MatchResults } from "@stencil/router";
import { Title } from "./models/title";
import { Page } from "./models/page";
export namespace Components {
    interface AppBlog {
        "blog": Blog;
        "env": any;
        "match": MatchResults;
        "pageIdentifier": string;
        "pageUrl": string;
    }
    interface AppBlogdetail {
        "blog": Blog;
        "env": any;
        "match": MatchResults;
        "pageIdentifier": string;
        "pageTitle": string;
        "pageUrl": string;
    }
    interface AppBloglist {
        "allBlogs": Blog[];
        "blogCount": number;
        "blogs": Blog[];
        "env": any;
        "match": MatchResults;
        "pageNums": number[];
    }
    interface AppBreadcrumbs {
        "breadcrumb_title": string;
    }
    interface AppContact {
        "env": any;
    }
    interface AppDisqus {
        "env": any;
        "pageIdentifier": string;
        "pageTitle": string;
        "pageUrl": string;
    }
    interface AppHome {
        "match": MatchResults;
        "titles": Title[];
    }
    interface AppPage {
        "env": any;
        "hasImage": string;
        "match": MatchResults;
        "page": Page;
    }
    interface AppRecaptcha {
        "classTitle": string;
        "gId": string;
        "sitekey": string;
    }
    interface AppRoot {
        "blog": Blog;
        "page": Page;
        "titles": Title[];
    }
}
declare global {
    interface HTMLAppBlogElement extends Components.AppBlog, HTMLStencilElement {
    }
    var HTMLAppBlogElement: {
        prototype: HTMLAppBlogElement;
        new (): HTMLAppBlogElement;
    };
    interface HTMLAppBlogdetailElement extends Components.AppBlogdetail, HTMLStencilElement {
    }
    var HTMLAppBlogdetailElement: {
        prototype: HTMLAppBlogdetailElement;
        new (): HTMLAppBlogdetailElement;
    };
    interface HTMLAppBloglistElement extends Components.AppBloglist, HTMLStencilElement {
    }
    var HTMLAppBloglistElement: {
        prototype: HTMLAppBloglistElement;
        new (): HTMLAppBloglistElement;
    };
    interface HTMLAppBreadcrumbsElement extends Components.AppBreadcrumbs, HTMLStencilElement {
    }
    var HTMLAppBreadcrumbsElement: {
        prototype: HTMLAppBreadcrumbsElement;
        new (): HTMLAppBreadcrumbsElement;
    };
    interface HTMLAppContactElement extends Components.AppContact, HTMLStencilElement {
    }
    var HTMLAppContactElement: {
        prototype: HTMLAppContactElement;
        new (): HTMLAppContactElement;
    };
    interface HTMLAppDisqusElement extends Components.AppDisqus, HTMLStencilElement {
    }
    var HTMLAppDisqusElement: {
        prototype: HTMLAppDisqusElement;
        new (): HTMLAppDisqusElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppPageElement extends Components.AppPage, HTMLStencilElement {
    }
    var HTMLAppPageElement: {
        prototype: HTMLAppPageElement;
        new (): HTMLAppPageElement;
    };
    interface HTMLAppRecaptchaElement extends Components.AppRecaptcha, HTMLStencilElement {
    }
    var HTMLAppRecaptchaElement: {
        prototype: HTMLAppRecaptchaElement;
        new (): HTMLAppRecaptchaElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLElementTagNameMap {
        "app-blog": HTMLAppBlogElement;
        "app-blogdetail": HTMLAppBlogdetailElement;
        "app-bloglist": HTMLAppBloglistElement;
        "app-breadcrumbs": HTMLAppBreadcrumbsElement;
        "app-contact": HTMLAppContactElement;
        "app-disqus": HTMLAppDisqusElement;
        "app-home": HTMLAppHomeElement;
        "app-page": HTMLAppPageElement;
        "app-recaptcha": HTMLAppRecaptchaElement;
        "app-root": HTMLAppRootElement;
    }
}
declare namespace LocalJSX {
    interface AppBlog {
        "blog"?: Blog;
        "env"?: any;
        "match"?: MatchResults;
        "pageIdentifier"?: string;
        "pageUrl"?: string;
    }
    interface AppBlogdetail {
        "blog"?: Blog;
        "env"?: any;
        "match"?: MatchResults;
        "pageIdentifier"?: string;
        "pageTitle"?: string;
        "pageUrl"?: string;
    }
    interface AppBloglist {
        "allBlogs"?: Blog[];
        "blogCount"?: number;
        "blogs"?: Blog[];
        "env"?: any;
        "match"?: MatchResults;
        "pageNums"?: number[];
    }
    interface AppBreadcrumbs {
        "breadcrumb_title"?: string;
    }
    interface AppContact {
        "env"?: any;
    }
    interface AppDisqus {
        "env"?: any;
        "pageIdentifier"?: string;
        "pageTitle"?: string;
        "pageUrl"?: string;
    }
    interface AppHome {
        "match"?: MatchResults;
        "titles"?: Title[];
    }
    interface AppPage {
        "env"?: any;
        "hasImage"?: string;
        "match"?: MatchResults;
        "page"?: Page;
    }
    interface AppRecaptcha {
        "classTitle"?: string;
        "gId"?: string;
        "sitekey"?: string;
    }
    interface AppRoot {
        "blog"?: Blog;
        "page"?: Page;
        "titles"?: Title[];
    }
    interface IntrinsicElements {
        "app-blog": AppBlog;
        "app-blogdetail": AppBlogdetail;
        "app-bloglist": AppBloglist;
        "app-breadcrumbs": AppBreadcrumbs;
        "app-contact": AppContact;
        "app-disqus": AppDisqus;
        "app-home": AppHome;
        "app-page": AppPage;
        "app-recaptcha": AppRecaptcha;
        "app-root": AppRoot;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-blog": LocalJSX.AppBlog & JSXBase.HTMLAttributes<HTMLAppBlogElement>;
            "app-blogdetail": LocalJSX.AppBlogdetail & JSXBase.HTMLAttributes<HTMLAppBlogdetailElement>;
            "app-bloglist": LocalJSX.AppBloglist & JSXBase.HTMLAttributes<HTMLAppBloglistElement>;
            "app-breadcrumbs": LocalJSX.AppBreadcrumbs & JSXBase.HTMLAttributes<HTMLAppBreadcrumbsElement>;
            "app-contact": LocalJSX.AppContact & JSXBase.HTMLAttributes<HTMLAppContactElement>;
            "app-disqus": LocalJSX.AppDisqus & JSXBase.HTMLAttributes<HTMLAppDisqusElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-page": LocalJSX.AppPage & JSXBase.HTMLAttributes<HTMLAppPageElement>;
            "app-recaptcha": LocalJSX.AppRecaptcha & JSXBase.HTMLAttributes<HTMLAppRecaptchaElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
        }
    }
}
