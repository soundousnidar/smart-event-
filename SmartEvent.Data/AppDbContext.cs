using Microsoft.EntityFrameworkCore;
using SmartEvent.Core.Entities;

namespace SmartEvent.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // DbSet pour tes entités
        public DbSet<Event> Events => Set<Event>();
        public DbSet<Registration> Registrations => Set<Registration>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Registration>()
                .HasIndex(r => new { r.Email, r.EventId }) // Empêche les doublons
                .IsUnique();
        }

    }
}
