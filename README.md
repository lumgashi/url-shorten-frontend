<body>
  <h1>URL Shortener Client</h1>

  <p>This is a frontend application built with <strong>React</strong> for the URL Shortener project/assignment It allows users to shorten URLs, view details of existing shortened URLs, delete them, and see a list of all URLs.</p>

  <h2>Features</h2>
  <ul>
    <li>Create shortened URLs with an expiration time.</li>
    <li>View details of a specific shortened URL.</li>
    <li>Delete a shortened URL.</li>
    <li>View a list of all shortened URLs.</li>
  </ul>

  <h2>Setup</h2>
  <ol>
    <li>
      Clone the repository:
      <pre><code>git clone https://github.com/lumgashi/url-shorten-frontend.git</code></pre>
    </li>
    <li>
      Navigate to the project directory:
      <pre><code>cd url-shorten-frontend</code></pre>
    </li>
    <li>
      Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>
      Start the application:
      <b>NOTE: make sure to start the backend first!
      <pre><code>npm run dev</code></pre>
    </li>
  </ol>

  <h2>Technologies Used</h2>
  <ul>
    <li><strong>React:</strong> JavaScript library for building user interfaces.</li>
    <li><strong>react-router-dom:</strong> To create paths for the application.</li>
    <li><strong>CSS:</strong> Styling for the application.</li>
  </ul>

  <h2>Available Pages</h2>
  <ul>
    <li>
      <strong>Home:</strong> A form to input the original URL and TTL to create a shortened URL.
    </li>
    <li>
      <strong>All URLs:</strong> Lists all existing shortened URLs created by the user.
    </li>
        <li>
      <strong>Shortened URL:</strong> <code>www.localhost:5173/short-url/:urlID</code>
      <p><strong>Description:</strong> When visited, checks if the link is expired and informs the user. If the link is still valid, it redirects the user to the original URL.</p>
    </li>
  </ul>

  <h2>API Integration</h2>
  <p>This application communicates with the backend API to perform CRUD operations. Ensure the backend server is running before using the client application.</p>
</body>
</html>
