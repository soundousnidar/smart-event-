using SmartEvent.Core.Entities;
using SmartEvent.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartEvent.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _repository;

        public EventService(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync() =>
            await _repository.GetAllAsync();

        public async Task<Event?> GetEventByIdAsync(int id) =>
            await _repository.GetByIdAsync(id);

        // Ensure AddEventAsync correctly handles image storage
        public async Task AddEventAsync(Event ev)
        {
            // You may want to validate the image or perform additional logic here
            if (ev.Image != null && ev.Image.Length > 0)
            {
                // You can add further logic if needed for image size or format validation.
            }

            await _repository.AddAsync(ev);
        }

        public async Task UpdateEventAsync(Event ev)
        {
            // Perform additional logic if needed, e.g., image update handling
            if (ev.Image != null && ev.Image.Length > 0)
            {
                // Validate image if needed
            }

            await _repository.UpdateAsync(ev);
        }

        public async Task DeleteEventAsync(int id) =>
            await _repository.DeleteAsync(id);
    }
}
