import { Injectable, NestMiddleware } from '@nestjs/common';
import { differenceInMilliseconds, format } from 'date-fns';
import { Request, Response } from 'express';
import { Collection, MongoClient } from 'mongodb';
import { MongodbService } from 'src/services/individual/mongodb/mongodb.service';
import { v4 as uuidv7 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logCollection!: Collection;

  constructor(private mongodbService: MongodbService) {
    this.connectToLogConnection();
  }

  async connectToLogConnection() {
    const client = await this.mongodbService.connect();
    const db = client.db('dev-akm');
    this.logCollection = db.collection('dev-akm-logs');
  }

  use(req: Request, res: Response, next: () => void) {
    const startTime = new Date();
    const id = uuidv7();

    console.log('===========================');
    console.log(
      `[REQUEST] IP : ${req.ip} URL: ${req.url} TIME: ${format(startTime, 'yyyy-MM-dd HH:mm:ss')} URL: ${req.path}`,
    );
    this.logCollection.insertOne({
      operation: 'REQUEST',
      method: req.method,
      id: id,
      ip: req.ip,
      reqTime: startTime,
      url: req.url,
      user: req.user,
      headers: req.headers,
      origin: req.headers.origin,
    });

    //wrap method
    const wrapMethod = (methodName: string, method: any) => {
      const logCollection = this.logCollection;
      return function (this: Response, ...args) {
        const newResponse = method.bind(this)(...args);
        const responseTime = new Date();

        //response log
        console.log('----------------');
        console.log(
          `ID: ${id} [RESPONSE] METHOD: ${methodName} IP : ${req.ip} URL: ${req.url} RES_TIME: ${format(
            responseTime,
            'yyyy-MM-dd HH:mm:ss',
          )}
           DURATION: ${differenceInMilliseconds(responseTime, startTime)}ms STATUS: ${this.statusCode}`,
        );
        logCollection.insertOne({
          operation: 'RESPONSE',
          method: methodName,
          id: id,
          ip: req.ip,
          reqTime: startTime,
          resTime: responseTime,
          resStatus: this.statusCode,
          resMessage: this.statusMessage,
          resDuration: differenceInMilliseconds(responseTime, startTime),
          url: req.url,
          user: req.user,
          headers: req.headers,
          origin: req.headers.origin,
        });
        return newResponse;
      };
    };

    //Response
    res.json = wrapMethod('json', res.json);
    res.send = wrapMethod('send', res.send);
    res.redirect = wrapMethod('redirect', res.redirect);
    res.end = wrapMethod('end', res.end);
    res.download = wrapMethod('download', res.download);
    res.sendFile = wrapMethod('sendFile', res.sendFile);

    next();
  }
}

//send
//sendFile
//json
//redirect
//download
//end
