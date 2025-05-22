using Microsoft.EntityFrameworkCore;
using SmartEvent.Core.Entities;
using SmartEvent.Core.Interfaces;

namespace SmartEvent.Data.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly AppDbContext _context;

        public EventRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllAsync() =>
            await _context.Events.ToListAsync();

        public async Task<Event?> GetByIdAsync(int id) =>
            await _context.Events.FindAsync(id);

        public async Task AddAsync(Event ev)
        {
            // Ensure the event object is valid
            if (ev.Image != null && ev.Image.Length > 0)
            {
                // Optionally, validate the image size or type here
            }

            _context.Events.Add(ev);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Event ev)
        {
            // Check if the image is updated
            if (ev.Image != null && ev.Image.Length > 0)
            {
                // Optionally, validate the image size or type here
            }

            _context.Events.Update(ev);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var ev = await _context.Events.FindAsync(id);
            if (ev != null)
            {
                _context.Events.Remove(ev);
                await _context.SaveChangesAsync();
            }
        }
    }
}
