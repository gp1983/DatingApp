namespace DatingApp.API.Dtos
{
  public class PhotoForDetailDto
  {
    public int Id { get; set; }
    public string url { get; set; }
    public bool isMain { get; set; }
    public string description { get; set; }
    public int UserId { get; set; }

  }
}