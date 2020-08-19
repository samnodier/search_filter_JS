// Grab some DOM elements

const container = document.querySelector('.container');
const form = document.querySelector('form');
const input = document.querySelector('input');

// Fetch the data using either the API or the XMLHttpRequest() constructor.
// This is the XHR version
let url = 'items.json';
let request = new XMLHttpRequest();
request.open('GET', url, true);
request.responseType = 'json';
request.send();

request.onload = function() {
	if(request.status === 200) {
		const itemsJSON = request.response;
		showData(itemsJSON);
	}
};


// This is the fetch() API version

// fetch(url).then((response) => {
// 	return response.json();
// }).then((json) => {
// 	let itemsJSON = json;
// 	showData(itemsJSON);
// }).catch((err) => {
// 	console.log("Problem fetching " + url);
// 	console.log(err.message);
// });


function showData(jsonObj) {
	// Create some DOM contents
	const initialListContainer = document.createElement('ul');

	const itemsList = jsonObj;

	itemsList.forEach((item) => {
		const initialListItem = document.createElement('li');
		initialListItem.setAttribute('id', `${item.id}`);
		initialListItem.textContent = item.content;
		initialListContainer.appendChild(initialListItem);
	});

	container.appendChild(initialListContainer);

	// Prevent the default reload functionality when you press enter
	form.onsubmit = (e) => {
		e.preventDefault();
	}


	// Add an event Listener to listen for the keystrokes in the input form
	form.addEventListener('input', () => {
		initialListContainer.parentNode.removeChild(initialListContainer);
		while (initialListContainer.firstChild) {
			initialListContainer.removeChild(initialListContainer.firstChild);
		}

		let listItems = jsonObj;
		listItems.forEach((each) => {
			if(each.content.includes(input.value)){
				const listItem = document.createElement('li');
				listItem.setAttribute('id', `${each.id}`);
				listItem.textContent = each.content;
				initialListContainer.appendChild(listItem);
			}
		});
		container.appendChild(initialListContainer);
	});
}
