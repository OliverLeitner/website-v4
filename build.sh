#!/bin/bash
# the general build script
# copying and merging style stuff
# removal of things
rm -rf dist &&
rm -rf www &&
# javascript things
cp -rf node_modules/wa-mediabox/dist src/assets/scripts/wa-mediabox &&
cat src/assets/scripts/wa-mediabox/wa-mediabox.min.js > src/assets/scripts/combined.js &&
cat src/assets/env.js >> src/assets/scripts/combined.js &&
cat src/assets/scripts/eu_cookie_banner.js >> src/assets/scripts/combined.js &&
cat src/assets/scripts/default.js >> src/assets/scripts/combined.js &&
npx uglifyjs --compress --mangle --source-map --output src/assets/scripts/combined.min.js src/assets/scripts/combined.js &&
# css things
rm -f src/assets/combined.css &&
cp -rf node_modules/bulma/css src/assets/styles/bulma-styles &&
cp -rf node_modules/highlight.js/styles src/assets/styles/highlight-styles &&
cat src/assets/styles/bulma-styles/bulma.min.css > src/assets/styles/combined.css &&
cat src/assets/styles/highlight-styles/github.css >> src/assets/styles/combined.css &&
cat src/assets/scripts/wa-mediabox/wa-mediabox.min.css >> src/assets/styles/combined.css &&
cat src/assets/styles/showcase.css >> src/assets/styles/combined.css
exit 0
