using System;
using System.Collections.Generic;
using System.IO;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace MemoryGame.Controllers
{
    [Route("api/media")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        [HttpPost]
        public void Post([FromBody] ImageData encodedImage)
        {
            byte[] data = Convert.FromBase64String(encodedImage.Content);
            using (var stream = new MemoryStream(data, 0, data.Length))
            {
                Image image = Image.FromStream(stream);
                image.Save(".\\image_" + DateTimeOffset.UtcNow.ToUnixTimeSeconds() + ".jpeg");
            }
        }
    }

    public class ImageData
    {
        public string Content { get; set; }
    }


}