import { newE2EPage } from '@stencil/core/testing';

describe('app-recaptcha', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recaptcha></app-recaptcha>');

    const element = await page.find('app-recaptcha');
    expect(element).toHaveClass('hydrated');
  });
});
