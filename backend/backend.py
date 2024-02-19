import sys
import json
import accounts


def handleRequest(request_data: str):
    req = json.loads(request_data)
    # print(req)
    if req["message"] == "hello":
        return "hello back"

    elif req["message"] == "steam":
        return accounts.steam(req["steamID"])
    else:
        return "idk"


request_data = sys.stdin.readline().strip()

# Process the request (replace this with your actual logic)
res = handleRequest(request_data)

# Send the response to standard output
# print(js)
print(json.dumps(res))
sys.stdout.flush()
