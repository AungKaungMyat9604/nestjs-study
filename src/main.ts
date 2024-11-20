import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { methods } from './app.data';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './services/gloabal/socket-io/socket-io.adapter';
import {
  AbilityBuilder,
  createMongoAbility,
  fieldPatternMatcher,
  PureAbility,
} from '@casl/ability';

const port = 3000;
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // cors
  app.enableCors({
    origin: '*',
    methods: methods,
    credentials: true,
  });

  const redisAdapter = new SocketIoAdapter(app);
  redisAdapter.setLogger(logger);
  app.useWebSocketAdapter(redisAdapter);

  await app.listen(port, () => {
    console.log(`
    Server is running on port: ${port},
    Current Process ID: ${process.pid}
`);
  });
}
bootstrap();

//user
const user = {
  id: 1,
  username: 'akm9604',
  role: 'user',
};

const post = {
  id: 1,
  owner: 2,
  collabrator: 1,
  isPublic: false,
  allowComment: false,
  title: 'Post Title',
  content: 'Post Content',
  approved: false,
};
