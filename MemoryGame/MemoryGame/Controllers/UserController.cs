using Angular.Controllers.Utils;
using MemoryGame.Models;
using MemoryGame.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MemoryGame.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private UserContext _context;
        private IUserService _userService;

        public UserController(UserContext userContext, IUserService userService)
        {
            _userService = userService;
            _context = userContext;
        }

        // POST: login/
        [AllowAnonymous]
        // Override default controller route to /login
        [Route("/login")]
        [HttpPost]
        public ActionResult<User> Login([FromBody] User user)
        {
            var newUser = _userService.Authenticate(user.Username, user.Password);
            return newUser;
        }

        // POST: user/
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> RegisterUser([FromBody] User user)
        {
            if(string.IsNullOrWhiteSpace(user.Password) || string.IsNullOrWhiteSpace(user.Username))
            {
                return BadRequest("Password and/or Username can't be empty");
            }
            if (_context.Users.FirstOrDefault(x => x.Username == user.Username) != null)
            {
                return Conflict("User with this username already exists");
            }
            user.Password = Hash.GenerateHash(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            user = _userService.Authenticate(user.Username, user.Password);

            return user;
        }

        // GET: user/4
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser([FromRoute] int id)
        {
            var user = await _context.Users.FindAsync(id);

            if(user == null)
            {
                return NotFound();
            }

            // We don't wanto be returning passwords now do we.
            //user.Password = null;

            return user;
        }

        // PUT: user/4
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser([FromRoute] int id, [FromBody] User user)
        {
            if(id.ToString() != User.Identity.Name)
            {
                return Unauthorized();
            }
            if(id != user.Id)
            {
                return BadRequest();
            }

            // No clue why this updates it exactly, I'm guessing it does a lookup on the user.Id and then puts the user object in the database.
            _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
