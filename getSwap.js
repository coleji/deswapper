const exec = require("child_process").exec

module.exports = () => new Promise(function(resolve, reject) {
	exec("free | grep Swap", function(error, stdout, stderr) {
		var regex = /Swap:\s*(\d+)\s+(\d+)\s+(\d+)/
		var result = regex.exec(stdout.trim())
		if (result) resolve(Number(result[2]))
		else reject()
	})
});
