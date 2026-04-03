var http = require('http');

http.createServer((req,resp)=>{
		
	resp.writeHead(200, { 'Content-Type': 'text/html' });
	resp.write(JSON.stringify({name:"raj",age:31,mobile:"1234567891 bjhuhijijij devika kollur"}));
	resp.end();
	
}).listen(5000);