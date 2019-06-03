using MemoryGame.Models;
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

        public UserController(UserContext userContext)
        {
            _context = userContext;
        }

        // POST: user/
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> RegisterUser(User user)
        {
            if(string.IsNullOrWhiteSpace(user.Password) || string.IsNullOrWhiteSpace(user.Username))
            {
                return BadRequest("Password and/or Username can't be empty");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // GET: user/4
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if(user == null)
            {
                return NotFound();
            }

            // We don't wanto be returning passwords now do we.
            // TODO: UNCOMMENT THIS LINE, ONLY FOR TESTING PURPOSED (To see if password updates or not)
            //user.Password = null;

            return user;
        }

        // PUT: user/4
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, User user)
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
