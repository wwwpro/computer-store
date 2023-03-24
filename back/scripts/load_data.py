import os
import json
import argparse
from uuid import uuid4

import boto3
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_data():

    load_dotenv()

    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
    table = dynamodb.Table(os.getenv('DYNAMO_DB_TABLE'))

    with open(os.path.join(BASE_DIR, 'data', 'db.json'), encoding='utf8') as json_file:
        data = json.load(json_file)
        for row in data:
            item = {
                'pk': '#product',
                'sk': f'#{row["vendor"]}#{uuid4()}',
                'title': row['title'],
                'price': row['price'],
                'striked-price': row['striked-price'],
                'image': row['image'],
                'vendor': row['vendor']
            }
            table.put_item(Item=item)

    print(f'[DONE!]')


def run():

    parser = argparse.ArgumentParser(description='Populates DynamoDB data from db.json')
    parser.add_argument('--aws', help='Loads data on an AWS table.', action='store_true')
    parser.add_argument('--tablename', '-T', help='Loads data on an AWS table.')

    args = parser.parse_args()

    print(f'[AWS is]: {args.aws}')
    print(f'[Tablename is]: {args.tablename}')
