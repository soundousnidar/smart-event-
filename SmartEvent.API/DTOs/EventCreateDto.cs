using Microsoft.AspNetCore.Http;


namespace SmartEvent.API.DTOs
{
    public class EventCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string Location { get; set; }
        public int MaxParticipants { get; set; }
        public int CurrentParticipants { get; set; }
        public IFormFile? Image { get; set; } // Store the image as a byte array
    }

}