import { google } from 'googleapis'
import { env } from '~/config/env.config'

const oauth2Client = new google.auth.OAuth2(env.CLIENT_ID, env.CLIENT_SECRET, env.REDIRECT_URL)
oauth2Client.setCredentials({ refresh_token: env.REFRESH_TOKEN })
export const drive = google.drive({ version: 'v3', auth: oauth2Client })
