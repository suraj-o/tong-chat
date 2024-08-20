<div align="center">

<div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

<h3 align="center">Tong Chats</h3>

</div>  

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Tailwind CSS
- Redux
- Shadcn
- Socket.Io
- Node JS
- Express Js
- Kafka
- Redis
- Docker
- Web-RTC

## <a name="features">🔋 Features</a>

👉 **Authentication**: Implements authentication and authorization features using JWT, allowing users to securely log in via local sign-on.

👉 **New Chat**: Quickly start a new chats.

👉 **Video Call**: Quickly start a video call with friend.

👉 **Search & Be a friend**: Search user with their name and send friend Requset.

👉 **Past Messages**: Access a list of previously held chats, including date and time.

👉 **Secure Real-time Functionality**: All interactions within the platform are secure and occur in real-time,     maintaining user privacy and data integrity.

👉 **Docker Containerization**: Using docker containers to run services like Redis, Kafka, Zookeeper, MongoDB for using app locally without any paid subscription.

👉 **Redis**: Using redis service for data caching and pub-sub feature for communicate between different load balancing server

👉 **Kafka**: Using kafka for inserting and qurrieng  messages in DB which is helping DB for go down, crash and save data while server will go down or crash    

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker](https://docker.com/)

**Cloning the Repository**

```bash or powershell
git clone https://github.com/suraj-o/tong-chats.git
cd tong-chats
```

**First of all start server**

```bash
cd server
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**edit docker-compose.yml file**
change all <your private ip> with your local system private ip
<img src="https://github.com/suraj-o/tong-chat/blob/main/client/assets/kafka.png" alt="Project Banner">


**edit your file in /src/services/kafka-admin.ts**
change <your private ip> with your local system private ip
<img src="https://github.com/suraj-o/tong-chat/blob/main/client/assets/kakfka-admin.png" alt="Project Banner">


**edit your file in /src/services/kafka.ts**
change <your private ip> with your local system private ip

<img src="https://github.com/suraj-o/tong-chat/blob/main/client/assets/kafka-pro.png" alt="Project Banner">

**start docker-compose.yml file**

--start your local docker demon first--

--after start run following command below--

```bash
docker compose up

```


**build your dist folder**

---run following command---

```bash
npm run build 

```

**create your kafka topics**

---run following command---

```bash

node dist/services/kafka-admin.js

```

**run server**
```bash
npm start
```
**Go to client folder**
```bash
---run following command---

cd ..
cd client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
