import os
import time
from web3 import Web3, exceptions
import requests
import json
from dotenv import load_dotenv
load_dotenv()

with open('./token_abi.json', mode="r") as f:
    token_abi = json.load(f)

# Ethereum configuration
INFURA_URL = os.environ.get('INFURA_URL')  # Replace with your Infura URL
# Replace with the ERC20 contract ABI
ERC20_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"  

w3 = Web3(Web3.HTTPProvider(INFURA_URL))

contract = w3.eth.contract(address=ERC20_CONTRACT_ADDRESS, abi=token_abi)
event_filter = contract.events.Transfer.create_filter(fromBlock="latest")
while True:
    print("checking!")
    # try:
    events = event_filter.get_new_entries()
    for event in events:
        # Send the message to the user
        decoded_event = Web3.to_json(event)
        dict_event = json.loads(decoded_event)
        from_address = dict_event['args']['from'].lower()
        to_address = dict_event['args']['to'].lower()
        amount = str(dict_event['args']['value'])
        message = {}
        message['data'] = from_address + ' sent ' + amount + ' DAI to ' + to_address
        print(message)
        payload = json.dumps(message)
        try:
            response = requests.post("http://localhost:5001/webhook", data=payload, headers={'Content-Type': 'application/json'})
            print(f"Event sent. Response: {response.status_code}, {response._content}")
        except ConnectionError:
            print("Server is not active or connection refused. Retrying in 10 seconds.")
            time.sleep(10)
        except Exception as e:
            print(f"Something went wrong: {e}")
            time.sleep(10)
