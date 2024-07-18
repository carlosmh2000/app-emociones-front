import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app-emo',
  webDir: 'www',
  plugins: {
    "CapacitorSQLite": {
      "iosDatabaseLocation": "Documents/app-emo.db",
      "androidDatabaseLocation": "files/app-emo.db"
    }
  }
};

export default config;
