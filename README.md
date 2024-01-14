# min_mysql

https://github.com/waylonwilliams/min_mysql/assets/145303505/d008d7d8-bb87-48e0-aa6a-e35a813e0c65

## motivation

I was previously using MySQL workbench for managing databases used in my projects. However, for the relatively small amount of data and tables I am managing, something as thorough as MySQL Workbench is unnecessary, slow, and ugly. I wanted to make a database manager that has a quicker boot, faster queries for small data management, nicer styling, no restrictions on operations, and integrated GPT support.

## features

* Connects to local or remote MySQL databases
* Stores login information locally to provide quicker access to the last used connection
* Dynamic tree view for databases and tables
* Runs "USE" and "SELECT * FROM" queries by clicking on a database or table name, respectively
* SQL editor with text highlighting
* Successful queries display results in table view or response message; failed queries return an error message to support debugging
* GPT support for querying databases in plain English
* (What I consider) a nicely styled interface, making it easy to understand the displayed data

## how to use

As this is still somewhat of a WIP, I haven't built the executables and probably won't until I begin to move on to something else. For now, you can clone this repository and run the app locally.

```
git clone https://github.com/waylonwilliams/min_mysql.git
cd min_mysql
npm install
npm run dev
```
