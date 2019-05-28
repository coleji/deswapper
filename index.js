var moment = require('moment')
const exec = require("child_process").exec
const getFreeMem = require("./getFreeMem")
const getSwap = require("./getSwap")


const now = moment().format("YYYY-MM-DD HH:mm:ss")
console.log("==================")
console.log(now)
console.log("starting deswapper")
getFreeMem()
.then(free => {
	return getSwap().then(swap => new Promise((resolve, reject) => {
		console.log(`swap using ${swap}, free mem is ${free}`)
		if (swap == 0) {
			resolve("Nothing to deswap")
			return;
		}
		const enoughSpaceForDeswap = (free >= (swap * 2) + 100000);
		if (enoughSpaceForDeswap) {
			exec("sudo swapoff -a && sudo swapon -a", (err, stdout, stderr) => {
				if (err) reject(err)
				else resolve("Successfully deswapped")
			})
		} else reject("Not enough free for deswap")
	}))
}).then(
	success => {
		console.log("Successful run: " + success)
	},
	err => {
		console.log("Deswap error!   " + err)
	}
)
