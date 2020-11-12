/**
 * @constant config
 * @description here i'll put any recurrently changing paramater of the template
 */
const config = {
	title: "Striveazon`s ShopFloor", ///that as of now means only the title but i belive this object will grow soon
	APIurl: "https://striveschool-api.herokuapp.com/api/product/",
}

/**
 * initialize the page
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
			document.querySelector("#name").innerText = data.name
			document.querySelector("#description").innerText = data.description
			document.querySelector("#brand").innerText = data.brand
			document.querySelector(".card-img-top").src = data.imageUrl
			document.querySelector("#price").innerText = data.price
			document.querySelector(".loading").classList.toggle("d-none")
			document.querySelector(".article").classList.toggle("d-none")
		} catch (error) {
			console.log(error)
		}
	} else {
		document.querySelector(".loading").classList.toggle("d-none")
		document.querySelector("#error").classList.toggle("d-none")
		document.querySelector("#error h1").classList.toggle("d-none")
	}
}
