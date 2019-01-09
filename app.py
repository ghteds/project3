import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

import pymysql
pymysql.install_as_MySQLdb()

connection_string ='root:tedly@localhost/esrd_db'
engine = create_engine(f'mysql://{connection_string}')

Base = automap_base()
Base.prepare(engine, reflect=True)

app = Flask(__name__)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route('/anemia')
def anemia():
#print(Base.classes.keys())
    result = engine.execute('select * from anem_tbl').fetchall()
    #print (result)
    return jsonify(result)



if __name__ == "__main__":
    app.run()
