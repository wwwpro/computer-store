import boto3
import json
import requests
from requests_aws4auth import AWS4Auth

region = 'us-west-2'
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

host = 'https://search-computer-store-ltmny7cog6zsifaat23dqek6zq.us-west-2.es.amazonaws.com'
index = 'products'
url = host + '/' + index + '/_search'


def lambda_handler(event, context):

    if event.get('queryStringParameters') and event['queryStringParameters'].get('q'):
        query = {
            "size": 12,
            "query": {
                "multi_match": {
                    "query": event['queryStringParameters']['q'],
                    "fields": ["title^4", "vendor^2"]
                },
            },
            "sort": [
                {"_id": "asc"}
            ]
        }
    else:
        query = {
            "size": 12,
            "sort": [
                {"_id": "asc"}
            ]
        }

    if event.get('queryStringParameters') and event['queryStringParameters'].get('sa'):
        query['search_after'] = [event['queryStringParameters']['sa']]

    headers = {"Content-Type": "application/json"}

    r = requests.get(url, auth=awsauth, headers=headers, data=json.dumps(query))

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": '*'
        },
        "isBase64Encoded": False,
        'body': r.text
    }
