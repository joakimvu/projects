<h1 align="center"> Lunsjlisten</h1>

<p align="center">Webapplikasjoner ITF31619</p>
<p align="center">Eksamen Høst 2022</p>
<p align="center">Laget av: <a href="https://github.com/joakimvu">Joakim Vu</a>, <a href="https://github.com/arkstig">Stig Ark</a>, og <a href="https://github.com/GJRTSN">Jostein Gjertsen</a></p>

# Innhold

1. [REST API endepunkter for ansatte](#rest-api-endepunkter-for-ansatte)
   1. [Hente ut alle ansatte](#1-hente-ut-alle-ansatte)
   2. [Hente ut en ansatt](#1-hente-ut-en-ansatt)
   3. [Lage en ny ansatt](#1-lage-en-ny-ansatt)
   4. [Oppdatere navn til en ansatt](#1-oppdatere-navn-til-en-ansatt)
2. [REST API endepunkter for lunsj](#rest-api-endepunkter-for-lunsjliste)
   1. [Hente ut alle lunsjliste for alle ukene](#1-hente-ut-alle-lunsjliste-for-alle-ukene)
   2. [Hente ut lunsjliste for en gitt uke eller mellom 2 gitte uker](#2-hente-ut-lunsjliste-for-en-gitt-uke-eller-mellom-2-gitte-uker)
3. [REST API endepunkter for endre lunsj](#rest-api-endepunkt-for-å-endre-lunsj-på-en-gitt-dag)
   1. [Oppdatere hvem som skal lage lunsj på en gitt dag](#1-oppdatere-hvem-som-skal-lage-lunsj-på-en-gitt-dag)
4. [Laste ned lunsjlisten i .xlsx format for Excel](#laste-ned-lunsjlisten-i-xlsx-format-for-excel)
   1. [Hvordan bruke api/download](#1-hvordan-bruke-apidownload)

## REST API endepunkter for ansatte

### 1. Hente ut alle ansatte

#### Request

`GET index/api/employees`

#### Response

`200 OK`

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    {success: true,
    {data:[
        {id: 1, name: "Trude", rules: "days:123"},
        {id: 2, name: "Lars", rules: "*days:123*"}...]}}
```

`500 Internal Server Error`

```javascript
    HTTP/1.1 500
    Content-Type: application/json
    {success: false,
    {error: "Internal Server Error"}}
```

<br>

### 2. Hente ut en ansatt

#### Request

`GET index/api/employees/[id]`

#### Response

`200 Ok`

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    {success: true,
    {data:{id: 1, name: "Trude", rules: "days:123", day: [
        {name: "Mandag", week:1},
        {name: "Mandag", week:3}...]}}}
```

`500 Internal Server Error`

```javascript
    HTTP/1.1 500
    Content-Type: application/json
    {success: false,
    {error: "Internal Server Error"}}

```

<br>

### 3. Lage en ny ansatt

#### Request

`POST index/api/employees/create`

#### Response

`200 Ok`

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    body: JSON.stringify({name, rules})
    {success: true,
    {message: "Ansatt er opprettet"}}
```

`400 Bad Request`

Missing input: name, rules

```javascript
    HTTP/1.1 400
    Content-Type: application/json
    body: JSON.stringify({})
    {success: true,
    {error: "Mangler obligatorisk felt: navn, regler"}}
```

Missing input: name

```javascript
    HTTP/1.1 400
    Content-Type: application/json
    body: JSON.stringify({rules})
    {success: true,
    {error: "Mangler obligatorisk felt: navn"}}
```

Missing input: rules

```javascript
    HTTP/1.1 400
    Content-Type: application/json
    {success: true,
    body: JSON.stringify({name})
    {error: "Mangler obligatorisk felt: regler"}}
```

`500 Internal Server Error`

```javascript
    HTTP/1.1 500
    Content-Type: application/json
    {success: false,
    {error: "Internal Server Error"}}

```

<br>

### 4. Oppdatere navn til en ansatt

#### Request

`PATCH index/api/employees/[id]`

#### Response

`200 Ok`

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    {success: true,
    {message: "Ansatt er oppdatert"}}
```

`400 Bad Request`

Missing input: name

```javascript
    HTTP/1.1 400
    Content-Type: application/json
    {success: true,
    {message: "Mangler obligatorisk felt: navn"}}
```

`500 Internal Server Error`

```javascript
    HTTP/1.1 500
    Content-Type: application/json
    {success: false,
    {error: "Internal Server Error"}}

```

<br>
<br>

## REST API endepunkter for lunsjliste

### 1. Hente ut alle lunsjliste for alle ukene

#### Request

`GET index/api/weeks`

#### Response

`200 Ok`

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    {success: true,
    {data: [
        {week: 1, day: [
            {"Mandag", employee:{name:"Trude"}},
            {"Tirsdag", employee:{name:"Sebastian"}},
            {"Onsdag", employee:{name:"Lars"}},
            {"Torsdag", employee:{name:"Simen"}},
            {"Fredag", employee:{name:"Kaare"}},
        ]},
        {week: 2, day: [
            {"Mandag", employee:{name:"Olav"}},
            {"Tirsdag", employee:{name:"Trine"}},
            {"Onsdag", employee:{name:"Finn"}},
            {"Torsdag", employee:{name:"Oline"}},
            {"Fredag", employee:{name:"Nora"}},
        ]}...
    ]}}
```

`500 Internal Server Error`

```javascript
    HTTP/1.1 500
    Content-Type: application/json
    {success: false,
    {error: "Internal Server Error"}}
```

### 2. Hente ut lunsjliste for en gitt uke eller mellom 2 gitte uker

#### Request

`GET index/api/weeks/[...id]`

#### Response

`200 Ok`

For one week

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    {success: true,
    {data:
        {week: 1, day: [
            {"Mandag", employee:{name:"Trude"}},
            {"Tirsdag", employee:{name:"Sebastian"}},
            {"Onsdag", employee:{name:"Lars"}},
            {"Torsdag", employee:{name:"Simen"}},
            {"Fredag", employee:{name:"Kaare"}},
        ]}
    }}
```

From a week to another week (week 1 to week 3)

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    {success: true,
    {data: [
        {week: 1, day: [
            {"Mandag", employee:{name:"Trude"}},
            {"Tirsdag", employee:{name:"Sebastian"}},
            {"Onsdag", employee:{name:"Lars"}},
            {"Torsdag", employee:{name:"Simen"}},
            {"Fredag", employee:{name:"Kaare"}},
        ]},
        {week: 2, day: [
            {"Mandag", employee:{name:"Olav"}},
            {"Tirsdag", employee:{name:"Trine"}},
            {"Onsdag", employee:{name:"Finn"}},
            {"Torsdag", employee:{name:"Oline"}},
            {"Fredag", employee:{name:"Nora"}},
        ]},
        {week: 3, day: [
            {"Mandag", employee:{name:"Trude"}},
            {"Tirsdag", employee:{name:"Sebastian"}},
            {"Onsdag", employee:{name:"Lars"}},
            {"Torsdag", employee:{name:"Simen"}},
            {"Fredag", employee:{name:"Kaare"}},
        ]}...]
    }}
```

`500 Internal Server Error`

```javascript
    HTTP/1.1 500
    Content-Type: application/json
    {success: false,
    {error: "Internal Server Error"}}
```

## REST API endepunkt for å endre lunsj på en gitt dag

### 1. Oppdatere hvem som skal lage lunsj på en gitt dag

#### Request

`PATCH index/api/days/`

#### Response

`200 Ok`

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    body: JSON.stringify({dayId, employeeId})
    {success: success,
    {message: "Lunsjlista er oppdatert"}}
```

`400 Bad Request`

Missing input: dayId, employeeId

```javascript
    HTTP/1.1 400
    Content-Type: application/json
    body: JSON.stringify({})
    {success: false,
    {message: "Missing input: dayId, employeeId"}}
```

Missing input: dayId

```javascript
    HTTP/1.1 400
    Content-Type: application/json
    body: JSON.stringify({employeeId})
    {success: false,
    {message: "Missing input: dayId"}}
```

Missing input: employeeId

```javascript
    HTTP/1.1 400
    Content-Type: application/json
    body: JSON.stringify({dayId})
    {success: false,
    {message: "Missing input: employeeId"}}
```

`500 Internal Server Error`

```javascript
    HTTP/1.1 500
    Content-Type: application/json
    {success: false,
    {error: "Internal Server Error"}}
```

## Laste ned lunsjlisten i .xlsx format for Excel

### 1. Hvordan bruke api/download

#### Request

`GET api/download`

```javascript
    fetch('https://localhost:3000/api/download'),
    {
     method: “GET”
    }).then((response) => response.json()).then((data) => {
    console.log('Success:', data);
      })
    .catch((error) => {
    console.error('Error:', error);
     });
```

#### Response

`200 Ok`

```javascript
    {success: true, data: data}
```

#### Laste ned .xlsx filen

```javascript
    XLSX.writeFile(data?.data, “Lunsjlisten2022.xlsx”)
```
