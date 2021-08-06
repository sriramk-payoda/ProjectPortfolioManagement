using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ProjectPortfolioManagement.DataAccess;
using System;

namespace ProjectPortfolioManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("https://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                    }
                );
            });

            services.AddControllers()
                .AddJsonOptions(options => options.JsonSerializerOptions.IgnoreNullValues = true);
            
            var postgreSqlConnectionString = Configuration["PostgreSqlConnectionString"];

            services.AddDbContext<PostgreSqlContext>(options => options
                .UseNpgsql(postgreSqlConnectionString)
                .UseSnakeCaseNamingConvention()
            );

            services.AddScoped<IDataAccessProvider, DataAccessProvider>();

            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Project Portfolio Management API",
                    Description = "Swagger api information",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Your Name XYZ",
                        Email = "xyz@gmail.com",
                        Url = new Uri("https://example.com"),
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under OpenApiLicense",
                        Url = new Uri("https://example.com/license"),
                    }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(
                options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader()
            );

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Project Portfolio Management API v1");
            });
        }
    }
}
