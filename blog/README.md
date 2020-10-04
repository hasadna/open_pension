# Open Pension blog site

This is the blog of Open Pension.

## Setting up
The site based on `gatsby`. For more information on how to set it up for deployment head to [gatsby documentation](https://www.gatsbyjs.org/docs/).

## Working with it...
All you need to do it to fire up the container. After it's ready, go to `http://localhost:2500` and you can see the live
view of the site. Upon editing the content in the CMS (http://localhost:2000) the site will be refreshed.

## Deploying
For deploying the content you need to set in the `GH_ACCESS_TOKEN` environment variable a github access token. In the 
CMS, go to the build hooks configuration and set the deploy key as the `trigger_deploy_secret_key` environment variable 
of the blog. 

After all is up, you can deploy it via the `Open pension` toolbar.
