import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
import { env } from '../../environment';

@Component({
  tag: "app-disqus",
  shadow: false,
})
export class AppDisqus implements ComponentInterface {
  @Prop() pageUrl: string = "";
  @Prop() pageIdentifier: string = "";
  @Prop() pageTitle: string = "";
  @Prop() env: any = env;
  /*script: string = `
  if (window && window.DISQUS)
    window.DISQUS.reset({
      reload: true,
      config: function() {
        this.page.Identifier = 'PAGE_IDENTIFIER';
        this.page.url = 'PAGE_URL';
        this.language = 'en';
      }
    });
  `;*/
  /*dqConfigId: string = `
    window.disqus_config = function () {
      this.page.identifier = 'PAGE_IDENTIFIER';
    }
  `;
  dqConfigUrl: string = `
    window.disqus_config = function () {
      this.page.url = 'PAGE_URL';
    }
  `;*/
  dqConfig: string = `
  if (window)
  window.disqus_config = function () {
    this.page.title = '` + this.pageTitle + `'; 
    this.language = "en";
    PAGE_URL
    PAGE_IDENTIFIER
	};
  `;
  /*dqScript: string = `
  (function() {
    if (!document.body.querySelector('d-embed')) {
      var dsq = document.createElement('script'); 
      dsq.type = 'text/javascript'; 
      dsq.async = true;
      dsq.id = 'd-embed';
      dsq.src = 'https://neverslair.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }
})();
  `;*/

  async getDisqusMainScript() {
    const elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.src = `https://${env.SHORTNAME}.disqus.com/embed.js`;
    elem.async = true;
    elem.id = "d-embed";
    // elem.setAttribute("rel", "noreferrer");
    elem.setAttribute("data-timestamp", Date.now().toString());
    if (document && document.body && !document.body.querySelector("#d-embed"))
      document.body.appendChild(elem);
  }

  // TODO: check why this breaks
  getDisqusConfig() {
    const config = document.createElement("script");
    config.async = true;
    config.id = "dq-config";
    if (this.pageUrl) {
      this.dqConfig = this.dqConfig.replace("PAGE_IDENTIFIER", "");
      this.dqConfig = this.dqConfig.replace("PAGE_URL", "this.page.url = '" + this.pageUrl + "';");
    }
    if (!this.pageUrl) {
      this.dqConfig = this.dqConfig.replace("PAGE_IDENTIFIER", "this.page.identifier = '" + this.pageIdentifier + "';");
      this.dqConfig = this.dqConfig.replace("PAGE_URL", "");
    }
    return this.dqConfig;
  }

  getDisqusReset() {
    if (document && document.body)
      document.body.querySelectorAll("#dq-reset").forEach((reset) => {
        document.body.removeChild(reset);
      });
    let script = `
    if (window && window.DISQUS)
      window.DISQUS.reset({
        reload: true,
        config: function() {
          this.page.title = '` + this.pageTitle + `';
          PAGE_URL
          PAGE_IDENTIFIER
          this.language = 'en';
        }
      });
    `;
    if (this.pageUrl) {
      script = script.replace("PAGE_IDENTIFIER", "");
      script = script.replace("PAGE_URL", "this.page.url = '" + this.pageUrl + "';");
    }
    if (!this.pageUrl) {
      script = script.replace("PAGE_IDENTIFIER", "this.page.identifier = '" + this.pageIdentifier + "';");
      script = script.replace("PAGE_URL", "");
    }
    const reset = document.createElement("script");
    reset.type = "text/javascript";
    reset.async = true;
    reset.id = "dq-reset";
    reset.setAttribute('data-timestamp', Date.now().toString());
    // reset.setAttribute("rel", "noreferrer");
    reset.innerHTML = script;
    if (document && document.body)
      document.body.appendChild(reset);
  }

  componentDidRender() {
    this.getDisqusMainScript(); // load the main script
    // this.getDisqusConfig();
    this.getDisqusReset();
  }

  render() {
    return (
      <Host>
        <div id="disqus_thread"></div>
        <script async id="dq-config" type="text/javascript" data-timestamp={Date.now().toString} innerHTML={this.getDisqusConfig()}></script>
      </Host>
    );
  }
}