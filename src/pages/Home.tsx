// URL Shortener Page (Home)
// src/pages/Home.tsx
import { getAuthHeader } from "../api";

import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { sendLog } from "../middleware/logger";

const Home: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [validityMinutes, setValidityMinutes] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    // Basic validation
    if (!originalUrl.startsWith("http")) {
      setError("Please enter a valid URL.");
      await sendLog({
        stack: "frontend",
        level: "error",
        package: "component",
        message: "Invalid URL format entered by user.",
      });
      return;
    }

    const payload: any = {
      originalUrl,
    };
    if (customCode) payload.customCode = customCode;
    if (validityMinutes) payload.validity = parseInt(validityMinutes);

    try {
      const res = await fetch("http://20.244.56.144/url-shortener/shorten", {
        method: "POST",
       const res = await fetch("http://20.244.56.144/url-shortener/shorten", {
  method: "POST",
  headers: getAuthHeader(), // 🔐 Automatically adds Bearer token
  body: JSON.stringify(payload),
});



        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to shorten URL");
      }

      setShortUrl(data.shortUrl);

      await sendLog({
        stack: "frontend",
        level: "info",
        package: "component",
        message: `Shortened URL created: ${data.shortUrl}`,
      });
    } catch (err: any) {
      setError(err.message);

      await sendLog({
        stack: "frontend",
        level: "error",
        package: "component",
        message: `Shorten failed: ${err.message}`,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom mt={5}>
        🔗 URL Shortener
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Original URL"
          margin="normal"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Custom Code (optional)"
          margin="normal"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
        <TextField
          fullWidth
          label="Validity in Minutes (optional)"
          margin="normal"
          value={validityMinutes}
          onChange={(e) => setValidityMinutes(e.target.value)}
          type="number"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Shorten
        </Button>
      </form>

      {shortUrl && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Short URL: <a href={shortUrl} target="_blank">{shortUrl}</a>
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default Home;
