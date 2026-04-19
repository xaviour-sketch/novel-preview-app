// Importing API from the .env
const api_key = import.meta.env.VITE_api_key

// This is the base url for the google books API
const base_url = "https://www.googleapis.com/books/v1/volumes";

// fetching process
async function searchBooks(query) {
    const response = await fetch(`${base_url}?q=${encodeURIComponent(query)}&key=${api_key}`);;
    const data = await response.json(); // It converts response to json

    console.log(data);
    return data.items
}

//
async function handleSearch() {
    const query = document.getElementById("searchInput").value;
    const books = await searchBooks(query);
    displayBooks(books);
}

// Enables the DOM features
function displayBooks(books) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";// clears previous search results

  if (!books||books.length === 0) {
    resultsDiv.innerHTML = "No results found.";
    return;
  }

    books.forEach(book => {
        const info = book.volumeInfo;

        console.log(info);

        // Enables access to the relevant information
        const title = info.title;
        const authors = info.authors;
        const description = info.description;
        const thumbnail = info.imageLinks?.thumbnail;

        // create the necessary containers
    const bookDiv = document.createElement("div");
    bookDiv.className = "bg-slate-800 p-4 rounded-lg shadow-md flex gap-4 mb-4 hover:scale-105 transition"

    const titleEl = document.createElement("h3");
    titleEl.textContent = title || "No Title";

    const authorsEl = document.createElement("p");
    authorsEl.textContent = authors ? `By: ${authors.join(", ")}` : "Unknown Authors";

    const descriptionEl = document.createElement("p");
    descriptionEl.textContent = description || "No Description Available";

    const previewLink = info.previewLink;

    const img= document.createElement("img");
    img.className = "w-24 h-32 object-cover rounded";

    const textDiv = document.createElement("div");
    textDiv.className = "flex flex-col"
    
    if (thumbnail) {
        img.src = thumbnail;
        img.alt = title || "No Title";

        if (previewLink) {
            img.style.cursor = "pointer"
            img.onclick = () => {
                window.open(previewLink, "_blank")
            }
        }
    }

    // Append all the elements
    bookDiv.appendChild(titleEl);
    bookDiv.appendChild(authorsEl);
    bookDiv.appendChild(descriptionEl);
    bookDiv.appendChild(img);
    resultsDiv.appendChild(bookDiv);
    bookDiv.appendChild(textDiv);

})
}

//expose functions
window.searchBooks = searchBooks
window.handleSearch = handleSearch
window.displayBooks = displayBooks

// event listener for the search button
document.getElementById("searchBtn").addEventListener("click", handleSearch);
