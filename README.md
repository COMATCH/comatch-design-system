:point_right: [Live Storybook preview](https://comatch.github.io/comatch-design-system) :point_left:

<img src="./.badges/badge-lines.svg" alt="lines coverage badge"> <img src="./.badges/badge-branches.svg" alt="lines coverage badge"> <img src="./.badges/badge-functions.svg" alt="lines coverage badge"> <img src="./.badges/badge-statements.svg" alt="lines coverage badge">

**Contents:**
- [Deployment](#deployment)

# Deployment

1. Assure that the package is ready:
   - `yarn lint`
   - `yarn test`
   - `yarn start` (make sure that storybook is working as expected)
   - `yarn build` (generate the new bundle)
2. Update the **npm** version and **publish** the package:
   - [`npm version major|minor|patch`](https://docs.npmjs.com/cli/version)
   - `npm publish` (will publish to the *npm registry*)
3. Deploy **storybook** to **Github Pages**:
   - `yarn deploy:storybook`
