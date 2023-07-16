const socket = io();

let userdata;

const submitMessageForm = document.querySelector("#submitMessageForm");
const chatList = document.querySelector("#chatList");

window.onload = () => {
	connect();
};

document.addEventListener("click", () => askNotificationPermission());

function checkNotificationPromise() {
	try {
		Notification.requestPermission().then();
	} catch (e) {
		return false;
	}

	return true;
}

function askNotificationPermission() {
	function handlePermission(permission) {
		Notification.permission === "granted" ? "none" : "block";
	}

	// 브라우저가 알림 지원하는지
	if (!("Notification" in window)) {
		console.log("This browser does not support notifications.");
	} else if (checkNotificationPromise()) {
		Notification.requestPermission().then(permission => {
			handlePermission(permission);
		});
	} else {
		Notification.requestPermission(permission => {
			handlePermission(permission);
		});
	}
}

function connect() {
	socket.emit("connection");
}

function createChatElement(message, username) {
	const date = new Date();
	const formattedDate = date.toLocaleString("ko-KR", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	// messageBox div
	let _messageBox = document.createElement("div");
	_messageBox.className = "messageBox";

	// 프로필 이미지
	let _profile = document.createElement("div");
	_profile.className = "profile";

	let _profileImg = document.createElement("img");
	_profileImg.src = `https://api.dicebear.com/6.x/identicon/svg?seed=${username}`;
	_profileImg.alt = `${username}의 프로필 이미지`;
	_profile.appendChild(_profileImg);

	// content div
	let _content = document.createElement("div");
	_content.className = "content";

	// 닉네임
	let _row1 = document.createElement("div");
	_row1.className = "row";
	let _username = document.createElement("span");
	_username.className = "username";
	_username.textContent = username;

	// 공백
	let _blink = document.createElement("span");
	_blink.textContent = " ";

	// 타임스템프
	let _timestamp = document.createElement("span");
	_timestamp.className = "timestamp";
	_timestamp.textContent = formattedDate;

	_row1.appendChild(_username);
	_row1.appendChild(_blink);
	_row1.appendChild(_timestamp);
	_content.appendChild(_row1);

	// 메세지 내용
	let _row2 = document.createElement("div");
	_row2.className = "row";
	let _message = document.createElement("span");
	_message.className = "message";
	_message.textContent = message;
	_row2.appendChild(_message);
	_content.appendChild(_row2);
	_messageBox.appendChild(_profile);
	_messageBox.appendChild(_content);

	return _messageBox;
}

function createNotiElement(message) {
	let _notiBox = document.createElement("div");
	_notiBox.className = "notiBox";

	let _content = document.createElement("span");
	_content.className = "content";
	_content.innerText = message;

	_notiBox.appendChild(_content);

	return _notiBox;
}

function appendChatMessage(message, username) {
	const messageDiv = createChatElement(message, username);

	chatList.appendChild(messageDiv);
	chatList.scrollTop = chatList.scrollHeight;
}

socket.on("message", data => {
	console.log(data);
	new Notification(`${data.username}`, { body: `${data.message}`, icon: `https://api.dicebear.com/6.x/identicon/svg?seed=${data.username}` });
	appendChatMessage(data.message, data.username);
});

socket.on("rename", data => (userdata = data));

socket.on("userJoined", data => {




	
	// TODO 5: createNotiElement 함수의 매개변수로 변수와 상수 부분에서 배웠던 백틱을 활용해서 data.username과 data.userSize 변수를 포함하는 문자열을 넣어주세요.
	// `${data.username} ${data.userSize}`
	const notiDiv = createNotiElement(이 곳에 코드를 작성해주세요);





	new Notification(`${data.username} 이(가) 참여했습니다.`, { body: `[${data.userSize}명 온라인]`, icon: `https://api.dicebear.com/6.x/identicon/svg?seed=${data.username}` });
	chatList.appendChild(notiDiv);
});

socket.on("userLefted", data => {





	// TODO 6: createNotiElement 함수의 매개변수로 변수와 상수 부분에서 배웠던 백틱을 활용해서 data.username과 data.userSize 변수를 포함하는 문자열을 넣어주세요.
	// `${data.username} ${data.userSize}`
	const notiDiv = createNotiElement(이 곳에 코드를 작성해주세요);





	new Notification(`${data.username} 이(가) 퇴장했습니다.`, { body: `[${data.userSize}명 온라인]`, icon: `https://api.dicebear.com/6.x/identicon/svg?seed=${data.username}` });
	chatList.appendChild(notiDiv);
});

submitMessageForm.addEventListener("submit", e => {
	e.preventDefault();

	let message = document.querySelector("#messageInput").value;
	if (message.trim().length <= 0) return (submitMessageForm.querySelector("input").value = "");

	appendChatMessage(message, userdata.username);




	// TODO 7: 송신 메소드 중 emit을 사용해서 'message' 이라는 이름을 가진 메세지를 모든 클라이언트에게 보내는 코드를 작성하세요.
	// 들어갈 데이터로는 message 변수를 넣어주세요.
	이 곳에 코드를 작성해주세요





	submitMessageForm.querySelector("input").value = "";
});
