function ViewModel() {
    this.user = ko.observable("")
    this.password = ko.observable("")
    this.confirmPassword = ko.observable("")
    this.timeOut = ko.observable("")
    this.timeIn = ko.observable("")
    this.address = ko.observable("")
    this.seats = ko.observable("")
    this.carPlate = ko.observable("")
    //var nextHTML ="../../partials/welcome.html";
    var nextHTML ="#/me";
    this.login = function(){
    request("POST", "login",{username: this.user(), password: this.password()}, function(data, err){
        if (data) {
            var token = data.token
            window.localStorage.setItem('Authorization', token);
            window.location = nextHTML
        }else{
            alert("username o password incorrecto")
        }
    })
    }
    this.register = function(){
    	var dataP = {
    		username: this.user(), 
    		password: this.password(), 
    		confirmate_password: this.confirmPassword(),
    		time_out: this.timeOut(),
    		time_in: this.timeIn(),
    		address: this.address,
    		seats_car: this.seats(),
    		car_plate: this.carPlate()
    	};
        request("POST", "users",dataP, function(data, err){
        if (data) {
            alert("Usuario Creado");
            request("POST", "login",{username: data.username, password: data.password}, function(data, err){
                if (data) {
                    var token = data.token
                    window.localStorage.setItem('Authorization', token);
                    window.location = nextHTML
                }else{
                    alert("username o password incorrecto")
                }
            })
        }else{
            alert("username debe ser unico")
        }
    })
    }
    
};
ko.applyBindings(new ViewModel());