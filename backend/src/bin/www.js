
import http from 'http';
import 'dotenv/config';
import 'regenerator-runtime';
import App from '../app';


import config from '../config/variables.config';
import { name } from '../../package.json';

const { PORT } = config;


const init = async () => {
  const server = http.createServer(App.app);
  App.init(server);

  const _onError = (error) => {
    console.error(error.message);
  };

  const _onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string'
      ? `pipe ${address}`
      : `${address.port}`;

      console.info(`${name} started:`);
      console.info(`\tPort: ${bind}`);
      console.info(`\tStart date: ${(new Date()).toUTCString()} \n`);
  };

  server.listen(PORT);
  server.on('error', _onError);
  server.on('listening', _onListening);
};

export default init().catch(console.error);
