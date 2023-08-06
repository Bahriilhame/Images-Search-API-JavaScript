const accessKey = 'z4nppaDs6jKjzSJPBmQ2kVqaVR-k5DyQmPa7xmZdzN0'
const formEl = document.querySelector('form')
const inputEl = document.querySelector('#search-input')
const searchResults = document.querySelector('.search-results')
const showMore = document.querySelector('.show-more-button')

let inputData = ''
let page = 1

async function searchImages() {
  inputData = inputEl.value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

  const response = await fetch(url)
  const data = await response.json()

  const results = data.results

  console.log(results)
  if (page === 1) {
    searchResults.innerHTML = ''
  }
  results.map((result) => {
    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('search-result')

    const image = document.createElement('img')
    image.src = result.urls.small
    image.alt = result.alt_description

    const aWrapper = document.createElement('a')
    aWrapper.href = result.links.html
    aWrapper.target = '_blank'

    const imageLink = document.createElement('a')
    imageLink.href = result.links.html
    imageLink.target = '_blank'
    imageLink.textContent = result.alt_description
    imageLink.classList.add('linkImage')

    aWrapper.appendChild(image)
    imageWrapper.appendChild(aWrapper)
    imageWrapper.appendChild(imageLink)
    searchResults.appendChild(imageWrapper)
    console.log(searchResults)
  })
  page++
  if (page > 1) {
    showMore.style.display = 'block'
  }
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault()
  page = 1
  searchImages()
})

showMore.addEventListener('click', () => {
  searchImages()
})
