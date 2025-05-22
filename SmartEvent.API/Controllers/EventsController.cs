using Microsoft.AspNetCore.Mvc;
using SmartEvent.Core.Entities;
using SmartEvent.Core.Interfaces;
using SmartEvent.API.DTOs;
using System.IO;

namespace SmartEvent.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _service;

        public EventsController(IEventService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _service.GetAllEventsAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var ev = await _service.GetEventByIdAsync(id);
            if (ev == null) return NotFound();
            return Ok(ev);
        }
        // GET: api/events/{id}/image
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetEventImage(int id)
        {
            var ev = await _service.GetEventByIdAsync(id);
            if (ev == null || ev.Image == null)
            {
                return NotFound();
            }

            // Détecter le type MIME si nécessaire — ici on suppose JPEG
            return File(ev.Image, "image/jpeg");
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromForm] EventCreateDto evDto)
        {
            byte[]? imageBytes = null;

            if (evDto.Image != null)
            {
                using var memoryStream = new MemoryStream();
                await evDto.Image.CopyToAsync(memoryStream);
                imageBytes = memoryStream.ToArray();
            }

            var ev = new Event
            {
                Title = evDto.Title,
                Description = evDto.Description,
                Date = evDto.Date,
                Time = evDto.Time,
                Location = evDto.Location,
                MaxParticipants = evDto.MaxParticipants,
                CurrentParticipants = evDto.CurrentParticipants,
                Image = imageBytes
            };

            await _service.AddEventAsync(ev);
            return CreatedAtAction(nameof(Get), new { id = ev.Id }, ev);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EventUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest();

            byte[]? imageBytes = null;
            if (!string.IsNullOrEmpty(dto.ImageBase64) && dto.ImageBase64 != "string")
            {
                try
                {
                    imageBytes = Convert.FromBase64String(dto.ImageBase64);
                }
                catch
                {
                    return BadRequest("ImageBase64 must be a valid base64 string.");
                }
            }

            var ev = new Event
            {
                Id = dto.Id,
                Title = dto.Title,
                Description = dto.Description,
                Date = dto.Date,
                Time = dto.Time,
                Location = dto.Location,
                MaxParticipants = dto.MaxParticipants,
                CurrentParticipants = dto.CurrentParticipants,
                Image = imageBytes
            };

            await _service.UpdateEventAsync(ev);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteEventAsync(id);
            return NoContent();
        }
    }
}
