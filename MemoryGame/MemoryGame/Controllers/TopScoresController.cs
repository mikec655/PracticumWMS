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
        [Route("/topscores/{id}")]
        [HttpGet]
        public IActionResult GetTopScores([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var topScores = _context.TopScores.Where(x => x.GameId == id);

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

            var topScores = _context.TopScores.Where(x => x.UserId == id);

            if (topScores == null)
            {
                return NotFound();
            }

            return Ok(topScores);
        }

        // POST: MyScores
        [HttpPost]
        public async Task<IActionResult> PostTopScores([FromBody] TopScores topScores)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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