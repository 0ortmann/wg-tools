import request from 'superagent';
import Constants from '../constants/LoginConstants.jsx';

import { getTokenFromBrowser } from './LoginService.jsx';

const endpoint = '/api/';


let ApiService = {

	call(method, path, payload, onSuccess, onError) {
		request(method, endpoint + path)
			.send(payload)
			.set('Content-Type', 'application/json; charset=UTF-8')
			.set('Authorization', 'JWT ' + getTokenFromBrowser())
			.set('Access-Control-Allow-Origin', '*')
			.end(function(err, res) {
				if(err) {
					onError(err);
				}
				else {
					onSuccess(res.text);
				}
		});
	},

	callUnauthed(method, path, payload, onSuccess, onError) {
		request(method, endpoint + path)
			.send(payload)
			.set('Content-Type', 'application/json; charset=UTF-8')
			.set('Access-Control-Allow-Origin', '*')
			.end(function(err, res) {
				if(err) {
					onError(err);
				}
				else {
					onSuccess(res.text);
				}
		});
	},

	login(payload, onSuccess, onError) {
		request.post(endpoint + 'auth')
			.send(payload)
			.set('Accept', 'application/jwt')
			.end(function(err, res) {
				if(err) {
					onError(err);
				}
				else {
					onSuccess(res.text);
				}
		});
	}
}

module.exports = ApiService;
