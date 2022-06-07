using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Diagnostics;
using System.Linq;

namespace TestService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            bool isService = !Debugger.IsAttached && args.Contains("--service");
            var builder = CreateHostBuilder(args, isService);
            var app = isService ? builder.UseWindowsService().Build() : builder.Build();
            app.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args, bool isService)
        {
            var host = Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(config =>
                {
                    config.SetBasePath(AppDomain.CurrentDomain.BaseDirectory);
                    config.AddJsonFile("appsettings.json", true, true);
                    config.AddJsonFile("appsettings.Development.json", true, true);
                    config.AddEnvironmentVariables();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseKestrel();
                    webBuilder.UseStartup<Startup>();
                });
            return host;
        }
    }
}
