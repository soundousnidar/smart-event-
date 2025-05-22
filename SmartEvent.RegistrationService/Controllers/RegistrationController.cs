using Microsoft.AspNetCore.Mvc;
using SmartEvent.RegistrationService.Services;
using SmartEvent.RegistrationService.DTOs;


namespace SmartEvent.RegistrationService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationsController : ControllerBase
    {
        private readonly IRegistrationService _service;

        public RegistrationsController(IRegistrationService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationDto dto)
        {
            var success = await _service.RegisterUserAsync(dto.FullName, dto.Email, dto.EventId);
            if (!success)
                return BadRequest("User already registered for this event.");

            return Ok("Registration successful");
        }

        [HttpGet("{eventId}/participants")]
        public async Task<IActionResult> GetParticipants(int eventId)
        {
            var participants = await _service.GetParticipantsAsync(eventId);
            return Ok(participants);
        }
    }

}
