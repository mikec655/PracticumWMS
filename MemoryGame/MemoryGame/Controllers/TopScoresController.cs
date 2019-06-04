using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemoryGame.Models;

namespace MemoryGame.Controllers
{
    [Route("/myscores")]
    [ApiController]
    public class TopScoresController : ControllerBase
    {
        private readonly UserContext _context;

        public TopScoresController(UserContext context)
        {
            _context = context;
        }

        // GET: TopScores
        [HttpGet]
        public IEnumerable<TopScores> GetTopScores()
        {
            return _context.TopScores;
        }

        // GET: TopScores/5
        [Route("/topscores/{gid}")]
        [HttpGet]
        public IActionResult GetTopScores([FromRoute] int gid)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var query = from _context.TopScores
            var topScores = _context.TopScores.Where(p => p.GameId == gid).OrderBy(p => p.Score).Take(10).Include(p => p.User);
            //var topScores = _context.TopScores.Where(p => p.GameId == gid);

            if (topScores == null)
            {
                return NotFound();
            }

            return Ok(topScores);
        }

        // GET: MyScores/5
        [HttpGet("{id}")]
        public IActionResult GetMyScores([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (User.Identity.Name != id.ToString())
            {
                return Unauthorized();
            }

            var topScores = _context.TopScores.Where(x => x.UserId == id);

            if (topScores == null)
            {
                return NotFound();
            }

            return Ok(topScores);
        }

        // POST: MyScores
        [HttpPost]
        public async Task<IActionResult> PostTopScores([FromBody] dynamic topScores)
        {
            Console.WriteLine(topScores.GetType());
            return Ok();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (User.Identity.Name != topScores.UserId.ToString())
            {
                return Unauthorized();
            }

            _context.TopScores.Add(topScores);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTopScores", new { id = topScores.Id }, topScores);
        }

        private bool TopScoresExists(int id)
        {
            return _context.TopScores.Any(e => e.Id == id);
        }
    }
}