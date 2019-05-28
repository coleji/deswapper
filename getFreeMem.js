const exec = require("child_process").exec

// xenial onward
//               total        used        free      shared  buff/cache   available
// Mem:       32936380     4285372    24308184      170984     4342824    28025840
// Swap:      17998844           0    17998844
const newStyle = lines => {
	var regex = /Mem:\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/
	var result = regex.exec(lines[1])
	return result[3];  // return free rather than available
}

// trusty
//              total       used       free     shared    buffers     cached
// Mem:       1525056    1326368     198688        216     137252     801456
// -/+ buffers/cache:     387660    1137396
// Swap:      5850620       3348    5847272
const oldStyle = lines => {
	var regex = /buffers\/cache:\s+(\d+)\s+(\d+)/
	var result = regex.exec(lines[1])
	return result[2];
}

module.exports = () => new Promise(function(resolve, reject) {
	exec("free", function(error, stdout, stderr) {
		var trimmed = stdout.trim();
		var lines = trimmed.split('\n')
		console.log(lines)
		var freeMem = (
			(lines.length == 3)
			? newStyle(lines)
			: oldStyle(lines)
		)
		if (!freeMem) reject()
		else resolve(Number(freeMem))
	})
});
