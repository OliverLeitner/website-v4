import { Component, ComponentInterface, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-recaptcha',
  shadow: false
})
export class AppRecaptcha implements ComponentInterface {
  @Prop() sitekey: string;
  @Prop() classTitle: string;
  @Prop() gId: string;

  // private scriptSrc = "https://www.google.com/recaptcha/api.js";
  // private observer = new MutationObserver(this.mutationCallbackGenerator());
  // private hiddenDiv = document.createElement("div"); // Just a placeholder.

  /*componentDidMount() {
    this.observer.observe(document.body, { childList: true });
    this.appendScript();
  }*/

  /*componentWillUnmount() {
    this.cleanup();
  }*/

  /*appendScript() {
    if (!this.getScriptIfAvailable()) {
      const reCaptchaScript = this.createScriptElement();
      document.body.appendChild(reCaptchaScript);
    }
  }*/

  /*getScriptIfAvailable(): HTMLScriptElement | undefined {
    if (document.getElementById("recaptcha") !== null) {
      return document.getElementById("recaptcha") as HTMLScriptElement;
    }

    const availableScripts = Array.from(document.scripts);
    return availableScripts.find(script => script.src === this.scriptSrc);
  }*/

  /*createScriptElement(): HTMLScriptElement {
    const reCaptchaScript = document.createElement("script");
    reCaptchaScript.id = "recaptcha";
    reCaptchaScript.src = this.scriptSrc;
    reCaptchaScript.async = true;
    reCaptchaScript.defer = true;

    return reCaptchaScript;
  }*/

  /*private cleanup() {
    const script = this.getScriptIfAvailable();
    if (script) {
      this.removeChild(script);
    }

    this.removeChild(this.hiddenDiv);

    const allScripts = Array.from(document.scripts);
    const reCaptchaSrcPattern = /https:\/\/www.gstatic.com\/recaptcha\/releases\/.*.js$/;
    const additionalScripts = allScripts.filter(script =>
      reCaptchaSrcPattern.test(script.src)
    );
    additionalScripts.map(this.removeChild);
  }*/

  /*removeChild(element: HTMLElement) {
    const parentNode = element.parentNode;
    if (parentNode !== null) {
      parentNode.removeChild(element);
    }
  }*/

  /*mutationCallbackGenerator() {
    return (mutations: MutationRecord[]) => {
      mutations.forEach(mutation => {
        if (
          mutation.type === "childList" &&
          mutation.target === document.body &&
          mutation.addedNodes.length === 1 &&
          this.isNodeReCaptchaHiddenDiv(mutation.addedNodes[0])
        ) {
          this.hiddenDiv = mutation.addedNodes[0] as HTMLDivElement;
          this.observer.disconnect();
        }
      });
    };
  }*/

  /*isNodeReCaptchaHiddenDiv(node: Node) {
    const div = node as HTMLDivElement;
    return (
      div.style &&
      div.style.visibility === "hidden" &&
      div.style.top === "-10000px" &&
      div.style.position === "absolute"
    );
  }*/

  render() {
    return (
      <div
        id={this.gId}
        class={'control ' + this.classTitle}
        data-sitekey={this.sitekey}
      />
    );
  }

}
