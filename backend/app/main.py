from fastapi import FastAPI

app = FastAPI(title="AgentPassport API")


@app.get("/")
def root():
    return {"message": "AgentPassport API is running"}