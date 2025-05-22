namespace SmartEvent.Core.Entities
{
    public class Registration
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public int EventId { get; set; }
        public Event? Event { get; set; }
    }
}
