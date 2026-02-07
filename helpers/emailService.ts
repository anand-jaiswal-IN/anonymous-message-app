import { google } from "googleapis";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

export async function getTransport() {
  const { CLIENT_USER, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } =
    process.env;

  if (
    !CLIENT_USER ||
    !CLIENT_ID ||
    !CLIENT_SECRET ||
    !REDIRECT_URI ||
    !REFRESH_TOKEN
  ) {
    throw new Error("Missing required environment variables.");
  }

  const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const accessToken = await oAuth2Client.getAccessToken();
  if (!accessToken?.token) {
    throw new Error("Failed to retrieve access token");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: CLIENT_USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
}
