/**
 * @constant config
 * @description here i'll put any recurrently changing paramater of the template
 */
const config = {
	title: "Striveazon`s ShopFloor", ///that as of now means only the title but i belive this object will grow soon
	APIurl: "https://striveschool-api.herokuapp.com/api/product/",
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
 * prints articles according to a template
 * @param {Array} articles
 */

const printArticles = (articles) => {
	const row = document.querySelector("#floor")
	template = row.querySelector(".card.template")
	articles.forEach((article) => {
		let card = template.cloneNode(true)
		card.classList.remove("template")
		card.querySelector(".card-img-top").src = article.imageUrl
		card.querySelector(".name").innerText = article.name
		card.querySelector(".description").innerText = article.description
		card.querySelector(".details").href = `detail.html?id=${article._id}`
		card.querySelector(".price").innerText = article.price
		row.appendChild(card)
	})
	document.querySelector(".loading").classList.toggle("d-none")
	document.querySelector(".articles").classList.toggle("d-none")
}

/**
 * initialize the page
 *
 */
window.onload = async () => {
	document.title = config.title
	articles = await getData()
	console.log("articles", articles)
	printArticles(articles)
	document.querySelector("#mainMenu").innerHTML = config.title

	getData()
}
