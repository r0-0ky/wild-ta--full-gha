from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.api_routes import router
from src.routers.ws_routes import ws_router
app = FastAPI(title="TestAPI", version="1.0.0")
app.include_router(router, tags=["Client"])
app.include_router(ws_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8002, reload=True, lifespan="on")