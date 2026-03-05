from fastapi import FastAPI

app = FastAPI()

satellites = [
  {""id"": ""KA-LEO-01"", ""name"": ""KA-LEO-01"", ""operator"": ""KA/LEO"", ""mbps_down"": 150, ""mbps_up"": 50, ""status"": ""OK""},
  {""id"": ""KU-GEO-01"", ""name"": ""KU-GEO-01"", ""operator"": ""KU/GEO"", ""mbps_down"": 200, ""mbps_up"": 60, ""status"": ""OK""},
  {""id"": ""STAR-1"", ""name"": ""Starlink-1"", ""operator"": ""Starlink"", ""mbps_down"": 120, ""mbps_up"": 40, ""status"": ""OK""},
  {""id"": ""HCX-1"", ""name"": ""HCX-1"", ""operator"": ""HCX"", ""mbps_down"": 90, ""mbps_up"": 30, ""status"": ""OK""}
]

@app.get("/satellites")
def list_satellites():
    return satellites

@app.get("/satellites/{sid}")
def get_satellite(sid: str):
    for s in satellites:
        if s["id"] == sid:
            return s
    return {""error"": ""not found""}

@app.get("/scenario/{name}")
def run_scenario(name: str):
    return {""scenario"": name, ""recommendations"": [""Reroute via KA-LEO-01"", ""Check Starlink proximities"", ""Monitor backend latency""]}

@app.get("/")
def read_root():
    return {""message"": ""SSAT backend is running""}
