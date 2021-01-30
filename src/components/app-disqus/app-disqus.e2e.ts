import { newE2EPage } from '@stencil/core/testing';

describe('app-disqus', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-disqus></app-disqus>');

    const element = await page.find('app-disqus');
    expect(element).toHaveClass('hydrated');
  });
});
