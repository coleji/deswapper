const getFreeMem = require("./getFreeMem")
const getSwap = require("./getSwap")

getFreeMem()
.then(free => {
	return getSwap().then(swap => {
		console.log(`swap using ${swap}, free mem is ${free}`)
	})
}).catch(err => {
	console.log(err)
})
