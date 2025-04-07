import { google } from "googleapis";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const [CLIENT_USER, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN] = [
  process.env.CLIENT_USER,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
  process.env.REFRESH_TOKEN,
];
if (
  !CLIENT_USER ||
  !CLIENT_ID ||
  !CLIENT_SECRET ||
  !REDIRECT_URI ||
  !REFRESH_TOKEN
)
  throw new Error("Missing required environment variables.");

const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = await oAuth2Client.getAccessToken();
if (!accessToken?.token) {
  throw new Error("Failed to retrieve access token");
}

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: CLIENT_USER,
    clientId: oAuth2Client._clientId,
    clientSecret: oAuth2Client._clientSecret,
    refreshToken: oAuth2Client.credentials.refresh_token as string,
    accessToken: accessToken?.token as string,
  },
});

export default transport;
