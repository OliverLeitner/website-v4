import { newE2EPage } from '@stencil/core/testing';

describe('app-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-page></app-page>');

    const element = await page.find('app-page');
    expect(element).toHaveClass('hydrated');
  });
});
