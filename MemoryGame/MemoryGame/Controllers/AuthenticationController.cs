using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MemoryGame.Models;
using MemoryGame.Services;
using Microsoft.AspNetCore.Mvc;

namespace MemoryGame.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private IUserService _userService;

        public AuthenticationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("[action]")]
        public User Login([FromBody]User user)
        {
            Console.WriteLine($"type: {user.GetType()}; tostring: {user.ToString()}");
            var newUser = _userService.Authenticate(user.Username, user.Password);
            return newUser;
        }

        [HttpPost("[action]")]
        public User Register([FromBody]User user)
        {
            var newUser = _userService.Register(user.Username, user.Password);
            return newUser;
        }
    }
}
