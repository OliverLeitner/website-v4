import { newSpecPage } from '@stencil/core/testing';
import { AppBreadcrumbs } from './app-breadcrumbs';

describe('app-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppBreadcrumbs],
      html: `<app-breadcrumbs></app-breadcrumbs>`,
    });
    expect(page.root).toEqualHtml(`
      <app-breadcrumbs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-breadcrumbs>
    `);
  });
});
