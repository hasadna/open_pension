gatsby build --prefix-paths
gh-pages -d public -r https://${GH_ACCESS_TOKEN}@github.com/hasadna/open_pension.git
kill -9 $(lsof -t -i:8000)
npm run develop &
