import json
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")

# open json file
with open('../labo_data.json', 'r') as file:
    data = json.load(file)

# connect to db
conn = psycopg2.connect(
    dbname=db_name,
    user=db_user,
    password=db_password,
    host=db_host
)
cur = conn.cursor() # cursor to execute queries

# insert data into db
for entry in data:
    cur.execute("""
        INSERT INTO labos (labo_id, name, prof, description, prerequisites, room_number, student_field, research_field, prof_email)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (entry["labo_id"], entry["name"], entry["professor"], entry["description"], entry["prerequisites"], entry["room_number"], entry["student_field"], entry["research_field"], entry["professor_email"]))

# commit and close
conn.commit()
cur.close()
conn.close()
