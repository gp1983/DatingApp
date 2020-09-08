using System.Collections.Generic;
using System.IO;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
  public class Seed
  {
    public static void SeedUsers(DataContext context)
    {
      var file = File.ReadAllText("usersSeedsData.json");
      var users = JsonConvert.DeserializeObject<IEnumerable<User>>(file);

      foreach (User user in users)
      {
        byte[] passwordHash;
        byte[] passwordSalt;
        CreatePasswordHash(user.Password, out passwordHash, out passwordSalt);
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
        user.UserName = user.UserName.ToLower();
        context.Users.AddAsync(user);
      }
      context.SaveChangesAsync();
    }

    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }

  }
}