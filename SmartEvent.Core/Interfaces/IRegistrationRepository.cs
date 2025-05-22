using SmartEvent.Core.Entities;

namespace SmartEvent.Core.Interfaces
{
    public interface IRegistrationRepository
    {
        Task<Registration?> GetByEmailAndEventIdAsync(string email, int eventId);
        Task AddAsync(Registration registration);
        Task<IEnumerable<Registration>> GetByEventIdAsync(int eventId);
    }
}
