/**
 * @constant config
 * @description here i'll put any recurrently changing paramater of the template
 */
const config = {
	title: "Striveazon`s back office", ///that as of now means only the title but i belive this object will grow soon
	APIurl: "https://striveschool-api.herokuapp.com/api/product/",
	ApiKey: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRlYzRiY2RlMTAwMTc2MTZhODQiLCJpYXQiOjE2MDUwOTI1ODgsImV4cCI6MTYwNjMwMjE4OH0.TBBgF9c-VvkpVrRJ6t3JQEqG8a_ukoK_oh9hwKFlsFQ",
		"Content-Type": "application/json",
	},
}
/**
 * @type {Array}
 * @var articles this is our item catalog
 */
let articles

/**
 * @type {String}
 * @var action this controls if we send new items or updates
 */
let action = "POST"

/**
 * sends data to server
 *
 * @param {Array} pkg the object to send
 */

const sendData = async (pkg) => {
	try {
		let url = config.APIurl.concat(id ? id : "")
		console.log(url)
		let response = await fetch(url, {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRlYzRiY2RlMTAwMTc2MTZhODQiLCJpYXQiOjE2MDUwOTI1ODgsImV4cCI6MTYwNjMwMjE4OH0.TBBgF9c-VvkpVrRJ6t3JQEqG8a_ukoK_oh9hwKFlsFQ",
				"Content-Type": "application/json",
			},
			method: action,
			body: JSON.stringify(pkg),
		})
		if (response.ok) {
			console.log(`data successfully ${action === "POST" ? "post" : "putt"}ed`)
			alert(`data successfully ${action === "POST" ? "post" : "putt"}ed`)
			articles = await getData()
			printArticles(articles)
		} else {
			console.log("oopsie")
		}
	} catch (error) {
		console.log(error)
	}
}
/**
 * prepares the data for the fetch
 * @param {Event} event the triggering event is the #submit button
 */
const sender = (event) => {
	event.preventDefault()
	const form = event.target
	let pkg = {
		name: form.querySelector("#name").value,
		description: form.querySelector("#description").value,
		brand: form.querySelector("#brand").value,
		imageUrl: form.querySelector("#imageUrl").value,
		price: form.querySelector("#price").value,
	}
	console.log(pkg)
	let hasElements = false
	for (const key in pkg) {
		hasElements = pkg.hasOwnProperty(key) ? true : false
		if (hasElements && pkg[key] !== "") {
			break
		}
		hasElements = false
	}
	console.log("hasElements", hasElements)
	if (hasElements) {
		sendData(pkg)
	} else {
		alert("at least one field should still be filled")
	}
}

/**
 * gets remote data
 */
const getData = async () => {
	try {
		let data = await fetch(config.APIurl, {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRlYzRiY2RlMTAwMTc2MTZhODQiLCJpYXQiOjE2MDUwOTI1ODgsImV4cCI6MTYwNjMwMjE4OH0.TBBgF9c-VvkpVrRJ6t3JQEqG8a_ukoK_oh9hwKFlsFQ",
			},
			method: "GET",
		})
		let products = await data.json()
		//console.log(products)
		return products
	} catch (error) {
		console.log(error)
	}
}

/**
 * this toggles an item from a compact view to an extende one and viceversa
 * @param {Event} event the triggering event is the click on the name of the product
 */
const toggleArticleBody = (event) => {
	const card = event.target.closest(".card")
	//console.log(card)
	const top = card.offsetTop
	const left = card.offsetLeft
	console.log("top", top, "left", left)
	card.querySelector(".compact-me").classList.toggle("d-none")
	card.classList.toggle("expanded")
	card.classList.toggle("mx-2")
	if (card.classList.contains("expanded")) {
		const spacer = document.querySelector(".card.template").cloneNode(true)
		spacer.classList.remove("template")
		spacer.classList.add("spacer")
		card.parentElement.insertBefore(spacer, card)
		card.style.top = top
		card.style.left = left + "px"
	} else {
		card.previousElementSibling.remove()
		card.style.top = "auto"
		card.style.left = "auto"
	}
}

/**
 * @function printArticles
 * prints articles according to a template
 * @param {Array} articles
 */

const printArticles = (articles) => {
	const target = document.querySelector("#articles")
	target.innerHTML = ""
	template = document.querySelector(".card.template")
	articles.forEach((article) => {
		console.log(article)
		let card = template.cloneNode(true)
		card.classList.remove("template")
		card._id = article._id
		card.querySelector(".card-img-top").src = article.imageUrl
		card.querySelector(".name").innerText = article.name
		card.querySelector(".name").addEventListener("click", toggleArticleBody)
		card.querySelector(".description").innerText = article.description
		card.querySelector(".edit").href = "?id=" + article._id
		card.querySelector(".price").innerText = article.price
		target.appendChild(card)
	})
}
/**
 * deletes an element from the backend
 * @param {*} event
 */
const deleteArticle = async (event) => {
	const card = event.target.closest(".card")
	try {
		let data = await fetch(config.APIurl + card._id, {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRlYzRiY2RlMTAwMTc2MTZhODQiLCJpYXQiOjE2MDUwOTI1ODgsImV4cCI6MTYwNjMwMjE4OH0.TBBgF9c-VvkpVrRJ6t3JQEqG8a_ukoK_oh9hwKFlsFQ",
			},
			method: "DELETE",
		})
		articles = await getData()
		alert("element deleted")
		printArticles(articles)
	} catch (error) {
		console.log(error)
	}
}

/**
 * updates an element on the backend
 * @param {*} event
 */
const edit = (event) => {
	const card = event.target.closest(".card")
	console.log("id to modify", card._id)
}

/**
 * @var {String} id this contains the id parameter passed to the page in a search query, it's initialized false because we do a lot of truthy/falsy evaluation on it
 */
let id = false
/**
 * initialize the page
 *
 */
window.onload = async () => {
	document.title = config.title
	id = new URLSearchParams(window.location.search).get("id")
	if (id) {
		try {
			let response = await fetch(config.APIurl + id, {
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRlYzRiY2RlMTAwMTc2MTZhODQiLCJpYXQiOjE2MDUwOTI1ODgsImV4cCI6MTYwNjMwMjE4OH0.TBBgF9c-VvkpVrRJ6t3JQEqG8a_ukoK_oh9hwKFlsFQ",
				},
				method: "GET",
			})
			let data = await response.json()
			document.querySelector("#name").value = data.name
			document.querySelector("#description").value = data.description
			document.querySelector("#brand").value = data.brand
			document.querySelector("#imageUrl").value = data.imageUrl
			document.querySelector("#price").value = data.price
			document.querySelector("#submit").innerText = "UPDATE"
			document.querySelector("#name").required = false
			document.querySelector("#description").required = false
			document.querySelector("#brand").required = false
			document.querySelector("#imageUrl").required = false
			document.querySelector("#price").required = false
			action = "PUT"
		} catch (error) {
			console.log(error)
		}
	}
	articles = await getData()
	printArticles(articles)
	document.querySelector("#mainMenu").innerHTML = config.title
}
