using Microsoft.EntityFrameworkCore;
using SmartEvent.RegistrationService.Data;
using SmartEvent.RegistrationService.Services;


var builder = WebApplication.CreateBuilder(args);

// 1. Configuration de la base de donn�es
builder.Services.AddDbContext<RegistrationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// 2. Injection des services
builder.Services.AddScoped<IRegistrationService, RegistrationService>();

// 3. CORS pour permettre les requ�tes entre diff�rents domaines
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:8080") // Frontend React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 4. Configuration des contr�leurs
builder.Services.AddControllers();

// 5. Swagger pour la documentation de l'API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 6. Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 7. Middleware de gestion des erreurs et de CORS
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();

// 8. Mapping des contr�leurs
app.MapControllers();

// 9. D�marrer l'application
app.Run();
