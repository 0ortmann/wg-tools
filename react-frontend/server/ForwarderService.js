var request = require('superagent');


module.exports = function(endpoint) {
	return function(req, res, next) {
		console.log('Forwarding request', req.params, req.body, req.headers);
		request(req.method, endpoint + req.params.path)
			.set(req.headers)
			.send(req.body)
			.end( function(err, resBackend) {
				if(err) {
					console.log('Error forwarding request', endpoint, err);
					if(err.status > 100 && err.status < 999) {
						res.status(err.status).send(err);
					}
					else {
						res.status(500).send('Undefined status code returned from Backend');
					}
				}
				else {
					res.send(resBackend);
				}
			});
	}
}