# nlrb_election_mapper

- selenium webscraper (pipeline/src/extract_nlrb_run) will download data from [NLRB recent elections result website](https://www.nlrb.gov/reports/graphs-data/recent-election-results) daily; will run using Google Cloud Run
- preparation script geocodes points and runs calculations on raw dataset, runs as a Cloud Function, then pushes to Google Cloud Storage
- javascript web application pulls from Google Cloud Storage to present data
