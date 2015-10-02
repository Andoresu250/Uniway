var BASE_URL = "http://192.168.56.101:3000/"
var request = function(method, url, data, callback) {
	$.ajax({ 
        url: BASE_URL + url,
		method: method,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
            callback(data, null)
		},
		error: function(error) {
			callback(null, error)
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8') 
            xhr.setRequestHeader('Authorization',window.localStorage.Authorization)
			xhr.withCredentials = true			
		}
		
	})
}