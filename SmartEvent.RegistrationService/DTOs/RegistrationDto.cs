namespace SmartEvent.RegistrationService.DTOs;
public class RegistrationDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int EventId { get; set; }
}
