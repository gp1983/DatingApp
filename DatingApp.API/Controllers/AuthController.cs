using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _repo;
    private readonly IConfiguration config;
    public AuthController(IAuthRepository repo, IConfiguration config)
    {
      this.config = config;
      this._repo = repo;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
    {
      userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

      if (await this._repo.UserExists(userForRegisterDto.UserName))
        return BadRequest("Username already exists");

      var userToCreate = new User
      {
        UserName = userForRegisterDto.UserName
      };

      var createdUser = _repo.Register(userToCreate, userForRegisterDto.Password);

      return Ok(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
    {

      var loggedUser = await _repo.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password.ToLower());
      if (loggedUser == null)
        return Unauthorized();

      var claims = new[]
      {
            new Claim(ClaimTypes.NameIdentifier, loggedUser.Id.ToString()),
            new Claim(ClaimTypes.Name, loggedUser.UserName )
        };
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

      var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(1),
        SigningCredentials = cred
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);

      return Ok(new { token = tokenHandler.WriteToken(token) });
    }

  }
}