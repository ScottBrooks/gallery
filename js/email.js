

// contact form validation // sends data to sendmail.php for email processing

function validate(){
	
	var email = $('#email').val();
	
	if ($('#name').val() == ''){
		$('#name' + '-error').text(' Required ');
		$('#name').focus();
		return false;
	} else if (email == ''){
		$('#email' + '-error').text(' Required ');
		$('#email').focus();
		return false;
	} else if (email.indexOf('@') < 1 || email.lastIndexOf('.') < email.indexOf('@') + 2 || email.lastIndexOf('.') + 2 >= email.length){
		$('#email' + '-error').text(' Invalid ');
		$('#email').focus();
		return false;
	} else if ($('#comments').val() == ''){
		$('#comments' + '-error').text(' Required ');
		$('#comments').focus();
		return false;
	} else {
		$('#send-btn').text('Validating...');
		sendmail();
	}
}

function reset(field){
	$('#' + field + '-error').text('');
}

function sendmail(){
	
	var name = 			$('#name').val();
	var email = 		$('#email').val();
	var comments = 		$('#comments').val();
	
	$.ajax({
		type:'POST',
		url: 'sendmail.php',
		data: {
			name: name,
			email: email,
			comments: comments
		}
	}).success(function(html){
		//alert('eMail Sent');
		
		$('#email-form').fadeOut(function(){
			$('#send-btn').text('Send');
			$('#email-confirmation').fadeIn(function(){
				//
			});
		});
	}).error(function(html){
		alert('ERROR! eMail not sent.');
		
	});
	
	return false;
	
}

function show_contact_form(){
	$('#email-confirmation').fadeOut(function(){
		$('#email-form').fadeIn(function(){
			//
		});
	});
}

$('#email-form input, textarea').keypress(function(){
	reset(this.id);
});

$('#send-btn').click(function(){
	validate();
});

$('#return-to-form').click(function(){
	show_contact_form();
});

