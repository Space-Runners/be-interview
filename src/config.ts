import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
  fluxApiKey: string;
  fluxApiUrl: string;
}

const config: Config = {
  fluxApiKey: process.env.FLUX_API_KEY || '',
  fluxApiUrl: process.env.FLUX_API_URL || 'https://api.replicate.com/v1',
};

export default config;
