"use client";
import { CallIcon, sendIcon, videoCallIcon } from "@/app/assets";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

const data = [
  {
    name: "JavaScript Mastery",
    username: "@javascriptmastery",
    avatar: "https://via.placeholder.com/50",
    status: "online",
  },
  {
    name: "Lewis Hamilton",
    username: "@lewishamilton",
    avatar: "https://via.placeholder.com/50",
    status: "online",
  },
  {
    name: "Olivia Rose",
    username: "@oliviarose",
    avatar: "https://via.placeholder.com/50",
    status: "offline",
  },
];

const StatusDot = ({ status }: { status: string }) => (
  <Box
    sx={{
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: status === "online" ? "green" : "gray",
    }}
  />
);

const UserList = () => {
  return (
    <List
      sx={{
        bgcolor: "black",
        color: "white",
        p: 2,
        gap: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {data.map((user, index) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #1F1F22",
            paddingBottom: "12px",
            marginBottom: "12px",
          }}
        >
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={user.username}
            primaryTypographyProps={{ style: { color: "white" } }}
            secondaryTypographyProps={{ style: { color: "gray" } }}
          />
          <StatusDot status={user.status} />
        </ListItem>
      ))}
    </List>
  );
};

const ChatBox = () => {
  const messages = [
    {
      sender: "JavaScript Mastery",
      text: "Hey There !",
      time: "Today, 2:01pm",
      type: "received",
    },
    {
      sender: "JavaScript Mastery",
      text: "How are you doing?",
      time: "Today, 2:02pm",
      type: "received",
    },
    { sender: "Me", text: "Hello...", time: "Today, 2:12pm", type: "sent" },
    {
      sender: "Me",
      text: "I am good and how about you?",
      time: "Today, 2:12pm",
      type: "sent",
    },
    {
      sender: "JavaScript Mastery",
      text: "I am doing well. Can we meet up tomorrow?",
      time: "Today, 2:13pm",
      type: "received",
    },
    { sender: "Me", text: "Sure!", time: "Today, 2:14pm", type: "sent" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#09090A",
        color: "white",
        p: 2,
        borderRadius: "8px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #1F1F22 ",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #333",
          paddingBottom: "8px",
          marginBottom: "8px",
        }}
      >
        <Avatar src="https://via.placeholder.com/50" alt="JavaScript Mastery" />
        <Box sx={{ marginLeft: 2 }}>
          <h3 className="text-[18px] font-bold">JavaScript Mastery</h3>
          <p className="text-gray-400 text-[14px]">Online</p>
        </Box>
        <Box sx={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <button className="text-white text-[20px]">
            <Image src={CallIcon} alt="icon" />
          </button>
          <button className="text-white text-[20px]">
            <Image src={videoCallIcon} alt="icon" />
          </button>
        </Box>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: msg.type === "sent" ? "row-reverse" : "row",
              marginBottom: "12px",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                bgcolor: msg.type === "sent" ? "#6C63FF" : "#333",
                color: msg.type === "sent" ? "white" : "gray",
                padding: "8px 12px",
                borderRadius: "16px",
                textAlign: "left",
              }}
            >
              <p>{msg.text}</p>
              <p className="text-gray-400 text-[12px] text-right">{msg.time}</p>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Input Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #333",
          paddingTop: "8px",
          marginTop: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Write your message here..."
          style={{
            flexGrow: 1,
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 12px",
            outline: "none",
          }}
        />
        <button
          style={{
            marginLeft: "8px",
            backgroundColor: "#FFC107",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={sendIcon} alt="icon" />
        </button>
      </Box>
    </Box>
  );
};

const ChatPage = () => {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={6}>
            <h1 className="text-[36px] font-bold mb-2">All Chat</h1>
            <UserList />
          </Grid>
          <Grid size={6}>
            <ChatBox />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ChatPage;
