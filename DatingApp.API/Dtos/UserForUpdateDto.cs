using System.Collections.Generic;

namespace DatingApp.API.Dtos
{
  public class UserForUpdateDto
  {
    public int Id { get; set; }
    public string Introduction { get; set; }
    public string LookingFor { get; set; }
    public string Interests { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public List<PhotoForDetailDto> Photos { get; set; }
  }
}