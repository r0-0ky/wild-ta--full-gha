from functools import cache as cache_func
from pydantic import Field
from motor.motor_asyncio import AsyncIOMotorClient
import redis
import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WEBAPP_URL: str = Field(..., env="WEBAPP_URL")
    BOT: str = Field(..., env="BOT")

    @property
    def redis_url(self) -> str:
        """Get link for redis connection."""
        return f'redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}'

    REDIS_HOST: str = Field("redis", env="REDIS_HOST")
    REDIS_PORT: int = Field("6379", env="REDIS_PORT")
    REDIS_DB: int = Field("0", env="REDIS_DB")

    class Config:
        env_file = ".env"


@cache_func
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

# Redis
redis_instance = redis.StrictRedis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB
)