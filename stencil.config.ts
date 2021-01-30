import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  /*buildEs5: true,
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    scriptDataOpts: true,
    shadowDomShim: true,
    appendChildSlotFix: true,
    cloneNodeFix: true,
    slotChildNodesFix: true,
    safari10: true
  },*/
  enableCache: true,
  globalStyle: 'src/assets/styles/combined.css',
  // globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'http://websitedomain',
      // buildDir: 'build',
      dir: 'www',
      prerenderConfig: './prerender.config.ts'
    }
  ],
  bundles: [
    { components: ['app-disqus', 'app-recaptcha', 'app-contact', 'app-root', 'app-blog', 'app-bloglist', 'app-home', 'app-breadcrumbs', 'app-page'] }
  ]
};
