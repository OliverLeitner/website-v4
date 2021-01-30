import { newSpecPage } from '@stencil/core/testing';
import { AppRecaptcha } from './app-recaptcha';

describe('app-recaptcha', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecaptcha],
      html: `<app-recaptcha></app-recaptcha>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recaptcha>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recaptcha>
    `);
  });
});
