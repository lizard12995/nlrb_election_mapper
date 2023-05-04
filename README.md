# nlrb_election_mapper

Part 1: Scraping

- A selenium webscraper (see [pipeline/src/extract_nlrb_run](https://github.com/lizard12995/nlrb_election_mapper/tree/main/pipeline/src/extract_nlrb_run)) downloads data from [NLRB recent elections result website](https://www.nlrb.gov/reports/graphs-data/recent-election-results). 
- This should be part of an orchestrated workflow and run daily. (See Kathleen's YML file, tbd!)
- It runs using Google Cloud Run, given the special requirements for selenium. The python script is contained in a dockerized container. See [Dockerfile](https://github.com/lizard12995/nlrb_election_mapper/blob/main/pipeline/src/extract_nlrb_run/Dockerfile) here. 
- The Cloud Run app has been deployed to our project on the Cloud console. 
- As a result, it uploads a raw CSV to a Cloud Storage folder called 'latest_nlrb.csv.'

Part 2: Preparation & Workflow Orchestration 
[Kathleen]

Part 3: Javascript Application
[Sofia]
