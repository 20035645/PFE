from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    gemini_api_key: str
    gemini_model: str = "gemini-1.5-pro"
    mongo_uri: str = "mongodb://localhost:27017/gym"
    express_url: str = "http://localhost:5000"

    class Config:
        env_file = ".env"

settings = Settings()
