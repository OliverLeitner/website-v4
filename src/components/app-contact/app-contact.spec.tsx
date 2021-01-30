import { newSpecPage } from '@stencil/core/testing';
import { AppContact } from './app-contact';

describe('app-contact', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppContact],
      html: `<app-contact></app-contact>`,
    });
    expect(page.root).toEqualHtml(`
      <app-contact>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-contact>
    `);
  });
});
