import { newSpecPage } from '@stencil/core/testing';
import { AppDisqus } from './app-disqus';

describe('app-disqus', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppDisqus],
      html: `<app-disqus></app-disqus>`,
    });
    expect(page.root).toEqualHtml(`
      <app-disqus>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-disqus>
    `);
  });
});
