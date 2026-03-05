from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def read_root():
 return {"message": "SSAT backend is running"}
