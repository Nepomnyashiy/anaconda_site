from fastapi import FastAPI

app = FastAPI(title="anaconda-api", version="0.0.1")

# CORS placeholder (disabled by default).
ENABLE_CORS = False
if ENABLE_CORS:
    from fastapi.middleware.cors import CORSMiddleware

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get("/api/health")
def health() -> dict[str, object]:
    return {"ok": True, "service": "api"}


@app.get("/api/version")
def version() -> dict[str, str]:
    return {"version": "0.0.1"}
