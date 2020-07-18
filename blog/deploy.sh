# Building the front site.
gatsby build --prefix-paths

# Deploy the site to gh pages using the access token.
gh-pages -d public -r https://${GH_ACCESS_TOKEN}@github.com/hasadna/open_pension.git

# After deploying gatsby is being destroyed so we need to kill the service which runs on port 8000, AKA gatsby. After
# killing it we can fire it again thus ensure the live preview will live again.
kill -9 $(lsof -t -i:8000)
npm run develop &
