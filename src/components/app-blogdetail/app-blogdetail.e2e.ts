import { newE2EPage } from '@stencil/core/testing';

describe('app-blogdetail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-blogdetail></app-blogdetail>');

    const element = await page.find('app-blogdetail');
    expect(element).toHaveClass('hydrated');
  });
});
