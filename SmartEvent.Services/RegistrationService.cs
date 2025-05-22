using SmartEvent.Core.Entities;
using SmartEvent.Core.Interfaces;

namespace SmartEvent.Services
{
    public class RegistrationService : IRegistrationService
    {
        private readonly IRegistrationRepository _repository;

        public RegistrationService(IRegistrationRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> RegisterUserAsync(string fullName, string email, int eventId)
        {
            var existing = await _repository.GetByEmailAndEventIdAsync(email, eventId);
            if (existing != null)
                return false; // Déjà inscrit

            var registration = new Registration
            {
                FullName = fullName,
                Email = email,
                EventId = eventId
            };

            await _repository.AddAsync(registration);
            return true;
        }

        public async Task<IEnumerable<Registration>> GetParticipantsAsync(int eventId)
        {
            return await _repository.GetByEventIdAsync(eventId);
        }
    }
}
