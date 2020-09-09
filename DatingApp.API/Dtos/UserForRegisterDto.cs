using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
  public class UserForRegisterDto
  {
    UserForRegisterDto()
    {
      Created = DateTime.Now;
      LastActive = DateTime.Now;
    }
    [Required]
    public string username { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8.")]
    public string password { get; set; }
    [Required]
    public string password2 { get; set; }
    [Required]
    public string gender { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }

    public string knownAs { get; set; }
    [Required]
    public DateTime DateOfBirth { get; set; }
    [Required]
    public string city { get; set; }
    [Required]
    public string country { get; set; }


  }
}