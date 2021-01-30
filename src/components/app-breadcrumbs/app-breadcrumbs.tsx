import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-breadcrumbs',
  shadow: false,
})
export class AppBreadcrumbs implements ComponentInterface {
  @Prop() breadcrumb_title: string;

  render() {
    return (
      <Host>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><stencil-route-link url="/" anchorRole="link" exact={true}><span class="has-text-dark has-text-weight-bold">root@neverslair-blog: $</span></stencil-route-link></li>
          {this.breadcrumb_title !== "Home"
          ? <li class="is-active"><span class="current_page blink_me">&#x25BA;</span><span class="bc_current">{this.breadcrumb_title}</span><span class="blink_me">&#x25C4;</span></li>
          : <span></span>
          }
        </ul>
      </nav>
      </Host>
    );
  }

}
