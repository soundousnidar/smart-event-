using SmartEvent.RegistrationService.Data;
using SmartEvent.RegistrationService.Models;
using Microsoft.EntityFrameworkCore;

namespace SmartEvent.RegistrationService.Services
{
    public class RegistrationService : IRegistrationService
    {
        private readonly RegistrationDbContext _context;

        public RegistrationService(RegistrationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterUserAsync(string fullName, string email, int eventId)
        {
            var existing = await _context.Registrations
                .FirstOrDefaultAsync(r => r.Email == email && r.EventId == eventId);
            if (existing != null) return false;

            var registration = new Registration
            {
                FullName = fullName,
                Email = email,
                EventId = eventId
            };

            _context.Registrations.Add(registration);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Registration>> GetParticipantsAsync(int eventId)
        {
            return await _context.Registrations
                .Where(r => r.EventId == eventId)
                .ToListAsync();
        }
    }

}
