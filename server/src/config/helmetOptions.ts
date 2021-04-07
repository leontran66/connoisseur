export default {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [ "'self'" ],
      baseUri: [ "'self'" ],
      blockAllMixedContent: [],
      fontSrc: [ "'self'", 'https:', 'data:' ],
      frameAncestors: [ "'self'" ],
      imgSrc: [ "'self'", 'https:', 'data:' ],
      objectSrc: [ "'none'" ],
      scriptSrc: [ "'self'" ],
      scriptSrcAttr: [ "'none'" ],
      styleSrc: [ "'self'", 'https:', "'unsafe-inline'" ],
      upgradeInsecureRequests: []
    }
  }
}
