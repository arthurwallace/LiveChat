using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiveChatAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace LiveChatAPI.Hubs
{
    public class ChatHub : Hub
    {
        private readonly UserConnection _botAdmin;
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botAdmin = new UserConnection {
                UserId = 0,
                User = "Adminstrador do chat"
            };
            _connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", _botAdmin.UserId, _botAdmin.User, $"{userConnection.User} saiu da sala");
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", userConnection.UserId, userConnection.User, message);
            }
        }

        //Entrar na sala
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botAdmin.UserId, _botAdmin.User, $"{userConnection.User} entrou na sala {userConnection.Room}");
        }
    }
}
