const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38274968-dd4a67cba6734c16ac71217cd';

function fetchPixabay(searchText, currentPage) {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
export default fetchPixabay;

// function fetchPixabay(searchText, currentPage) {
//   return fetch(
//     `${BASE_URL}?q=${searchText}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
// }
// export default fetchPixabay;

// export class fetchPixabay {
//   currentPage = 1;

//   static fetchImages = (searchText, currentButton) => {
//     if (currentButton === 'FORM') {
//       this.currentPage = 1;
//     }

//     return fetch(
//       `${BASE_URL}?q=${searchText}&page=${this.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     ).then(resp => {
//       this.currentPage += 1;
//       return resp;
//     });
//   };
// }
