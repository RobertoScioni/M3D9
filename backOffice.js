/**
 * @constant config
 * @description here i'll put any recurrently changing paramater of the template
 */
const config = {
	title: "Striveazon`s back office", ///that as of now means only the title but i belive this object will grow soon
	APIurl: "https://striveschool-api.herokuapp.com/api/product/",
}

/**
 * sends data to server
 *
 * @param {Array} pkg the object to send
 */

const sendData = async (pkg) => {
	try {
		let response = await fetch(config.APIurl, {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRlYzRiY2RlMTAwMTc2MTZhODQiLCJpYXQiOjE2MDUwOTI1ODgsImV4cCI6MTYwNjMwMjE4OH0.TBBgF9c-VvkpVrRJ6t3JQEqG8a_ukoK_oh9hwKFlsFQ",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(pkg),
		})
		if (response.ok) {
			console.log("data successfully posted")
		} else {
			console.log("oopsie")
		}
	} catch (error) {
		console.log(error)
	}
}

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
	sendData(pkg)
}

/**
 * initialize the page
 *
 */
window.onload = () => {
	document.title = config.title

	document.querySelector("#mainMenu").innerHTML = config.title
}
