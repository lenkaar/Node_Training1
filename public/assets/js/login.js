function submit() {
	let name = document.getElementById("name").value;
	let password = document.getElementById("pw").value;
	console.log(name);
	console.log(password);
	$.post( "/login", {
		uname: name,
		password: password,
	}, function (data) {
		alert("DATA : " + JSON.stringify(data) );
		console.log(data);
		if(data === 'OK') {
			window.location = '/index';
		}
		else{
			console.log('Error Reloading');

		}

	})

	.fail(function (xhr) {
		switch (xhr.status) {
			case 500:
				alert('data is undefined');
				break;

			case 501:
				alert('validation err!');
				break;

			default:
				alert('Default Error!');
				break;
		}
	});
	
}
