# Blog-API-with-express
This is an api for a blog

1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. when a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs. 
  i.The endpoint should be paginated
  ii.It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
  i.default it to 20 blogs per page. 
  ii.It should also be searchable by author, title and tags.
  iii.It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.
17. Write tests for all endpoints
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---
## Base URL
- https://fair-gold-salamander-cuff.cyclic.app 


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  firstname | string  |  required|
|  lastname  |  string |  required |
|  email     | string  |  required,unique|
|  password |   string |  


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  timestamp|  date | 
|  title| number  |  required,unique|
|  description  |  number |  required  |
|  body    | array  |  required |
|  read_count |   number |  default:0  |
|  reading_time |  number |  required |
|  author | string | 
|  state |  string |  required, enum: ['draft','published'],default:draft |
|  tags | [string] |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```
---
### get posts

- Route: /blog
- Method: GET
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - order_by (read_count | reading_time | timsestamp)
    - order (options: asc | desc, default: desc)
    -search_by (author | title | tags)
   
- Responses

Success
```
{
   data": [
    {
      "_id": "63684f599c52563a8f04b486",
      "title": "when the days go by",
      "body": "hellooo story of my life adeku it wehnt ouuu",
      "tags": [
        "entertainment",
        "latest"
      ],
      "author": "ali adeku",
      "owner_id": "63684f2b9c52563a8f04b481",
      "state": "published",
      "read_count": 0,
      "reading_time": 4.5,
      "created_at": "2022-11-07T00:18:05.834Z",
      "updated_at": "2022-11-07T00:23:15.489Z",
}
