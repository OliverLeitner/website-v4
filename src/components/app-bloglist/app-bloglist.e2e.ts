import { newE2EPage } from '@stencil/core/testing';

describe('app-bloglist', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-bloglist></app-bloglist>');

    const element = await page.find('app-bloglist');
    expect(element).toHaveClass('hydrated');
  });
});
