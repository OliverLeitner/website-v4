import { newSpecPage } from '@stencil/core/testing';
import { AppBloglist } from './app-bloglist';

describe('app-bloglist', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppBloglist],
      html: `<app-bloglist></app-bloglist>`,
    });
    expect(page.root).toEqualHtml(`
      <app-bloglist>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-bloglist>
    `);
  });
});
