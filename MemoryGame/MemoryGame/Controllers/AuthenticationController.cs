using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MemoryGame.Models;
using MemoryGame.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MemoryGame.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/")]
    public class AuthenticationController : Controller
    {
        private IUserService _userService;

        public AuthenticationController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public User Login([FromBody]User user)
        {
            Console.WriteLine($"type: {user.GetType()}; tostring: {user.ToString()}");
            var newUser = _userService.Authenticate(user.Username, user.Password);
            return newUser;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public User Register([FromBody]User user)
        {
            var newUser = _userService.Register(user.Username, user.Password);
            return newUser;
        }

        [HttpGet("users")]
        public IEnumerable<User> GetAll()
        {
            var users = _userService.GetAll();
            return users;
        }

    }
}
