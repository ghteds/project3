import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

import pandas as pd
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
#from flask.ext.mysqldb import MySQL

import pymysql
pymysql.install_as_MySQLdb()

connection_string ='root:tedly@localhost/esrd_db'
engine = create_engine(f'mysql://{connection_string}')

Base = automap_base()
Base.prepare(engine, reflect=True)

#flask-cors to handle cors errors
# from flask_cors import CORS


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f'mysql://{connection_string}'
db=SQLAlchemy(app)
# CORS(app)


Anemia = Base.classes.anem_tbl
Depression = Base.classes.depr_tbl
   



@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/angular")
def angular():
    #return anguluar.html
    return render_template('angular.html')

@app.route('/anemia')
def anemia():
    result=db.session.query(Anemia).statement

    df = pd.read_sql_query(result, db.session.bind)

    data = {
        'FacilityName': df['FacilityName'].tolist(),
        'CCN':df['CCN'].tolist(),
        'City':df['City'].tolist(),
        'State':df['State'].tolist(),
        'Zipcode':df['Zipcode'].tolist(),
        'AnemiaScore':df['AnemiaScore'].tolist(),
        'StateAvg':df['StateAvg'].tolist(),
        'NationalAvg':df['NationalAvg'].tolist(),
        'ZipLat':df['ZipLat'].tolist(),
        'ZipLon':df['ZipLon'].tolist(),
        'StateLat':df['StateLat'].tolist(),
        'StateLon':df['StateLon'].tolist()
    }
    
    return  jsonify(data)

@app.route('/testanemia')
def testanemia():
    #result=db.session.query(Anemia).statement

    #df = pd.read_sql_query(result, db.session.bind)

    data = {
        'Facility': ["SAN FRANCISCO DIALYSIS CENTER","CITRUS DIALYSIS CENTER","RAI PERALTA"],    
        'State':['CA','TX','GA'],        
        'AnemiaScore': [10,10,10]        
    }
    
    return  jsonify(data)

@app.route('/depression')
def depression():
    result=db.session.query(Depression).statement

    df = pd.read_sql_query(result, db.session.bind)

    data = {
        'FacilityName': df['FacilityName'].tolist(),
        'CCN':df['CCN'].tolist(),
        'City':df['City'].tolist(),
        'State':df['State'].tolist(),
        'Zipcode':df['Zipcode'].tolist(),
        'DepressionScore':df['DepressionScore'].tolist(),
        'StateAvg':df['StateAvg'].tolist(),
        'NationalAvg':df['NationalAvg'].tolist(),
        'ZipLat':df['ZipLat'].tolist(),
        'ZipLon':df['ZipLon'].tolist(),
        'StateLat':df['StateLat'].tolist(),
        'StateLon':df['StateLon'].tolist(),
    }
    
    return  jsonify(data)

@app.route('/states')
def states():
    result=db.session.query(Anemia.State).distinct().all()
    # print(result)
    # df = pd.read_sql_query(result, columns=['State']) #db.session.bind)
    # print(df)
    data = {
        'State':result,       
    }    
    return  jsonify(result)
@app.route('/teststates')
def teststates():
    result=db.session.query(Anemia.State).distinct().all()
    # print(result)
    # df = pd.read_sql_query(result, columns=['State']) #db.session.bind)
    # print(df)
    data = {
        'State':result,       
    }    
    return  jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
