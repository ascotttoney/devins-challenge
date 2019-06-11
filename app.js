// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


document.addEventListener('DOMContentLoaded', () => {

  const usersURL = `http://localhost:3000/users`
  const container = document.getElementById('container')
  const form = document.getElementById('new-user-form')
  let greetingAndForm = document.getElementById('greeting-and-form')

  form.addEventListener('submit', addUser)

  function addUser(e) {
    e.preventDefault()

    // console.log('first name', e.target.first_name.value)
    // console.log('last name', e.target.last_name.value)
    // console.log('favorite band', e.target.favorite.value)

    let newUser = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      favorite: e.target.favorite.value
    }

    fetch(usersURL, {
      method: 'POST', 
        body: JSON.stringify(newUser), 
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'json/application'
        }
    })
    .then(res => res.json())
    .then(res => displayUser(res))
  }

  function displayUser(user) {
    let now = new Date()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let currentTime = `${hour}${minute}`

    let time
    if (currentTime <= 1159) time = 'morning'
    else if (currentTime >= 1200 && currentTime > 1700) time = 'afternoon'
    else time = 'evening'

    greetingAndForm.innerHTML = ''

    greetingAndForm.innerHTML =
      `<div id='new-user-greeting'>
      
      <span class='line-1'>
        Good ${time}, Mr. ${user.last_name}!
      </span>
        <br>
      <span class='line-2'>
         The time is now ${hour}:${minute}
      </span>
      
      <p class='line-3'>
        Put on some ${user.favorite} and have a great day.
      </p>

    </div>`
  }

})