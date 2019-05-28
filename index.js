const exec = require("child_process").exec
const getFreeMem = require("./getFreeMem")
const getSwap = require("./getSwap")

getFreeMem()
.then(free => {
	return getSwap().then(swap => {
		console.log(`swap using ${swap}, free mem is ${free}`)
		const atLeastTwiceEnoughSpace = free >= swap * 2;
		console.log("at least twice enough space?  " + atLeastTwiceEnoughSpace);
		if (atLeastTwiceEnoughSpace) {
			exec("sudo swapoff -a && sudo swapon -a")
		}
	})
}).catch(err => {
	console.log(err)
})
