import { Component, ComponentInterface, h, Watch, Host, Prop } from '@stencil/core';
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
  dqConfig: string = `
  if (window)
  window.disqus_config = function () {
    this.page.title = '` + this.pageTitle + `';
    this.language = "en";
    PAGE_URL
    PAGE_IDENTIFIER
  };
  `;

  @Watch('pageTitle')
  watchHandler(newValue: string, oldValue: string) {
    console.log(newValue);
    console.log(oldValue);
    if (newValue !== oldValue)
      this.componentDidRender();
  }

  getDisqusMainScript() {
    const elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.src = `https://${env.SHORTNAME}.disqus.com/embed.js`;
    elem.async = true;
    elem.id = "d-embed";
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
      /*this.dqConfig = this.dqConfig.replace("PAGE_IDENTIFIER", "");
      this.dqConfig = this.dqConfig.replace("PAGE_URL", "this.page.url = '" + this.pageUrl + "';");*/
      config["PAGE_IDENTIFIER"] = "";
      config["PAGE_URL"] = "this.page.url = '" + this.pageUrl + "';";
    }
    if (!this.pageUrl) {
      /*this.dqConfig = this.dqConfig.replace("PAGE_IDENTIFIER", "this.page.identifier = '" + this.pageIdentifier + "';");
      this.dqConfig = this.dqConfig.replace("PAGE_URL", "");*/
      config["PAGE_URL"] = "";
      config["PAGE_IDENTIFIER"] = "this.page.identifier = '" + this.pageIdentifier + "';";

    }
    if (document && document.body)
      document.body.appendChild(config);
    // return this.dqConfig;
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
    } else {
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
    this.getDisqusConfig();
    this.getDisqusMainScript(); // load the main script
    this.getDisqusReset();
  }

  // load in comments:
  // <script type="text/javascript" src="https://neverslair.disqus.com/recent_comments_widget.js?num_items=10&hide_avatars=0&avatar_size=40&excerpt_length=100"></script>
  // <script id="dq-config" type="text/javascript" data-timestamp={Date.now().toString} innerHTML={this.getDisqusConfig()}></script>
  render() {
    return (
      <Host>
        <div id="disqus_thread"></div>
      </Host>
    );
  }
}
