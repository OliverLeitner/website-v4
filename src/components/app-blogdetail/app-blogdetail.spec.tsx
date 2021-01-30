import { newSpecPage } from '@stencil/core/testing';
import { AppBlogdetail } from './app-blogdetail';

describe('app-blogdetail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppBlogdetail],
      html: `<app-blogdetail></app-blogdetail>`,
    });
    expect(page.root).toEqualHtml(`
      <app-blogdetail>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-blogdetail>
    `);
  });
});
