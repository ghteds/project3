drop database if exists esrd_db;
create database esrd_db;
use esrd_db;

drop table if exists anem_tbl;
create table anem_tbl (
	id INT auto_increment PRIMARY KEY,
    FacilityName varchar(100),
    CCN INT,
    City varchar(100),
    state varchar(100),
    Zipcode INT,
    MeasureName varchar(100),
    AnemiaScore INT,
    value INT,
    NationalAvg INT,
    ZipLat INT,
    ZipLon INT,
    StateLat INT,
    StateLon INT
    );

SELECT * FROM anem_tbl;

drop table if exists anem_stateavgs_tbl;
create table anem_stateavgs_tbl (
	id INT auto_increment PRIMARY KEY,
    value INT,
    NationalAvg INT,
    StateLat INT,
    StateLon INT
    );
    
SELECT * FROM anem_stateavgs_tbl;

drop table if exists anem_stateoutliers_tbl;
create table anem_stateoutliers_tbl (
	id INT auto_increment PRIMARY KEY,
    value INT,
    StateLat INT,
    StateLon INT
    );
    
SELECT * FROM anem_stateoutliers_tbl;

drop table if exists depr_tbl;
create table depr_tbl (
	id INT auto_increment PRIMARY KEY,
    FacilityName varchar(100),
    CCN INT,
    City varchar(100),
    state varchar(100),
    Zipcode INT,
    MeasureName varchar(100),
    DepressionScore INT,
    value INT,
    NationalAvg INT,
    ZipLat INT,
    ZipLon INT,
    StateLat INT,
    StateLon INT
    );
    
SELECT * FROM depr_tbl;

drop table if exists depr_stateavgs_tbl;
create table depr_stateavgs_tbl (
	id INT auto_increment PRIMARY KEY,
    value INT,
    NationalAvg INT,
    StateLat INT,
    StateLon INT
    );
    
SELECT * FROM depr_stateavgs_tbl;
