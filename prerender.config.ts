import { PrerenderConfig } from '@stencil/core';
import { PrerenderHydrateOptions } from '@stencil/core/internal/stencil-public-compiler';

export const config: PrerenderConfig = {
  hydrateOptions(url?: URL): PrerenderHydrateOptions {
    const hydrate: PrerenderHydrateOptions = {
      prettyHtml: true,
      clientHydrateAnnotations: true,
      inlineExternalStyleSheets: true,
      minifyScriptElements: true,
      minifyStyleElements: true,
      // afterHydrate: true,
      // beforeHydrate: true,
      // removeScripts: false,
      removeUnusedStyles: true,
      removeHtmlComments: true,
      removeBooleanAttributeQuotes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
    };
    return hydrate;
  }
};
