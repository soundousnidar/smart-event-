using Microsoft.EntityFrameworkCore;
using SmartEvent.Core.Entities;
using SmartEvent.Core.Interfaces;

namespace SmartEvent.Data.Repositories
{
    public class RegistrationRepository : IRegistrationRepository
    {
        private readonly AppDbContext _context;

        public RegistrationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Registration registration)
        {
            _context.Registrations.Add(registration);
            await _context.SaveChangesAsync();
        }

        public async Task<Registration?> GetByEmailAndEventIdAsync(string email, int eventId)
        {
            return await _context.Registrations
                .FirstOrDefaultAsync(r => r.Email == email && r.EventId == eventId);
        }

        public async Task<IEnumerable<Registration>> GetByEventIdAsync(int eventId)
        {
            return await _context.Registrations
                .Where(r => r.EventId == eventId)
                .ToListAsync();
        }
    }
}
