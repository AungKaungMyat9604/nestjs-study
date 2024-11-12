import {
  ConnectedSocket,
  MessageBody, SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'wards-admin',
  transports: ['websocket'],
})
export class WardsAdminGateway {
  wardNameAcceptedSub = new BehaviorSubject<{
    adminClient: Socket;
    clientId: string;
    wardName: string;
  }>({
    adminClient: null,
    clientId: null,
    wardName: null,
  });

  @WebSocketServer()
  adminServer: Socket;

  @SubscribeMessage('accept-ward-name')
  acceptWardName(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { clientId: string; wardName: string },
  ) {
    this.wardNameAcceptedSub.next({
      adminClient: client,
      clientId: payload.clientId,
      wardName: payload.wardName,
    });
  }

  sendWardRequstToAdminPortal(clientId: string, wardName: string) {
    this.adminServer.emit('incoming-ward-request', { clientId, wardName });
  }
}
