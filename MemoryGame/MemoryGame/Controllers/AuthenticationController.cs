using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MemoryGame.Models;
using Microsoft.AspNetCore.Mvc;

namespace MemoryGame.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        [HttpPost("[action]")]
        public User Login(dynamic user)
        {
            var newUser = new User();
            return newUser;
        }
    }
}
