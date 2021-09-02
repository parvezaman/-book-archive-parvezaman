const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const showResult = document.getElementById('show-result');
const showLenght = document.getElementById('show-length');
const showWarning = document.getElementById('show-warning');

searchButton.addEventListener('click', ()=>{
    const searchedText = searchInput.value;
    showLenght.style.display = 'block';
    showLenght.textContent ='';
    showResult.textContent = '';

    if(searchedText.length === 0){
        showWarning.style.display = 'block';
        showWarning.innerText = 'You have to enter some text';
        showLenght.innerText='Not result found';
    }

    else{
        showWarning.style.display = 'none';
        console.log(searchedText);
        const url = `http://openlibrary.org/search.json?q=${searchedText}`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            showSearchedResult(data.docs)
            console.log(data.docs);
            if(data.docs.length === 0){
                showWarning.style.display = 'block';
                showWarning.innerText = 'Please search for some real book';
            }
            showLenght.innerHTML=`
            <p>${data.docs.length} results are showing out of ${data.numFound}</p>
            `;
        })

        searchInput.value = '';
    }
})

const showSearchedResult = (docs) =>{

    showResult.textContent = '';
    // console.log(docs);
    docs.forEach(book => {
        const div = document.createElement('div');

        div.innerHTML =`
          <div class="card-body">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i:''}-M.jpg" class="card-img-top searched-image" alt=" ">
            <div class="searched-text-content">
                <h4 class="card-title">Book Title: <span id="quered-info"> ${book.title ? book.title: 'Not provided'} </span></h4>
                <h5 class="card-title">Author(s): <span id="quered-info"> ${book.author_name ? book.author_name:'Not Given in the database'} </span></h5>
                <h5 class="card-title">First Published: <span id="quered-info"> ${book.first_publish_year ? book.first_publish_year: 'First publishing date is not Provided'} </span></h5>
            </div>
            
          </div>
        `;
        div.classList.add('card');
        showResult.appendChild(div);
    });

    

}