// custom typefaces
import "typeface-roboto-cyrillic"
import "typeface-roboto-slab-cyrillic"

import Amplify from "aws-amplify"

Amplify.configure({
  Auth: {
    identityPoolId: process.env.GATSBY_IDENTITY_POOL_ID,
    region: process.env.GATSBY_AWS_REGION,
    userPoolId: process.env.GATSBY_USER_POOL_ID,
    userPoolWebClientId: process.env.GATSBY_WEBCLIENT_ID,
    mandatorySignIn: true,
  },
})
