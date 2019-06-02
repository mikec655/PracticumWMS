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
        [HttpGet("[action]")]
        public User Authenticate(dynamic user)
        {
            var newUser = new User();
            return newUser;
        }
    }
}
