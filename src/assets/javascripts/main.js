// import stylesheets
import "../stylesheets/application.less";

document.getElementById("app").innerHTML =
`
<i class="logo"></i>
<h2>Essential Links</h2>
<p>
    <a href="https://webpack.js.org/" target="_blank">Webpack</a>
    <a href="http://expressjs.com/" target="_blank">Express</a>
</p>
<h2>Learn More</h2>
<a href="${__publicPath === '/' ? '' : __publicPath }/about">About</a>
`
