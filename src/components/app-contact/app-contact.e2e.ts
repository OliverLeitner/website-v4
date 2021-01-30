import { newE2EPage } from '@stencil/core/testing';

describe('app-contact', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-contact></app-contact>');

    const element = await page.find('app-contact');
    expect(element).toHaveClass('hydrated');
  });
});
