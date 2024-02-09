fetch("./cryptoData.json")
  .then((res) => {
    //https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
    // Check if the network response is successful
    if (!res.ok) {
      console.error("Network response was not ok");
      return;
    }
    return res.json();
  })
  .then((data) => {
    
  });