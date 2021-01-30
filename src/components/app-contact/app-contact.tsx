import { Component, ComponentInterface, State, Prop, Host, h, Build } from '@stencil/core';
import { Contact } from '../../models/contact';
import { Mail } from '../../libs/mail';
import { env } from '../../environment';

@Component({
  tag: 'app-contact',
  shadow: false,
})
export class AppContact implements ComponentInterface {
  @State() contact: Contact = new Contact();
  @State() validities: boolean[] = [false, false, false];
  @State() validNameCSS: string = "";
  @State() validEmailCSS: string = "";
  @State() validMessageCSS: string = "";
  @State() canSubmit: boolean = false;
  @State() mailSent: boolean = false;
  @Prop() env: any = env;

  componentDidRender() {
    const metaDescription = document.querySelector('meta[name=Description]');
    if (metaDescription) {
      metaDescription.setAttribute('content', env.SITENAME + ': Contact me');
    }
    const metaKeywords = document.querySelector('meta[name=keywords]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'email,contact');
    }
    const title = document.getElementsByTagName('title');
    if (title && title[0]) {
      title[0].innerText = env.SITENAME + ': contact me';
    }

    // grecaptcha V3
    if (!this.mailSent) {
      this.createRecaptchaWidget();
    }
  }

  componentDidLoad() {
    if(Build.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  disconnectedCallback() {
    const gstatic = document.querySelectorAll('script[src^="https://www.gstatic.com/recaptcha"]');
    const api = document.querySelectorAll('#googleapi_v3');
    const grexec = document.querySelectorAll('#gr-exec');
    if (api) {
      api.forEach((key) => {
        document.body.removeChild(key);
      });
    }
    if (gstatic) {
      gstatic.forEach((gs) => {
        document.head.removeChild(gs);
      });
    }
    if (grexec) {
      grexec.forEach((exec) => {
        document.body.removeChild(exec);
      });
    }
    this.mailSent = false;
  }

  createRecaptchaWidget() {
    const googleApi = document.createElement('script');
    googleApi.id = 'googleapi_v3';
    googleApi.src = 'https://www.google.com/recaptcha/api.js?render=' + env.PKEY;
    // googleApi.setAttribute('rel', 'norefferer');
    // googleApi.crossOrigin = 'use-credentials';

    document.body.appendChild(googleApi);

    const inputToken = document.querySelector('input[name="token"]');

    if (inputToken) {
      const grecaptcha = document.createElement('script');
      grecaptcha.id = 'gr-exec';
      grecaptcha.innerHTML = `
    if (window && window.grecaptcha) {
      window.grecaptcha.ready(function() {
        window.grecaptcha.execute('` + env.PKEY + `', {action: 'homepage'}).then(function(token) {
          document.querySelector('input[name="token"]').value = token;
        });
      });
    }
    `;
      document.body.appendChild(grecaptcha);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.mailSent) {
      if (e.target && e.target[4] && e.target[4].value) {
        this.contact.token = e.target[4].value;
        const mailer = new Mail(this.contact);
        mailer.send();
        this.mailSent = true;
      }
    }
  }

  checkFormValidity(event) {
    if (event.target) {
      if (event.target.name === "name" && event.target.validity.valid) {
        this.validities[0] = true;
        this.validNameCSS = "is-success";
      }
      if (event.target.name === "name" && !event.target.validity.valid) {
        this.validities[0] = false;
        this.validNameCSS = "is-danger";
      }
      if (event.target.name === "email" && event.target.validity.valid) {
        this.validities[1] = true;
        this.validEmailCSS = "is-success";
      }
      if (event.target.name === "email" && !event.target.validity.valid) {
        this.validities[1] = false;
        this.validEmailCSS = "is-danger";
      }
      if (event.target.name === "message" && event.target.validity.valid) {
        this.validities[2] = true;
        this.validMessageCSS = "is-success";
      }
      if (event.target.name === "message" && !event.target.validity.valid) {
        this.validities[2] = false;
        this.validMessageCSS = "is-danger";
      }
      if (this.validities[0] && this.validities[1] && this.validities[2]) {
        this.canSubmit = true;
      } else {
        this.canSubmit = false;
      }
    }
  }

  handleChange(event) {
    // simple form object filler
    // TODO: add anti xss and validation stuff
    switch (event.target.name) {
      case "name": {
        this.contact.name = event.target.value;
        this.checkFormValidity(event);
        break;
      }
      case "email": {
        this.contact.email = event.target.value;
        this.checkFormValidity(event);
        break;
      }
      case "url": {
        this.contact.url = event.target.value;
        break;
      }
      case "message": {
        this.contact.message = event.target.value;
        this.checkFormValidity(event);
        break;
      }
      case "token": {
        this.contact.token = event.target.value;
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    return (
      <Host>
      <section class="section-light page">
        <app-breadcrumbs breadcrumb_title="Contact"></app-breadcrumbs>
        <div class="columns is-multiline is-centered">
          <div class="column is-12">
            <h1 class="title has-text-centered section-title">Contact</h1>
            <h2 class="subtitle has-text-centered">Get in touch with me</h2>
          </div>
          <div class="column is-10">
            <section class="section content">
              {!this.mailSent
                ?
                <form onSubmit={(e) => this.handleSubmit(e)} onInput={(event) => this.handleChange(event)}>
                  <div class="field">
                    <label class="label">Your Name<span class="is-required">*</span></label>
                    <div class="control">
                      <input class={"input " + this.validNameCSS} type="text" name="name" placeholder="Text input" required />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Your Website</label>
                    <div class="control has-icons-left">
                      <input class="input" type="text" name="url" placeholder="www.yourwebsite.com" />
                      <span class="icon is-small is-left">
                        <i class="fas fa-walking"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Your E-Mail<span class="is-required">*</span></label>
                    <div class="control has-icons-left">
                      <input class={"input " + this.validEmailCSS} type="email" name="email" placeholder="example@example.com" required />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Message<span class="is-required">*</span></label>
                    <div class="control has-icons-right">
                      <textarea class={"textarea " + this.validMessageCSS} name="message" placeholder="..." rows={10} required></textarea>
                    </div>
                  </div>

                  <input type="hidden" name="token" id="g_token" />

                  <div class="field is-grouped">
                    <div class="control">
                      <button type="submit" class="button is-link" disabled={!this.canSubmit}>Submit</button>
                    </div>
                    <div class="control">
                      <button type="reset" class="button is-link is-light">Cancel</button>
                    </div>
                  </div>
                  <legend>
                    <p>All fields marked with a <span class="is-required">*</span> are mandatory.</p>
                  </legend>
                </form>
                :
                <div class="has-text-centered">Thank you for message.</div>
              }
            </section>
          </div>
        </div>
      </section>
      </Host>
    );
  }

}
