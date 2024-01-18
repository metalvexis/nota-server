# nota-server

Simple Node.Js Note-taking Service

# Assumptions

1. Notes are small pieces of text or a short paragraph that should not exceed 256 characters
2. Notes must have a title & not exceed 256 characters
3. Notes body can be blank & not exceed 256 characters
4. Users can delete existing note body but keep note
5. The service does not keep track who owns each note
6. You should provide a userId when creating a note if you need to track ownership

# Use API deployed in Railway.app

```bash
# Get all notes
curl https://nota-server-production.up.railway.app \
-H "Accept: application/json"
```

```bash
# Create a note
curl https://nota-server-production.up.railway.app \
-X POST \
-H "content-type: application/json" \
-H "accept:application/json" \
-d '{"userId": "user-001","title": "My curl note","body": "new note added using curl"}'
```

# or Use locally deployed server

## Requirements:

1. Node v20 or higher

## Steps:

1. Install dependencies

```bash
npm install
```

2. Build server

```bash
npm run build
```

3. Start server

```bash
npm start
```

4. Check API

```bash
curl http://localhost:3000/
```

# API Endpoints

## POST /notes

Create new note.
Do note that all input fields are capped to 256 characters.

### Parameters

#### Body

Parameter content type: `application/json`

| field       | type     | description                          |
| ----------- | -------- | ------------------------------------ |
| note        | `json`   | body parameter                       |
| note.userId | `string` | users unique id (max 256 chars)      |
| note.title  | `string` | title of the note (max 256 chars)    |
| note.body   | `string` | contents of the note (max 256 chars) |

Example Body

```json
{
  "note": {
    "userId": "user-0000",
    "title": "Read list",
    "body": "Do Androids Dream of Electric Sheep?"
  }
}
```

### Responses

| code | description |
| ---- | ----------- |
| 200  | success     |

```json
{
  "noteId": "903f240400d98b6839b5ccd9172e6cb5"
}
```

| code | description                           |
| ---- | ------------------------------------- |
| 400  | note not created, check error message |

```json
{
  "message": "error message here"
}
```

---

## GET /notes

Get all notes

### Parameters

No parameters

### Responses

| code | description |
| ---- | ----------- |
| 200  | success     |

```json
{
  "notes": [
    {
      "noteId": "903f240400d98b6839b5ccd9172e6cb5",
      "userId": "user-0000",
      "title": "Read list",
      "body": "Do Androids Dream of Electric Sheep?"
    }
    ...
  ]
}
```

---

## GET /notes/:id

Retrieve a specific note by ID.

### Parameters

#### Path

| field | type     | description        |
| ----- | -------- | ------------------ |
| id    | `string` | path url parameter |

### Responses

| code | description |
| ---- | ----------- |
| 200  | success     |

```json
{
  "noteId": "903f240400d98b6839b5ccd9172e6cb5",
  "userId": "user-0000",
  "title": "Read list",
  "body": "Do Androids Dream of Electric Sheep?"
}
```

| code | description    |
| ---- | -------------- |
| 400  | id is invalid  |
| 404  | note not found |

---

## PUT /notes/:id

Update a note

### Parameters

#### Path

| path | type     | description    |
| ---- | -------- | -------------- |
| id   | `string` | note unique id |

#### Body

Parameter content type: `application/json`

| field       | type     | description                          |
| ----------- | -------- | ------------------------------------ |
| note        | `json`   | body parameter                       |
| note.userId | `string` | users unique id (max 256 chars)      |
| note.title  | `string` | title of the note (max 256 chars)    |
| note.body   | `string` | contents of the note (max 256 chars) |

Example Body

```json
{
  "note": {
    "userId": "user-0000",
    "title": "Read list",
    "body": "Do Androids Dream of Electric Sheep?"
  }
}
```

### Responses

| code | description |
| ---- | ----------- |
| 200  | success     |

```json
{
  "noteId": "903f240400d98b6839b5ccd9172e6cb5",
  "userId": "user-0000",
  "title": "Read list",
  "body": "Do Androids Dream of Electric Sheep?"
}
```

| code | description                           |
| ---- | ------------------------------------- |
| 400  | note not created, check error message |

```json
{
  "message": "error message here"
}
```

---

## DELETE /notes/:id

Delete a specific note by ID.

### Parameters

#### Path

| field | type     | description        |
| ----- | -------- | ------------------ |
| id    | `string` | path url parameter |

### Responses

| code | description              |
| ---- | ------------------------ |
| 200  | success, note is deleted |
| 400  | id is invalid            |
| 404  | note not found           |
