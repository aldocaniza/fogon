import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.fogon',
  appName: 'Fogon',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;