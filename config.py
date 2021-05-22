class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///grh_users.db"
    SECRET_KEY = "3tX4o4vE_AvMoDUN9O8ISUo2YQ03uxwamg"
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True