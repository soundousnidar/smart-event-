using SmartEvent.Core.Entities;

namespace SmartEvent.Core.Interfaces
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event?> GetEventByIdAsync(int id);
        Task AddEventAsync(Event ev);
        Task UpdateEventAsync(Event ev);
        Task DeleteEventAsync(int id);
    }
}
