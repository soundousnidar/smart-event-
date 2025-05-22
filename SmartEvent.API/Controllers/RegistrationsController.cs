using Microsoft.AspNetCore.Mvc;
using SmartEvent.API.DTOs;
using SmartEvent.Core.Interfaces;
using SmartEvent.Core.Entities;

namespace SmartEvent.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationsController : ControllerBase
    {
        private readonly HttpClient _client;

        public RegistrationsController(IHttpClientFactory factory)
        {
            _client = factory.CreateClient("RegistrationService");
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationDto dto)
        {
            var response = await _client.PostAsJsonAsync("/api/registrations", dto);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return BadRequest(error);
            }

            return Ok("Registration forwarded to service.");
        }
    }



    /*
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

         [HttpGet("/api/events/{eventId}/participants")]
         public async Task<IActionResult> GetParticipants(int eventId)
         {
             var participants = await _service.GetParticipantsAsync(eventId);
             return Ok(participants);
         }
     }
    */
}
