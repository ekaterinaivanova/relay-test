export default ({ body, title }) => {
    return `
      <!DOCTYPE html>
      <html lang="en" data-framework="relay">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
  </head>
  <body>
    <div id="root">${body}</div>
    <script src="src/app.js"></script>
  </body>
</html>
    `;
  };