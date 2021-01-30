import { newE2EPage } from '@stencil/core/testing';

describe('app-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-breadcrumbs></app-breadcrumbs>');

    const element = await page.find('app-breadcrumbs');
    expect(element).toHaveClass('hydrated');
  });
});
