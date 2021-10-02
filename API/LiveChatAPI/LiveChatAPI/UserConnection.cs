using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveChatAPI.Models
{
    public class UserConnection
    {
        public int UserId { get; set; }
        public string User { get; set; }
        public string Room { get; set; }
    }
}
