# 3.2.0 - Review concepts

---

## EJS

- What's the difference between these two?

```js
// render it ar what it is (include the <>)
<%- myVar %>
// Print out just text 
<%= myVar %>




```

_...Why do we have two options?_

---

What is this for?

```js
<%- include('<PATH_TO_EJS_FILE', {}) %>

```

_...What makes this so powerful?_

---

What notation do we use to run JS snippets inside of an `.ejs` file?

`const array = ['one', 'two', 'three']`

```js
// Example

<%# use the tags at the first line and the last line to call js
// use the tahs
<ul>
   <% array.forEach(element => { %>
        <li><%= element %></li>
    
   <% }); %>
</ul>
```

---

## Express

- What express _routing method_ did we use yesterday?
- What are its parameters?
- What is the minimum amount of code to set up an express server?

```js
// Example

we use .get
parameter (req,res)
app.get(path, function(req,res){})

//Start server

const express = require('express');
const app = express();

app.get('/hello', function(req,res){
    response.send('hello');
});

app.listen(8000), console.log('Servers is up');

```

---