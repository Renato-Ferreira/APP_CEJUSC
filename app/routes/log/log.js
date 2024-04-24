function logger(...args){
    const fsl = require('fs');
	const { join } = require('path');
	
	let ts = Date.now();
	let date_ob = new Date(ts);
	let dataLog = `${date_ob.getDate()}-${(date_ob.getMonth() + 1)}-${date_ob.getFullYear()}.log`;
    arqPath = join(process.cwd(), '/routes/log', dataLog);
    
	let date = new Date( Date.now() ).toString();
	let dateLog = '-------------------------------------------------------------------------\n' + date + '\n';
	fsl.writeFile(arqPath, dateLog, {'flag':'a'}, (err) => {
			if (err) throw err;
		});
	
	args.forEach( (arg) => {
		data = arg + '\n';
				
		fsl.writeFile(arqPath, data, {'flag':'a'}, (err) => {
			if (err) throw err;
		});
	});
};
module.exports = logger;