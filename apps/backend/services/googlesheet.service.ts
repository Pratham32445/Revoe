import { google } from "googleapis";
import { JWT } from "google-auth-library"

export class GoogleSheetService {
    sheets: any;
    async initilize() {
        try {
            const auth = new JWT({
                keyFile: process.env.KEY_PATH,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"]
            })
            this.sheets = google.sheets({ version: "v4", auth: auth });
            console.log("Initilized");
        } catch (error) {
            console.error('Error initializing Google Sheets API:', error);
        }
    }
}