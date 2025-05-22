using SmartEvent.Core.Entities;

namespace SmartEvent.Core.Interfaces
{
    public interface IRegistrationService
    {
        Task<bool> RegisterUserAsync(string fullName, string email, int eventId);
        Task<IEnumerable<Registration>> GetParticipantsAsync(int eventId);
    }
}
