function sendOTP() {
	const email = document.getElementById('email');
	const otpverify = document.getElementsByClassName('otpverify')[0];


	let otp_val = Math.floor(Math.random() * 10000);


	let emailbody = `<h2>Your OTP is </h2>${otp_val}`;
	Email.send({
    SecureToken : "d1dec553-f9b7-4656-9137-666451db86c6",
    To : email.value,
    From : "prathameshrane2022@kccemsr.edu.in",
    Subject : "Email OTP using JavaScript",
    Body : emailbody,
}).then(


	message => {
		if (message === "OK") {
			alert("OTP sent to your email " + email.value);


			otpverify.style.display = "flex";
			const otp_inp = document.getElementById('otp_inp');
			const otp_btn = document.getElementById('otp-btn');


			otp_btn.addEventListener('click', () => {
				if (otp_inp.value == otp_val) {
					alert("Email address verified...");
				}
				else {
					alert("Invalid OTP");
				}
			})
		}
	}
);
}
//hello
