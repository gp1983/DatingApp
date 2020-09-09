using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
    private readonly IMapper _mapper;
    private readonly IDatingRepository _datingRep;
    public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper, IDatingRepository datingRep)
    {
      this._datingRep = datingRep;
      this._mapper = mapper;
      this.config = config;
      this._repo = repo;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
    {
      userForRegisterDto.username = userForRegisterDto.username.ToLower();

      if (await this._repo.UserExists(userForRegisterDto.username))
        return BadRequest("Username already exists");

      // var userToCreate = new User
      // {
      //   UserName = userForRegisterDto.username
      // };
      var user = _mapper.Map<User>(userForRegisterDto);

      var userForLogin = _mapper.Map<UserForLoginDto>(userForRegisterDto);

      await _repo.Register(user, userForRegisterDto.password);

      return Ok(userForLogin);
      // return RedirectToActionResult("login", "AuthController", userForLogin);

    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
    {
      try
      {
        var loggedUser = await _repo.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password.ToLower());
        if (loggedUser == null)
          return Unauthorized();
        string imgUrl = loggedUser.Photos.Where(x => x.isMain).DefaultIfEmpty(new Photo()).First().url;
        if (string.IsNullOrEmpty(imgUrl))
          imgUrl = "/assets/user.png";

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, loggedUser.Id.ToString()),
            new Claim(ClaimTypes.Name, loggedUser.UserName ),
            new Claim("photoUrl", imgUrl)

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
      catch (System.Exception ex)
      {

        throw ex;
      }


    }

  }
}