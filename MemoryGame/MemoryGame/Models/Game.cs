using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryGame.Models
{
    public class Game
    {
        public int Id { get; set; }

        public string GameName { get; set; }

        public string Website { get; set; }

        // ???
        public string ClientToken { get; set; }
    }
}
