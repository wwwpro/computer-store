import os
import re
import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
from datetime import datetime
from boto3.dynamodb.types import TypeDeserializer

region = 'us-west-2'
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)
user = os.getenv('OPENSEARCH_USER')
password = os.getenv('OPENSEARCH_PASSWORD')


host = os.getenv('OPENSEARCH_HOST')
search_type = '_doc'

headers = {"Content-Type": "application/json"}


def lambda_handler(event, context):
    count = 0

    index = 'ali_index'
    url = host + '/' + index + '/' + search_type + '/'

    for record in event['Records']:
        # Get the primary key for use as the OpenSearch ID
        sk: str = record['dynamodb']['Keys']['sk']['S']
        uuid = re.sub(r'[.#:+\s]', '', sk)

        if record['eventName'] == 'REMOVE':
            requests.delete(url + sk, auth=awsauth)
        else:
            # Before placing into OpenSearch
            deserializer = boto3.dynamodb.types.TypeDeserializer()
            document = {k: deserializer.deserialize(v) for k, v in record['dynamodb']['NewImage'].items()}
            try:
                stamp = int(document.get("created", 0))
            except Exception as e:
                print(f'ERROR ON STAMP {str(e)}')
                stamp = document.get('created', 0)
            try:
                created = datetime.utcfromtimestamp(stamp).isoformat()
            except:
                print(f'ERROR ON STAMP CONVERSION: {str(e)}')
                created = None
            document["created"] = created if created else document["created"]
            request_url = 'https://' + user + ':' + password + '@' + url + uuid
            r = requests.put(request_url, json=document, headers=headers)
            print(f'[REQUEST STATUS]: {r.status_code}')
            print(f'[REQUEST BODY]: {r.content}')
        count += 1
    return str(count) + ' records processed.'
