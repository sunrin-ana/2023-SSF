require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

const getRamdomUserName = require("./utils/username");

const port = process.env.PORT || 3000;
global.__rootPath = path.resolve(process.cwd());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/index"));

let userSize = 0;
io.on("connection", async socket => {
	let addedUser = false;

	socket.on("connection", async data => {
		// connection 이벤트를 처리하는 소켓 이벤트 핸들러
		if (addedUser) return;

		++userSize;
		addedUser = true;
		socket.username = await getRamdomUserName();





		// TODO 1: 송신 메소드 중 emit을 사용해서 'rename' 이라는 이름을 가진 메세지를 모든 클라이언트에게 보내는 코드를 작성하세요.
		// 들어갈 데이터로는 { username: socket.username } 객체를 넣어주세요.
		이 곳에 코드를 작성해주세요





		// TODO 2: username키 값이 socket.username이고, userSize키 값이 userSize인 객체를 만들어주세요.
		// 대소문자에 유의해주세요
		io.sockets.emit("userJoined", 이 곳에 코드를 작성해주세요);





		console.log(`[User] ${socket.username} is connected`);
	});

	socket.on("disconnect", data => {
		// disconnect 이벤트를 처리하는 소켓 이벤트 핸들러
		if (addedUser) {
			--userSize;





			// TODO 3: username키 값이 socket.username이고, userSize키 값이 userSize인 객체를 만들어주세요.
			// 대소문자에 유의해주세요
			io.sockets.emit("userLefted", 이 곳에 코드를 작성해주세요); // 모든 소켓에 사용자가 퇴장했음을 알리는 userLefted 데이터를 보낸다.




			console.log(`[User] ${socket.username} is disconnected`);
		}
	});

	socket.on("message", data => {
		// message 이벤트를 처리하는 소켓 이벤트 핸들러를 등록합니다.
		if (socket.username) {
			if (data.trim().length <= 0) return;




			// TODO 4: username키 값이 socket.username이고, message키 값이 data인 객체를 만들어주세요.
			// 대소문자에 유의해주세요
			socket.broadcast.emit("message", 이 곳에 코드를 작성해주세요); // 연결된 모두에게 메세지와 사용자 이름을 담은 message 데이터를 보낸다.





			console.log(`[Message] ${socket.username}: ${data}`);
		}
	});
});

server.listen(port, () => console.log(`App is listening on port ${port}!\n\nhttp://localhost:${port}`));
