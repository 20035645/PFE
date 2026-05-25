from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mistral_api_key: str
    mistral_model: str = "mistral-small-latest"
    mongo_uri: str = "mongodb://localhost:27017/gym"
    express_url: str = "http://localhost:5000"

    class Config:
        env_file = ".env"


settings = Settings()
