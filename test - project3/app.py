import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

import pandas as pd
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import csv
from flaskext.mysql import MySQL

import pymysql
pymysql.install_as_MySQLdb()

connection_string ='root:toor2@localhost/esrd_db'
engine = create_engine(f'mysql://{connection_string}')

Base = automap_base()
Base.prepare(engine, reflect=True)


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f'mysql://{connection_string}'

Anemia = Base.classes.anem_tbl
Depression = Base.classes.depr_tbl
AnemiaAvgs = Base.classes.anem_stateoutliers_tbl
DepressionAvgs = Base.classes.depr_stateoutliers_tbl

db=SQLAlchemy(app)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/anemia")
def anemia():
    result=db.session.query(Anemia).statement

    df = pd.read_sql_query(result, db.session.bind)

    data = {
        'FacilityName': df['FacilityName'].tolist(),
        'CCN':df['CCN'].tolist(),
        'City':df['City'].tolist(),
        'state':df['state'].tolist(),
        'Zipcode':df['Zipcode'].tolist(),
        'AnemiaScore':df['AnemiaScore'].tolist(),
        'value':df['value'].tolist(),
        'NationalAvg':df['NationalAvg'].tolist(),
        'ZipLat':df['ZipLat'].tolist(),
        'ZipLon':df['ZipLon'].tolist(),
        'StateLat':df['StateLat'].tolist(),
        'StateLon':df['StateLon'].tolist(),
    }

    return  jsonify(data)

@app.route("/anemiaavgs")
def anemiaavgs():
    result=db.session.query(AnemiaAvgs).statement

    df = pd.read_sql_query(result, db.session.bind)

    data = {
        'state': df['state'].tolist(),
        'value': df['value'].tolist(),
        'StateLat': df['StateLat'].tolist(),
        'StateLon': df['StateLon'].tolist(),
    }

    return  jsonify(data)

@app.route('/depression')
def depression():
    print("Depression Route")
    result=db.session.query(Depression).statement

    df = pd.read_sql_query(result, db.session.bind)

    data = {
        'FacilityName': df['FacilityName'].tolist(),
        'CCN':df['CCN'].tolist(),
        'City':df['City'].tolist(),
        'state':df['state'].tolist(),
        'Zipcode':df['Zipcode'].tolist(),
        'DepressionScore':df['DepressionScore'].tolist(),
        'value':df['value'].tolist(),
        'NationalAvg':df['NationalAvg'].tolist(),
        'ZipLat':df['ZipLat'].tolist(),
        'ZipLon':df['ZipLon'].tolist(),
        'StateLat':df['StateLat'].tolist(),
        'StateLon':df['StateLon'].tolist(),
    }

    return  jsonify(data)

@app.route("/depressionavgs")
def depressionavgs():
    result=db.session.query(DepressionAvgs).statement

    df = pd.read_sql_query(result, db.session.bind)

    data = {
        'state': df['state'].tolist(),
        'value': df['value'].tolist(),
        'StateLat': df['StateLat'].tolist(),
        'StateLon': df['StateLon'].tolist(),
    }

    return  jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
