using Microsoft.EntityFrameworkCore;
using SmartEvent.Core.Interfaces;
using SmartEvent.Data;
using SmartEvent.Data.Repositories;
using SmartEvent.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Base de données
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Injection de HttpClient pour RegistrationService
builder.Services.AddHttpClient("RegistrationService", client =>
{
    client.BaseAddress = new Uri("http://localhost:5227"); //port service
});


// 3. CORS pour le frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:8080")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 3. Contrôleurs et services
builder.Services.AddControllers();

builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventService, EventService>();

builder.Services.AddScoped<IRegistrationRepository, RegistrationRepository>();
builder.Services.AddScoped<IRegistrationService, RegistrationService>();

// 4. Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 5. Serveur de fichiers statiques pour le frontend React
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "../smartevent-frontend/dist";
});

var app = builder.Build();

// 6. Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseSpaStaticFiles(); // En production, servir les fichiers compilés
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

// 7. Route vers l'app React (SPA fallback)
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "../smartevent-frontend";
});

app.Run();


/*using Microsoft.EntityFrameworkCore;
using SmartEvent.Core.Interfaces;
using SmartEvent.Data;
using SmartEvent.Data.Repositories;
using SmartEvent.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Base de données
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// 2. Contrôleurs et services
builder.Services.AddControllers(); 

builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventService, EventService>();

builder.Services.AddScoped<IRegistrationRepository, RegistrationRepository>();
builder.Services.AddScoped<IRegistrationService, RegistrationService>();

// 3. Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 4. Serveur de fichiers statiques pour le frontend React
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "../smartevent-frontend/dist";
});

var app = builder.Build();


// 5. Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseSpaStaticFiles(); // En production, servir les fichiers compilés
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// 6. Route vers l'app React (SPA fallback)
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "../smartevent-frontend"; 
});

app.Run();
*/