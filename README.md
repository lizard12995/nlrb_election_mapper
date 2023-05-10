# nlrb_election_mapper

The National Labor Relations Board tracks the results of elections in private-sector workplaces, where workers are voting to form a union because their employer has not voluntarily recognized the union. Journalists and labor organizers will post annual trend data, but there are few resources to understand real-time private-sector (or any at all!) union formation activity. This project aims to present the data from the NLRB's website so that labor organizers and labor journalists can better understand the geographic reach, hot spots, and trends in union election activity.

## Part 1: Scraping

- A selenium webscraper (see [pipeline/src/extract_nlrb_run](https://github.com/lizard12995/nlrb_election_mapper/tree/main/pipeline/src/extract_nlrb_run)) downloads data from [NLRB recent elections result website](https://www.nlrb.gov/reports/graphs-data/recent-election-results). 
- This should be part of an orchestrated workflow and run daily (detailed below in Part 3)
- It runs using Google Cloud Run, given the special requirements for selenium. The Python script runs in a dockerized container. See our [Dockerfile](https://github.com/lizard12995/nlrb_election_mapper/blob/main/pipeline/src/extract_nlrb_run/Dockerfile). 
- The Cloud Run app has been deployed to our project on the Cloud console (musa509-nlrb-election-mapper). 
- As a result, it uploads a raw CSV to a Cloud Storage bucket (musa509-nlrb-election-mapper-raw-data). The file is named 'latest_nlrb.csv'.

## Part 2: Preparation and Transformation

- NLRB reports their records on an election-level basis, which is not directly helpful to view larger trends in the city, state, and region. Therefore, before implementing the NLRB data into the Workflow, it must be cleaned and restructured into a useful format.
- Working within Google Cloud project (musa509-nlrb-election-mapper), the following buckets were created:
     * musa509-nlrb-election-mapper-raw-data: used to hold the scraped NLRB data before being processed and transformed
     * musa509-nlrb-election-mapper-processed-data: used to hold the processed data that gets created through a series of BigQuery queries (detailed below)
- Once the raw data is scraped and put into the appropriate bucket, the table is then run through SQL-based transformations in BigQuery. Therefore, The data is then grouped and classified by state and city name, then supplemented with aggregated variables to track win-rate and voter turnout.  A column for CURRENT_TIMESTAMP() is also added to allow for greater visibility of when the data was last refreshed.
- Once transformed, the data is then pulled into a python script (main.py) to further geocode and transform the dataset into a GEOJSON file.  This file is the final dataset used in the Javascript application (detailed below).

## Part 3: Workflow Orchestration 

- Once the dataset is formatted and ready to be implemented in the Workflow, cloud functions must be enacted on it to make it reproducible and able to be read by Google Cloud Workflow.
- The 'gcloud' command library may be run to deploy the cloud functions and output an URL that will be used in the Workflow YAML.
- Finally, a new workflow is created ("election-mapper-workflow"), illustrating the extract and prepare scripts (scripts found in repo).
- Once the workflow is defined, it may be put onto a scheduler that triggers a refresh of the process.  The scheduler should be set to updating once a day at 11:00:00 UTC (06:00:00 EST, the local time zone for regions 4 and 6) to allow for regular refreshes of the dashboard.  This will allow the application to become a solution for users who wish to check daily updates to their region's election results.
- Now that the data is prepared and implemented, it is ready to be used by the Javascript application.

## Part 4: Javascript Application

- To access the user interface, first download this Github repository by clicking the green 'Code' button and downloading a zip file, or bringing it to Github Desktop is you are familiar with that process. Next, download [vscode ](https://code.visualstudio.com/) and [node js](https://nodejs.org/en/download). These software applications will allow you to open the code in the github repository and host the website it creates on your web browser. Simply open the vscode app, navigate to your downloaded folder of this repository and open it in vscode. Then open the terminal and write the command **npx http-server** and hit enter. Then open a tab in any web browser (ie Chrome, Firefox, Safari, etc) and submit the url **http://127.0.0.1:8080/ui/reviewer/** or click [this link](http://127.0.0.1:8080/ui/reviewer/) and you will be able to enjoy the site!
- This National Labor Review Board (NLRB) election mapper site offers a variety of services for the interested user to access. First, there is a map of Philadelphia and Pittsburgh datasets of labor union elections from the NLRB. Click on any point in the map and see a dataset pop up in the bottom left screen area. This describes all the recent labor union elections in that area. Next, toggle between filter buttons to see different map displays of the different data. Lastly, observe a graph comparing how different features of union elections relate to each other.
