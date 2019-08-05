let html: string = `
<i class="logo"></i>
<h2>Essential Links</h2>
<p>
    <a href="https://webpack.js.org/" target="_blank">Webpack</a>
    <a href="http://expressjs.com/" target="_blank">Express</a>
</p>
<h2>Learn More</h2>
<a href="about">About</a>
<form action="api/login" method="post">
  <label>username: </label>
  <input type="text" name="username"/>
  <label>password: </label>
  <input type="password" name="password"/>
  <button>submit</button>
</form>
`;

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("app");
  el!.innerHTML = html;
});
