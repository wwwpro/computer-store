import os
import json
from urllib.parse import quote

import requests
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def run():
    load_dotenv()

    url = f'{os.getenv("OPENSEARCH_URL")}/products/_doc'

    with open(os.path.join(BASE_DIR, 'data', 'db.json'), encoding='utf8') as json_file:
        data = json.load(json_file)

        for index, item in enumerate(data):
            item['id'] = f'product{index}'
            document = item
            password = quote(os.getenv("OS_PASSWORD"))
            request_url = f'https://{os.getenv("OS_USER")}:{password}@{url}/{item["id"]}'
            r = requests.put(request_url, json=document, headers={'Content-Type': 'application/json'})

            print(f'[REQUEST STATUS]: {r.status_code}')

    print('[DONE!]')
