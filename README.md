# AI Database Manager


https://github.com/waylonwilliams/ai-database-manager/assets/145303505/454f6589-8bbe-4964-977f-ec708b475c04


## Motivation

I was previously using MySQL workbench for managing databases used in my projects. However, for the relatively small amount of data and tables I am managing, something as thorough as MySQL Workbench is unnecessary, slow, and ugly. I wanted to make a database manager that has a quicker boot, faster queries for small data management, nicer styling, no restrictions on operations, and integrated GPT support.

## Features

* Connects to local or remote MySQL databases
* Stores login information locally to provide quicker access to the last used connection
* Dynamic tree view for databases and tables
* Runs "USE" and "SELECT * FROM" queries by clicking on a database or table name, respectively
* SQL editor with text highlighting
* Successful queries display results in table view or response message; failed queries return an error message to support debugging
* GPT support for querying databases in plain English
* (What I consider) a nicely styled interface, making it easy to understand the displayed data

## How to use

View the [releases](https://github.com/waylonwilliams/ai-database-manager/releases) tab on the side of this repo to download the distributable for your system

Alternatively, you can clone this repo and run the app locally by running the following commands

```
git clone https://github.com/waylonwilliams/ai-database-manager.git
cd ai-database-manager
npm install
npm run dev
```
