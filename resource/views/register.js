<div>
  <h1>Register</h1>
  <form action="/register" method="POST" enctype="multipart/part-data">
    <input type="text" name="name" placeholder="Name" required />
    <br></br>
    <input type="email" name="email" placeholder="Email" required />
    <br></br>
    <input type="password" name="password" placeholder="Password" required />
    <br></br>
    <input type="file" name="image" required />
    <br></br>
    <button type="submit">Register</button>
  </form>
  {typeof message !== 'undefined' && (
    <p style={{ color: 'green' }}>{message}</p>
  )}
  
</div>

