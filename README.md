# nlrb_election_mapper

The National Labor Relations Board tracks the results of elections in private-sector workplaces, where workers are voting to form a union because their employer has not voluntarily recognized the union. Journalists and labor organizers will post annual trend data, but there are few resources to understand real-time private-sector (or any at all!) union formation activity. This project aims to present the data from the NLRB's website so that labor organizers and labor journalists can better understand the geographic reach, hot spots, and trends in union election activity.

## Part 1: Scraping

- A selenium webscraper (see [pipeline/src/extract_nlrb_run](https://github.com/lizard12995/nlrb_election_mapper/tree/main/pipeline/src/extract_nlrb_run)) downloads data from [NLRB recent elections result website](https://www.nlrb.gov/reports/graphs-data/recent-election-results). 
- This should be part of an orchestrated workflow and run daily. (See Kathleen's YML file, tbd!)
- It runs using Google Cloud Run, given the special requirements for selenium. The Python script runs in a dockerized container. See our [Dockerfile](https://github.com/lizard12995/nlrb_election_mapper/blob/main/pipeline/src/extract_nlrb_run/Dockerfile). 
- The Cloud Run app has been deployed to our project on the Cloud console (musa509-nlrb-election-mapper). 
- As a result, it uploads a raw CSV to a Cloud Storage bucket (musa509-nlrb-election-mapper-raw-data). The file is named 'latest_nlrb.csv'.

## Part 2: Preparation & Workflow Orchestration 

[Kathleen]

## Part 3: Javascript Application

[Sofia]
