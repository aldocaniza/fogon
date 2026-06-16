import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'fogon',
  webDir: 'client/dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;