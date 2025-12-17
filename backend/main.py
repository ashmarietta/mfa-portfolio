from fastapi import FastAPI
import json
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "writings.json")) as f:
    writings = json.load(f)

@app.get("/")
def root():
    return {"message": "Writing Portfolio API"}

@app.get("/works")
def get_works():
    return writings