using SmartEvent.RegistrationService.Models;

namespace SmartEvent.RegistrationService.Services
{
    public interface IRegistrationService
    {
        Task<bool> RegisterUserAsync(string fullName, string email, int eventId);
        Task<IEnumerable<Registration>> GetParticipantsAsync(int eventId);
    }

}
