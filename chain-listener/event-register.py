import json
from flask import Flask, request
import os

app = Flask(__name__)

def validate_user_info(info):
    if not info:
        return "Bad Request: event inforamtion", 400
    if not info['chatId']:
        return "Bad Request: missing chat id", 400
    if not info['contractAddress']:
        return "Bad Request: missing contract to monitor", 400
    if not info['eventName']:
        return "Bad Request: missing event to monitor", 400


@app.route('/event-register', methods=['POST'])
def save_user_info():
    user_info = request.get_json()
    # validate_user_info(user_info)

    filename = './chain-listener/event-register.json'

    # Check if the file exists and is not empty
    if os.path.isfile(filename) and os.path.getsize(filename) > 0:
        # Load the existing JSON data
        with open(filename, 'r') as file:
            data = json.load(file)
    else:
        # If the file is empty or doesn't exist, create an empty dictionary
        data = []

    # Append the new data to the existing dictionary
    data.append(user_info)

    # Save the updated dictionary as a JSON file
    with open(filename, 'w') as file:
        json.dump(data, file)
    return "User information saved successfully", 200

if __name__ == '__main__':
    app.run(debug=True, port=3005)
