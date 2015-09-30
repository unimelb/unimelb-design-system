# How to contribute

1. Add or modify the code in local dev environment
2. Test across supported platforms and devices (IE8+, chrome/safari/opera, FF 31.5 ESR+, iphone 4, iphone 6, ipad 2, ipad air 2, nexus 4, galaxy s2)
3. Commit changes as a pull request against the repo on github

# What happens next

4. Review & accept PR - close any related issues
5. Rebuild and deploy static site on web.unimelb if necessary
6. Copy minified code from design system to S3 deployment system
7. If it affects the injection (global header and footer) manually test exported code on local test files
8. Commit changes against S3 deployment system, this will export the combined code on our build server and sync it to S3
9. Verify changes were successful on local test files - if the injection was altered, test against deployed versions still in support
10. If any of the functionality that nexus (CRM) use has changed, produce the nexus package and deliver to their team for testing and deployment
11. If the change needs to be seen immediately, flush the CDN, otherwise it will naturally update within 24 hours (some sites reference a CDN rather than the direct S3 endpoint)

