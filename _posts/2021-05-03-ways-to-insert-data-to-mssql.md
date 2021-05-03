---
layout: post
title:  "Different ways to insert data to Microsoft SQL Server"
date:   2021-05-03 00:00:00 +0800
tags:   ['C#', 'SQL Server', '.NET']
---

Examples requires [Dapper lib](https://github.com/DapperLib/Dapper)

## Single value

```csharp
var conn = new SqlConnection("myconnectionstring");

// RUn single sql command
// INSERT MYTABLE(DbColumn1, DbColumn2) VALUES ('ABC', 123)
var result = conn.Execute(@"INSERT MYTABLE(DbColumn1, DbColumn2) VALUES (@DbCol1, @DbCol2)", new { DbCol1 = "ABC", DbCol2 = 123});

```

## Multiple value

```csharp
var conn = new SqlConnection("myconnectionstring");

var myList = new List<MyObject>();
myList.Add(new MyObject() { DbCol1 = "ABC", DbCol2 = 123});
myList.Add(new MyObject() { DbCol1 = "DEF", DbCol2 = 456});

// Run single SQL command multiple times, i.e. like a loop
// INSERT MYTABLE(DbColumn1, DbColumn2) VALUES ('ABC', 123)
// INSERT MYTABLE(DbColumn1, DbColumn2) VALUES ('DEF', 456)
var result = conn.Execute(@"INSERT MYTABLE(DbColumn1, DbColumn2) VALUES (@DbCol1, @DbCol2)", myList);
```

## Multiple value (faster)

- Maximum 1000 set of values per insert statement

```csharp
var conn = new SqlConnection("myconnectionstring");

var myList = new List<MyObject>();
myList.Add(new MyObject() { DbCol1 = "ABC", DbCol2 = 123});
myList.Add(new MyObject() { DbCol1 = "DEF", DbCol2 = 456});

var sqlCmd = "INSERT MYTABLE(DbColumn1, DbColumn2) VALUES ";
sqlCmd += string.Join(",", myList.Select(x => $"('{x.DbCol1}', '{x.DbCol2}')"));

// Run single SQL command
// INSERT MYTABLE(DbColumn1, DbColumn2) VALUES ('ABC', 123), ('DEF, 456)
var result = conn.Execute(sqlCmd)
```

## Multiple value (fastest)

- Use [SqlBulkCopy](https://docs.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlbulkcopy)
- No construction of SQL command required
- Supports more than 1000 rows

```csharp
var conn = new SqlConnection("myconnectionstring");

var myDataTable = new DataTable("myTable");
myDataTable.Columns.Add("DbColumn1");
myDataTable.Columns.Add("DbColumn2");

myDataTable.Rows.Add(new object[] { "ABC", 123 });
myDataTable.Rows.Add(new object[] { "DEF", 456 });

// No SQL, only bcp
SqlBulkCopy bulkCopy = new SqlBulkCopy(conn);
bulkCopy.DestinationTableName = "dbo.MYTABLE";
bulkCopy.WriteToServer(pageDt.CreateDataReader());
```