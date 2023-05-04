# nlrb_election_mapper

Part 1: Scraping

- A selenium webscraper (pipeline/src/extract_nlrb_run) downloads data from [NLRB recent elections result website](https://www.nlrb.gov/reports/graphs-data/recent-election-results). 
- This should be part of an orchestrated workflow and run daily. 
- It runs using Google Cloud Run, given the special requirements for selenium. 
- The Cloud Run app has been deployed to our project on the Cloud console. 
- As a result, it uploads a raw CSV to a Cloud Storage folder called 'latest_nlrb.csv.'

Part 2: Preparation & Workflow Orchestration 
[Kathleen]

Part 3: Javascript Application
[Sofia]
