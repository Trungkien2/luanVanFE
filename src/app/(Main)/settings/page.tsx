"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const SettingsPage: React.FC = () => {
  const [privacyLevel, setPrivacyLevel] = useState<string>("");
  const [notificationPush, setNotificationPush] = useState<boolean>(false);
  const [isAccountPrivate, setIsAccountPrivate] = useState<boolean>(false);

  const handleSaveSettings = () => {
    console.log({
      privacyLevel,
      notificationPush,
      isAccountPrivate,
    });
  };

  return (
    <div className="p-6 min-h-screen bg-dark_1 text-white">
      <h1 className="text-2xl font-bold mb-4">Social Media Settings</h1>

      <div className="mb-4">
        <FormControl fullWidth className="mb-4">
          <InputLabel id="privacy-level-label" style={{ color: "#8e44ad" }}>
            Privacy Level
          </InputLabel>
          <Select
            labelId="privacy-level-label"
            value={privacyLevel}
            label="Privacy Level"
            onChange={(e) => setPrivacyLevel(e.target.value as string)}
            style={{ color: "#8e44ad", borderColor: "#8e44ad" }}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: "#2c3e50",
                  color: "#8e44ad",
                },
              },
            }}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="friends">Friends</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={notificationPush}
              onChange={(e) => setNotificationPush(e.target.checked)}
              color="primary"
            />
          }
          label="Enable Push Notifications"
        />

        <FormControlLabel
          control={
            <Switch
              checked={isAccountPrivate}
              onChange={(e) => setIsAccountPrivate(e.target.checked)}
              color="primary"
            />
          }
          label="Private Account"
        />
      </div>

      <Button variant="contained" color="primary" onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default SettingsPage;
