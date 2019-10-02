import { Message } from "./interface/socketInterface"; // 인터페이스 Import 예시

export default (socket: any) => {
  console.log(socket.id);
  console.log("connect!");
};
