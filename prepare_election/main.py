import pandas as pd
import geopandas as gpd

from google.cloud import storage
from google.cloud import bigquery
import functions_framework

@functions_framework.http
def prepare_data(request):
    # DOWNLOAD THE RAW DATA AS A DATAFRAME FROM WHICHEVER TABLE YOU NEED:
    print('Getting the raw data...')
    bq_client = bigquery.Client()

    project_id = "musa509-nlrb-election-mapper"
    dataset_id = "musa509-nlrb-election-mapper.NLRB_Election_kathleen_sample_data"
    table_id = "musa509-nlrb-election-mapper.NLRB_Election_kathleen_sample_data.calculated_table"

    query =  """
        SELECT *
        FROM `musa509-nlrb-election-mapper.NLRB_Election_kathleen_sample_data.calculated_table`
        """

    nlrb = bq_client.query(query).to_dataframe()
    #print('Raw data downloaded.')
    print('calculated_table downloaded.')

    #print("Reading the sample data...")
    #nlrb = pd.read_csv("/path/to/sample_data.csv")
    
    # Filter the nlrb dataframe to only include samples in Region 4 and Region 6
    nlrb_filtered = nlrb
    
    # Create a new dataframe with just the City and State columns
    nlrb_geocode_inputs = nlrb_filtered[['City', 'States & Territories']]
    
    # Only keep the unique rows in the nlrb_geocode_inputs dataframe
    nlrb_geocode_inputs = nlrb_geocode_inputs.drop_duplicates()
    
    # Combine the City and State columns into a series called city_state.
    city_state = nlrb_geocode_inputs['City'].str.cat(nlrb_geocode_inputs['States & Territories'], sep=', ')
    
    # Create a new dataframe by geocoding the city_state series; use the geocodio
    # provider. The resulting dataframe (nlrb_geocoded) will only have the
    # following columns:
    #   * address -- the address that the geocoder interpreted from the city_state
    #   * geometry -- the point that the geocoder returned for the address
    print(f'Geocoding {len(nlrb_geocode_inputs)} addresses...')
    nlrb_geocoded = gpd.tools.geocode(city_state, provider='geocodio', api_key='5f8a7a751ad1b1f1717815a713bdd8b5a5725fa', timeout=60)
    print('Geocoding complete.')
    
    # Add the City and State columns back to the nlrb_geocoded dataframe (they
    # should be in the same order).
    nlrb_geocoded = nlrb_geocoded.join(nlrb_geocode_inputs)
    
    # Create a new dataframe by merging the nlrb_filtered and nlrb_geocoded
    # dataframes. The join should be on the City and State columns.
    nlrb_geocoded = nlrb_geocoded.merge(nlrb_filtered, on=['City', 'States & Territories'])
    
    # Print out the results (and write them to a file)
    print(nlrb_geocoded.head())
    # with open("/path/to/sample_data.geojson", "w") as f:
    #    f.write(nlrb_geocoded.to_json())

    # UPLOAD THE DATA AS GEOJSON TO THE PROCESSED BUCKET
    client = storage.Client()
    processed_bucket = client.bucket('musa509-nlrb-election-mapper-processed-data')
    blob = processed_bucket.blob('nlrb_election_data.geojson')
    blob.upload_from_string(nlrb_geocoded.to_json(), content_type='application/json')

    return 'OK'  #needed once it's in a cloud function - turn on
