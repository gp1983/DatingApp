using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DatingApp.API
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();
      using (IServiceScope scope = host.Services.CreateScope())
      {
        try
        {
          var context = scope.ServiceProvider.GetRequiredService<DataContext>();

          if (context.Users.Count() == 0)
          {
            context.Database.Migrate();
            Seed.SeedUsers(context);
          }

        }
        catch (System.Exception ex)
        {
          var logger = scope.ServiceProvider.GetRequiredService<ILogger>();
          logger.LogError(ex, "An error occured during migration");
        }
      }
      host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
